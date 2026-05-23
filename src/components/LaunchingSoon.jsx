import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { RiBrushLine, RiSparklingLine } from 'react-icons/ri'
import { HiSparkles } from 'react-icons/hi2'


const LaunchingSoon = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the component after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Premium Gradient Backdrop */}
          <motion.div
            className='absolute inset-0 backdrop-blur-xl'
            style={{
              background: 'linear-gradient(135deg, rgba(218,165,32,0.08) 0%, rgba(184,134,11,0.06) 50%, rgba(218,165,32,0.08) 100%)',
              backgroundColor: 'rgba(0,0,0,0.95)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Animated Gradient Orbs */}
            <motion.div
              className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full'
              style={{
                background: 'radial-gradient(circle, rgba(218,165,32,0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full'
              style={{
                background: 'radial-gradient(circle, rgba(184,134,11,0.18) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className='absolute top-1/2 left-1/2 w-72 h-72 rounded-full -translate-x-1/2 -translate-y-1/2'
              style={{
                background: 'radial-gradient(circle, rgba(218,165,32,0.15) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className='relative rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full'
            style={{
              background: 'linear-gradient(135deg, rgba(10,10,10,0.98) 0%, rgba(20,20,20,0.98) 50%, rgba(10,10,10,0.98) 100%)',
              boxShadow: '0 25px 50px -12px rgba(218,165,32,0.4), 0 0 0 1px rgba(218,165,32,0.2)',
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              bounce: 0.3, 
              duration: 0.8 
            }}
          >
            {/* Decorative Top Border */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent' />

            {/* Close Button - Premium Style */}
            <button
              onClick={handleClose}
              className='absolute top-6 right-6 z-10 text-yellow-600/60 hover:text-yellow-500 transition-all duration-300 hover:rotate-90 hover:scale-110'
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content Container */}
            <div className='relative px-8 py-12 md:px-16 md:py-16'>
              
              {/* Sparkle Icons */}
              <div className='absolute top-8 left-8 opacity-30'>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <HiSparkles className='text-yellow-600 text-3xl' />
                </motion.div>
              </div>
              <div className='absolute bottom-8 right-8 opacity-30'>
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <RiSparklingLine className='text-yellow-500 text-3xl' />
                </motion.div>
              </div>

              {/* Sovrinart Logo */}
              <motion.div
                className='flex justify-center mb-8'
              >
                <motion.h1 
                  className='font-hurricane text-6xl md:text-8xl tracking-widest font-bold bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent'
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  Sovrinart
                </motion.h1>
              </motion.div>

              {/* Title with gradient text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-center mb-6'
              >
                <h2 className='font-cormorant text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent tracking-wide'>
                  Launching Soon
                </h2>
                <div className='flex justify-center gap-2'>
                  <motion.span 
                    className='w-2 h-2 rounded-full bg-yellow-600'
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span 
                    className='w-2 h-2 rounded-full bg-yellow-500'
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span 
                    className='w-2 h-2 rounded-full bg-yellow-600'
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className='font-marvel text-center text-gray-400 text-base md:text-lg tracking-wide leading-relaxed max-w-md mx-auto mb-8'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                We're crafting an extraordinary art experience. 
                <span className='text-yellow-500 font-semibold'> Stay tuned </span> 
                for something truly exceptional.
              </motion.p>

              {/* Decorative Elements */}
              <motion.div
                className='flex justify-center gap-8 items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className='h-px flex-1 bg-gradient-to-r from-transparent via-yellow-600 to-yellow-500' />
                <div className='w-3 h-3 rounded-full bg-yellow-600 shadow-lg shadow-yellow-600/60' />
                <div className='h-px flex-1 bg-gradient-to-l from-yellow-500 via-yellow-600 to-transparent' />
              </motion.div>
            </div>

            {/* Bottom Glow Effect */}
            <div 
              className='absolute bottom-0 left-0 right-0 h-1'
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(218,165,32,0.6), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LaunchingSoon
