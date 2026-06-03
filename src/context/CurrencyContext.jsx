import React, { createContext, useState, useContext } from 'react'

const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR') // Default to India (INR)

  const useCurrency = () => {
    const context = useContext(CurrencyContext)
    if (!context) {
      throw new Error('useCurrency must be used within CurrencyProvider')
    }
    return context
  }

  const value = {
    currency,
    setCurrency,
    isUSD: currency === 'USD',
    isINR: currency === 'INR',
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
