import { createPaypalOrder, capturePaypalOrder } from '../api/apiService'

/**
 * Initiates a PayPal payment flow via popup window.
 *
 * @param {Object} params
 * @param {Object} params.orderPayload  - Payload to send to createPaypalOrder API
 * @param {Function} params.onSuccess   - Called with { orderId, paymentStatus } on capture success
 * @param {Function} params.onError     - Called with an error message string
 */
export const initiatePaypalPayment = async ({
  orderPayload,
  onSuccess,
  onError,
}) => {
  const orderResponse = await createPaypalOrder(orderPayload)

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

  const pollTimer = setInterval(async () => {
    try {
      if (!popup || popup.closed) {
        clearInterval(pollTimer)
        try {
          const captureResponse = await capturePaypalOrder({
            paypal_order_id: paypalOrderId,
            order_id: resolvedOrderDbId,
          })
          const status =
            captureResponse?.data?.status || captureResponse?.status
          if (status === 'paid') {
            onSuccess({
              orderId: captureResponse?.data?.order_id || resolvedOrderDbId,
              paymentStatus: status,
            })
          } else {
            onError('PayPal payment was not completed.')
          }
        } catch {
          onError('Payment cancelled.')
        }
      }
    } catch {
      clearInterval(pollTimer)
    }
  }, 800)
}
