import { createOrder, verifyPayment } from '../api/apiService'

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true)
    const script = document.createElement('script')
    script.id = 'razorpay-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

/**
 * Initiates a Razorpay payment flow.
 *
 * @param {Object} params
 * @param {Object} params.orderPayload   - Payload to send to createOrder API
 * @param {Object} params.prefill        - { name, contact, email }
 * @param {string} params.productName    - Used as the payment description
 * @param {Function} params.onSuccess    - Called with { orderId, paymentStatus } on verified payment
 * @param {Function} params.onError      - Called with an error message string
 * @param {Function} params.onDismiss    - Called when the user closes the Razorpay modal
 * @param {Function} params.onVerifying  - Called with true/false during verify-payment API call
 */
export const initiateRazorpayPayment = async ({
  orderPayload,
  prefill,
  productName,
  onSuccess,
  onError,
  onDismiss,
  onVerifying,
}) => {
  const orderResponse = await createOrder(orderPayload)

  const resolvedOrderId =
    orderResponse?.razorpay_order_id || orderResponse?.data?.razorpay_order_id
  const resolvedKeyId =
    orderResponse?.razorpay_key_id || orderResponse?.data?.razorpay_key_id
  const resolvedOrderDbId = orderResponse?.data?.order_id
  const totalPrice = orderResponse?.data?.total_price || 0
  const currency = orderResponse?.data?.currency || orderPayload?.currency

  const scriptLoaded = await loadRazorpayScript()
  if (!scriptLoaded) throw new Error('Failed to load Razorpay. Please try again.')

  const options = {
    key: resolvedKeyId,
    amount: Math.round(parseFloat(totalPrice) * 100),
    currency,
    name: 'Mkkatelier',
    description: productName || 'Order',
    order_id: resolvedOrderId,
    handler: async (paymentResult) => {
      if (onVerifying) onVerifying(true)
      try {
        const verifyResponse = await verifyPayment({
          razorpay_order_id: paymentResult.razorpay_order_id,
          razorpay_payment_id: paymentResult.razorpay_payment_id,
          razorpay_signature: paymentResult.razorpay_signature,
          order_id: resolvedOrderDbId,
        })
        if (onVerifying) onVerifying(false)
        onSuccess({
          orderId: verifyResponse?.data?.order_id,
          paymentStatus: verifyResponse?.data?.status,
        })
      } catch {
        if (onVerifying) onVerifying(false)
        onError('Payment verification failed. Contact support.')
      }
    },
    prefill,
    theme: { color: '#546B41' },
    modal: {
      ondismiss: onDismiss,
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', (response) => {
    onError(response?.error?.description || 'Payment failed. Please try again.')
  })
  rzp.open()
}
