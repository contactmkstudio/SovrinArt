import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { CurrencyProvider } from './context/CurrencyContext'

const App = () => {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </CurrencyProvider>
  )
}

export default App