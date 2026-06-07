import { createPaypalOrder, capturePaypalOrder } from '../api/apiService'

/**
 * Initiates a PayPal payment flow via popup window.
 *
 * Flow:
 * 1. Creates PayPal order → opens approval URL in popup
 * 2. Backend must set return_url = <origin>/paypal/return
 * 3. After user approves, PayPal redirects popup to /paypal/return
 * 4. PayPalReturn.jsx posts PAYPAL_APPROVED message to opener
 * 5. We capture only after receiving that message
 * 6. If popup closes without message → cancelled
 */
export const initiatePaypalPayment = async ({
  orderPayload,
  onSuccess,
  onError,
  onCapturing,
}) => {
  const returnUrl = `${window.location.origin}/paypal/return`
  const cancelUrl = `${window.location.origin}/paypal/cancel`

  const orderResponse = await createPaypalOrder({
    ...orderPayload,
    return_url: returnUrl,
    cancel_url: cancelUrl,
  })

  const approvalUrl =
    orderResponse?.data?.approval_url || orderResponse?.approval_url
  const paypalOrderId =
    orderResponse?.data?.paypal_order_id || orderResponse?.paypal_order_id
  const resolvedOrderDbId =
    orderResponse?.data?.order_id || orderResponse?.order_id

  if (!approvalUrl) throw new Error('Failed to initiate PayPal payment.')

  const popup = window.open(
    approvalUrl,
    'paypal_popup',
    'width=520,height=700,left=300,top=100'
  )

  if (!popup) throw new Error('Popup was blocked. Please allow popups for this site.')

  let handled = false

  const cleanup = () => {
    clearInterval(closedTimer)
    window.removeEventListener('message', messageHandler)
  }

  const messageHandler = async (event) => {
    if (event.origin !== window.location.origin) return
    const { type } = event.data || {}

    if (type === 'PAYPAL_APPROVED' && !handled) {
      handled = true
      cleanup()
      if (onCapturing) onCapturing(true)
      try {
        const captureResponse = await capturePaypalOrder({
          paypal_order_id: paypalOrderId,
          order_id: resolvedOrderDbId,
        })
        const status = captureResponse?.data?.status || captureResponse?.status
        if (status === 'paid') {
          onSuccess({
            orderId: captureResponse?.data?.order_id || resolvedOrderDbId,
            paymentStatus: status,
          })
        } else {
          onError('PayPal payment was not completed.')
        }
      } catch (err) {
        onError(err?.response?.data?.message || err?.message || 'Payment capture failed. Contact support.')
      }
    }

    if (type === 'PAYPAL_CANCELLED' && !handled) {
      handled = true
      cleanup()
      onError('Payment cancelled.')
    }
  }

  window.addEventListener('message', messageHandler)

  // If user manually closes popup without approving
  const closedTimer = setInterval(() => {
    if (popup.closed && !handled) {
      handled = true
      cleanup()
      onError('Payment cancelled.')
    }
  }, 800)
}
