import { motion } from 'framer-motion'
import React from 'react'



const PremiumBackground = () => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
      
      {/* Large Golden Orb - Top Left */}
      <motion.div
        className='absolute -top-20 -left-20 w-96 h-96 bg-[#b8860b] rounded-full'
        style={{ filter: 'blur(120px)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Medium Golden Orb - Top Right */}
      <motion.div
        className='absolute top-1/4 -right-32 w-80 h-80 bg-[#b8860b] rounded-full'
        style={{ filter: 'blur(100px)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.12, 0.06],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large Golden Orb - Bottom Center */}
      <motion.div
        className='absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-[#b8860b] rounded-full'
        style={{ filter: 'blur(130px)', transform: 'translateX(-50%)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.07, 0.14, 0.07],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles - Elegant dots with glow */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-[#b8860b] rounded-full'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(184, 134, 11, 0.5)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Subtle Grid Lines Overlay */}
      <div 
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `
            linear-gradient(rgba(184, 134, 11, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 134, 11, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient Overlay for depth */}
      <div 
        className='absolute inset-0'
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  )
}

export default PremiumBackground
