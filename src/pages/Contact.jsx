import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import PremiumBackground from '../components/PremiumBackground'
import contactImg from '../assets/sovrinHero.webp'

const Contact = () => {
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
    <section className='relative py-12 md:py-20 bg-black text-white overflow-hidden'>
      {/* Premium Background */}
      <PremiumBackground />
      
      <div className='relative z-10 flex flex-col gap-6 md:gap-8 items-center justify-center px-5 max-w-7xl mx-auto'>

        {/* {get intouch animtion} */}
        <motion.div 
          className='relative max-w-fit p-0.5 rounded-2xl md:rounded-3xl overflow-hidden bg-black'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className='absolute inset-0'
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, #eab308 80%, #fbbf24 90%, #eab308 95%, transparent 100%)',
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className='relative z-10 px-6 md:px-8 py-2 rounded-2xl md:rounded-3xl flex flex-col items-center bg-black'>
            <h1 className='font-hurricane text-xl font-bold md:text-3xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>Get In Touch</h1>
          </div>
        </motion.div>

        <motion.div 
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className='font-cormorant text-2xl font-bold md:text-4xl lg:text-5xl'>
            Lets Create Something <span className='bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>Beautiful</span>
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3'>
          
          {/* Left Side - Premium Spotlight Reveal Effect */}
          <motion.div
            ref={containerRef}
            className='relative w-full h-100 md:h-137.5 lg:h-162.5 rounded-3xl overflow-hidden cursor-none'
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
              animate={{
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img 
                src={contactImg} 
                alt="Art Gallery" 
                className='w-full h-full object-cover opacity-20 blur-sm'
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
              }}
              animate={{
                scale: isHovering ? 1.08 : 1,
              }}
              transition={{ 
                scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              <img 
                src={contactImg} 
                alt="Art Gallery Revealed" 
                className='w-full h-full object-cover'
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
                  className='font-hurricane text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2'
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

          {/* Right Side - Contact Form */}
          <motion.div 
            className='relative w-full p-8 md:p-10 rounded-3xl flex flex-col gap-6 overflow-hidden'
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(251, 191, 36, 0.1)',
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative Golden Glow */}
            <div className='absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl' />
            <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl' />
            
            <div className='relative z-10'>
              <motion.h1 
                className='font-cormorant text-2xl md:text-3xl font-bold text-white mb-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                SEND MESSAGE
              </motion.h1>
              <motion.div 
                className='w-20 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-transparent rounded-full mb-3'
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <p className='font-cormorant text-white/70 text-sm md:text-base'>
                You can also text us directly to connect and discuss your art requirements
              </p>
            </div>

            <div className='relative z-10 flex flex-col gap-5'>
              <motion.div 
                className='flex flex-col gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                <label htmlFor='name' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Your Name
                </label>
                <input 
                  type="text"
                  id='name'
                  placeholder='Enter your name' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 bg-black/30 text-white placeholder:text-white/40 hover:border-white/40'
                />
              </motion.div>

              <motion.div 
                className='flex flex-col gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.6 }}
              >
                <label htmlFor='email' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Email Address
                </label>
                <input 
                  type="email"
                  id='email'
                  placeholder='Enter your email' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 bg-black/30 text-white placeholder:text-white/40 hover:border-white/40'
                />
              </motion.div>

              <motion.div 
                className='flex flex-col gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6 }}
              >
                <label htmlFor='message' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Your Message
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  placeholder='Paint your thoughts and requirements here...' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full h-40 resize-none focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 bg-black/30 text-white placeholder:text-white/40 hover:border-white/40'
                ></textarea>
              </motion.div>

              <motion.button 
                className='relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-lg font-bold md:text-xl px-8 py-4 w-full rounded-xl font-marvel tracking-wide overflow-hidden group mt-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className='relative z-10'>Send Message</span>
                <motion.div 
                  className='absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default Contact