import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CONFETTI_COLORS = ['#546B41', '#99AD7A', '#DCCCAC', '#FFF8EC', '#FFD700', '#FF6B6B', '#4ECDC4', '#A78BFA']

const random = (min, max) => Math.random() * (max - min) + min

const ConfettiPiece = ({ index }) => {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
  const startX = random(-50, 50)
  const endX = random(-200, 200)
  const rotation = random(0, 720)
  const size = random(6, 12)
  const duration = random(1.5, 3)
  const delay = random(0, 0.8)
  const shape = index % 3 // 0 = square, 1 = circle, 2 = rectangle

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: shape === 2 ? size * 2 : size,
        height: size,
        backgroundColor: color,
        borderRadius: shape === 1 ? '50%' : shape === 2 ? '2px' : '0',
        zIndex: 60,
      }}
      initial={{ x: startX, y: 0, rotate: 0, opacity: 1, scale: 0 }}
      animate={{
        x: endX,
        y: random(200, 500),
        rotate: rotation,
        opacity: [1, 1, 0],
        scale: [0, 1.5, 1],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

const SparkleRing = ({ delay = 0 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 120,
      height: 120,
      border: '2px solid #DCCCAC',
      top: '50%',
      left: '50%',
      marginTop: -60,
      marginLeft: -60,
    }}
    initial={{ scale: 0, opacity: 0.8 }}
    animate={{ scale: [0, 3, 4], opacity: [0.8, 0.3, 0] }}
    transition={{ duration: 1.5, delay, ease: 'easeOut' }}
  />
)

const FloatingSparkle = ({ delay, x, y }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{ duration: 1.2, delay, ease: 'easeInOut', repeat: Infinity, repeatDelay: random(1, 3) }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
    </svg>
  </motion.div>
)

const OrderSuccessAnimation = ({ isVisible, onClose, orderId, paymentStatus }) => {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const contentTimer = setTimeout(() => setShowContent(true), 400)
      const confettiTimer = setTimeout(() => setShowConfetti(true), 600)
      return () => {
        clearTimeout(contentTimer)
        clearTimeout(confettiTimer)
      }
    } else {
      setShowContent(false)
      setShowConfetti(false)
    }
  }, [isVisible])

  const handleClose = () => {
    onClose?.()
    navigate('/orders', { replace: true })
  }

  const handleContinueShopping = () => {
    navigate('/products', { replace: true })
  }

  const handleGoHome = () => {
    navigate('/', { replace: true })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleClose()}
          />

          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 60 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>
          )}

          {/* Ripple rings */}
          <SparkleRing delay={0.5} />
          <SparkleRing delay={0.8} />
          <SparkleRing delay={1.1} />

          {/* Floating sparkles */}
          <FloatingSparkle delay={1} x={15} y={20} />
          <FloatingSparkle delay={1.5} x={80} y={15} />
          <FloatingSparkle delay={0.8} x={10} y={70} />
          <FloatingSparkle delay={1.2} x={85} y={75} />
          <FloatingSparkle delay={2} x={50} y={10} />
          <FloatingSparkle delay={1.8} x={25} y={85} />
          <FloatingSparkle delay={0.5} x={70} y={85} />

          {/* Main Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden mx-4 w-full max-w-md"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              zIndex: 61,
            }}
            initial={{ scale: 0, rotate: -10, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0, rotate: 10, y: 100 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: 0.1,
            }}
          >
            {/* Top gradient bar */}
            <motion.div
              className="h-2 w-full"
              style={{
                background: 'linear-gradient(90deg, #546B41, #99AD7A, #DCCCAC, #99AD7A, #546B41)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
              {/* Animated checkmark circle */}
              <motion.div
                className="relative mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
              >
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: 100,
                    height: 100,
                    background: 'radial-gradient(circle, rgba(84,107,65,0.2) 0%, transparent 70%)',
                    margin: -10,
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Circle background */}
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#546B41' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Checkmark SVG */}
                  <motion.svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFF8EC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>

              {/* Success text */}
              <AnimatePresence>
                {showContent && (
                  <>
                    <motion.h2
                      className="font-cormorant text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: '#546B41' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      Order Placed!
                    </motion.h2>

                    <motion.div
                      className="w-12 h-0.5 rounded-full mb-4"
                      style={{ backgroundColor: '#DCCCAC' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    />

                    <motion.p
                      className="font-marvel text-base mb-1"
                      style={{ color: '#99AD7A' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Thank you for your purchase!
                    </motion.p>

                    <motion.p
                      className="font-marvel text-sm mb-6"
                      style={{ color: '#BCBCBC' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      Your order has been confirmed and will be shipped soon.
                    </motion.p>

                    {/* Order info badge */}
                    {orderId && (
                      <motion.div
                        className="w-full rounded-2xl px-5 py-4 mb-8 flex items-center justify-between"
                        style={{ backgroundColor: '#F5F3EF', border: '1px solid #E8E0D0' }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <div className="text-left">
                          <p className="font-marvel text-xs" style={{ color: '#BCBCBC' }}>Order ID</p>
                          <p className="font-cormorant text-lg font-bold" style={{ color: '#546B41' }}>#{orderId}</p>
                        </div>
                        {paymentStatus && (
                          <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: '#E8F5E9' }}
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#546B41' }} />
                            <span className="font-marvel text-xs font-semibold uppercase tracking-wide" style={{ color: '#546B41' }}>
                              {paymentStatus}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Animated package icon */}
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DCCCAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16.5 9.4l-9-5.19" />
                          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </motion.div>
                    </motion.div>

                    {/* Delivery tracking message */}
                    <motion.div
                      className="w-full rounded-2xl px-5 py-4 text-center"
                      style={{ backgroundColor: '#F5F3EF', border: '1px solid #E8E0D0' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <p className="font-marvel text-sm mb-1" style={{ color: '#99AD7A' }}>
                        For delivery tracking, please mail us at
                      </p>
                      <a
                        href="mailto:contact.mkstudio@protonmail.com"
                        className="font-cormorant text-base font-bold tracking-wide"
                        style={{ color: '#546B41' }}
                      >
                        contact.mkstudio@protonmail.com
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OrderSuccessAnimation
