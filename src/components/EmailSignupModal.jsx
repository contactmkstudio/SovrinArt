import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark, HiOutlineEnvelope } from 'react-icons/hi2'

const EmailSignupModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('emailSignupModalSeen')
    
    if (!hasSeenModal) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('emailSignupModalSeen', 'true')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    setIsOpen(false)
    sessionStorage.setItem('emailSignupModalSeen', 'true')
    // You can add API call here to save email
  }

  // Overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  // Modal animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              className='relative max-w-md w-full rounded-2xl shadow-2xl overflow-hidden'
              style={{ backgroundColor: '#FFF8EC' }}
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className='absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-200 transition-colors'
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineXMark className='text-2xl' style={{ color: '#546B41' }} />
              </motion.button>

              {/* Content */}
              <div className='p-8 md:p-10'>
                {/* Icon */}
                <motion.div
                  className='flex justify-center mb-6'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                >
                  <div className='w-16 h-16 rounded-full flex items-center justify-center' style={{ backgroundColor: '#546B41' }}>
                    <HiOutlineEnvelope className='text-3xl' style={{ color: '#FFF8EC' }} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className='font-hurricane text-4xl md:text-5xl text-center mb-3'
                  style={{ color: '#546B41' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Exclusive Offer!
                </motion.h2>

                {/* Description */}
                <motion.p
                  className='font-cormorant text-lg text-center mb-6'
                  style={{ color: '#99AD7A' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Sign up with your email to receive exclusive offers on your orders
                </motion.p>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className='space-y-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {/* Email Input */}
                  <div className='relative'>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      required
                      className='w-full px-4 py-3 border-2 rounded-lg font-cormorant text-lg focus:outline-none focus:ring-2 transition-all'
                      style={{
                        borderColor: '#DCCCAC',
                        backgroundColor: 'white',
                        color: '#546B41'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type='submit'
                    className='w-full py-3 font-cormorant text-lg font-bold rounded-lg transition-all'
                    style={{
                      backgroundColor: '#546B41',
                      color: '#FFF8EC'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Exclusive Offers
                  </motion.button>

                  {/* Skip Button */}
                  <button
                    type='button'
                    onClick={handleClose}
                    className='w-full py-2 font-cormorant text-base font-semibold transition-colors'
                    style={{ color: '#99AD7A' }}
                  >
                    No thanks, maybe later
                  </button>
                </motion.form>

                {/* Privacy Note */}
                <motion.p
                  className='font-marvel text-xs text-center mt-4'
                  style={{ color: '#99AD7A' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  We respect your privacy. Unsubscribe anytime.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EmailSignupModal
