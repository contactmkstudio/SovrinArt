import React, { useEffect } from 'react'
import Loader from '../components/Loader'

/**
 * PayPalCancel – loaded inside the PayPal popup when the user cancels.
 * PayPal redirects to: /paypal/cancel
 * Posts a cancel message to the opener and closes the popup.
 */
const PayPalCancel = () => {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        { type: 'PAYPAL_CANCELLED' },
        window.location.origin
      )
    }
    window.close()
  }, [])

  return <Loader fullScreen />
}

export default PayPalCancel
