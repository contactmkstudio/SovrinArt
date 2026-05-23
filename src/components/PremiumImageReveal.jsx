import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import revealImage from '../assets/sovrinHero.webp'

const PremiumImageReveal = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 50, y: 50 })
  }

  return (
    <div className='w-full max-w-6xl mx-auto px-5'>
      <motion.div
        ref={containerRef}
        className='relative w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden cursor-none group'
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Base Dark Image Layer */}
        <motion.div 
          className='absolute inset-0 bg-black'
          animate={{
            scale: isHovering ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img 
            src={revealImage} 
            alt="Art Gallery" 
            className='w-full h-full object-cover opacity-20 blur-sm'
          />
        </motion.div>

        {/* Revealed Image Layer with Spotlight Mask */}
        <motion.div 
          className='absolute inset-0'
          style={{
            maskImage: isHovering 
              ? `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`
              : 'radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: isHovering 
              ? `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`
              : 'radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          }}
          animate={{
            scale: isHovering ? 1.08 : 1,
          }}
          transition={{ 
            scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            maskImage: { duration: 0.3 },
          }}
        >
          <img 
            src={revealImage} 
            alt="Art Gallery Revealed" 
            className='w-full h-full object-cover'
          />
        </motion.div>

        {/* Spotlight Glow Effect */}
        {isHovering && (
          <motion.div
            className='absolute inset-0 pointer-events-none'
            style={{
              background: `radial-gradient(circle 250px at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 191, 36, 0.15) 0%, transparent 60%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Golden Border with Glow */}
        <motion.div 
          className='absolute inset-0 rounded-3xl pointer-events-none'
          style={{
            border: '2px solid rgba(251, 191, 36, 0.3)',
            boxShadow: isHovering 
              ? '0 0 60px rgba(251, 191, 36, 0.4), inset 0 0 60px rgba(251, 191, 36, 0.1)' 
              : '0 0 20px rgba(251, 191, 36, 0.2)',
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
              className='font-hurricane text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4'
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
            <p className='font-cormorant text-white/70 text-xl md:text-2xl'>
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
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Ambient Light Particles */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 rounded-full bg-yellow-400/30'
              style={{
                left: `${(i * 12 + 10)}%`,
                top: `${(i * 11 + 15) % 80}%`,
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
    </div>
  )
}

export default PremiumImageReveal
