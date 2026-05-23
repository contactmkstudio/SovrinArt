import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const HoverRevealImage = ({ imageSrc, altText = "Art Gallery" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  const rafRef = useRef(null)

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    
    // Cancel previous animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    // Use requestAnimationFrame to throttle updates
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      setMousePosition({ x, y })
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePosition({ x: 50, y: 50 })
    // Cleanup animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className='relative w-full h-100 md:h-137.5 lg:h-162.5 rounded-3xl overflow-hidden cursor-none'
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Base Dark Image Layer */}
      <motion.div 
        className='absolute inset-0 bg-black'
        style={{ WebkitTapHighlightColor: 'transparent' }}
        animate={{
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img 
          src={imageSrc} 
          alt={altText} 
          className='w-full h-full object-cover opacity-20 blur-sm'
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
      </motion.div>

      {/* Revealed Image Layer with Spotlight Mask */}
      <motion.div 
        className='absolute inset-0'
        style={{
          maskImage: isHovering 
            ? `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`
            : 'radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: isHovering 
            ? `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`
            : 'radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitTapHighlightColor: 'transparent',
        }}
        animate={{
          scale: isHovering ? 1.08 : 1,
        }}
        transition={{ 
          scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        <img 
          src={imageSrc} 
          alt={`${altText} Revealed`}
          className='w-full h-full object-cover'
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
      </motion.div>

      {/* Spotlight Glow Effect */}
      {isHovering && (
        <motion.div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Golden Border with Glow */}
      <motion.div 
        className='absolute inset-0 rounded-3xl pointer-events-none'
        style={{
          border: '2px solid rgba(251, 191, 36, 0.3)',
        }}
        animate={{
          boxShadow: isHovering 
            ? '0 0 60px rgba(251, 191, 36, 0.4), inset 0 0 60px rgba(251, 191, 36, 0.1)' 
            : '0 0 20px rgba(251, 191, 36, 0.2)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Instruction Text */}
      <motion.div 
        className='absolute inset-0 flex items-center justify-center pointer-events-none'
        animate={{
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className='text-center px-6'>
          <motion.h3 
            className='font-hurricane text-4xl md:text-6xl lg:text-7xl bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2'
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Explore the Art
          </motion.h3>
          <p className='font-cormorant text-white/70 text-lg md:text-xl'>
            Move your cursor to reveal
          </p>
        </div>
      </motion.div>

      {/* Cursor Follower Dot */}
      {isHovering && (
        <motion.div
          className='absolute w-3 h-3 rounded-full bg-yellow-400/80 pointer-events-none blur-sm'
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Ambient Light Particles */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 rounded-full bg-yellow-400/30'
            style={{
              left: `${(i * 15 + 10)}%`,
              top: `${(i * 13 + 15) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default HoverRevealImage
