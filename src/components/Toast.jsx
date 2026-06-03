import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2'

const Toast = ({ message, type = 'success', onClose, autoCloseDuration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDuration)
      return () => clearTimeout(timer)
    }
  }, [message, autoCloseDuration, onClose])

  const isSuccess = type === 'success'
  const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100'
  const borderColor = isSuccess ? 'border-green-400' : 'border-red-400'
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800'
  const Icon = isSuccess ? HiOutlineCheckCircle : HiOutlineXCircle
  const iconColor = isSuccess ? 'text-green-600' : 'text-red-600'

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`fixed top-6 right-6 flex items-center gap-3 px-5 py-4 rounded-lg border-2 ${bgColor} ${borderColor} ${textColor} shadow-lg max-w-sm z-50`}
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className={`text-2xl flex-shrink-0 ${iconColor}`} />
          <div className='flex-1'>
            <p className='font-semibold'>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
