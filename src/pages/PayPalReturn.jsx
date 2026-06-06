import React, { useEffect } from 'react'
import Loader from '../components/Loader'

/**
 * PayPalReturn – loaded inside the PayPal popup after the user approves payment.
 * PayPal redirects to: /paypal/return?token=xxx&PayerID=yyy
 *
 * This page just posts a message to the opener window and closes itself.
 * The opener (paypalHandler.js) listens for that message and calls capture.
 */
const PayPalReturn = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const payerId = params.get('PayerID')

    if (token && window.opener) {
      window.opener.postMessage(
        { type: 'PAYPAL_APPROVED', token, payerId },
        window.location.origin
      )
    }

    window.close()
  }, [])

  return <Loader fullScreen />
}

export default PayPalReturn
