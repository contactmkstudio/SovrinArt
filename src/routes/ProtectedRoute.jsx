import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

/**
 * ProtectedRoute – wraps any route that requires authentication.
 *
 * Usage (in AppRoutes.jsx when ready):
 *   <Route path="/dashboard" element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   } />
 *
 * Props:
 *   children     – the component to render when authenticated
 *   redirectTo   – where to send unauthenticated users (default: /login)
 */
const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Wait for auth state to restore from localStorage before deciding
  if (loading) {
    return <Loader fullScreen />
  }

  if (!isAuthenticated) {
    // Preserve the page the user was trying to visit
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
