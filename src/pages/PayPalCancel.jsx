import React, { useEffect } from 'react'
import Loader from '../components/Loader'

/**
 * PayPalCancel – loaded inside the PayPal popup when the user cancels.
 * PayPal redirects to: /paypal/cancel
 * Posts a cancel message to the opener and closes the popup.
 */
const WHATSAPP_SUPPORT_URL = 'https://wa.link/ma9cum'

const PayPalCancel = () => {
  useEffect(() => {
    if (window.opener) {
      // Notify opener to clean up state
      window.opener.postMessage(
        { type: 'PAYPAL_CANCELLED' },
        window.location.origin
      )
      // Directly redirect the opener to WhatsApp (avoids browser popup blocker)
      try {
        window.opener.location.href = WHATSAPP_SUPPORT_URL
      } catch (e) {
        // fallback if opener is inaccessible
        window.location.href = WHATSAPP_SUPPORT_URL
      }
      window.close()
    } else {
      // PayPal redirected the main window — go straight to WhatsApp
      window.location.href = WHATSAPP_SUPPORT_URL
    }
  }, [])

  return <Loader fullScreen />
}

export default PayPalCancel
