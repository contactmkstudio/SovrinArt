import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigationLinks = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Login', link: '/login' },
    { name: 'Register', link: '/register' },
  ]

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  // Overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  // Menu items stagger animation
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <>
      {/* Hamburger Menu Button - Visible only on mobile/tablet */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className='md:hidden fixed top-6 left-4 z-40 p-2'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <HiOutlineBars3 className='text-white text-3xl' />
      </motion.button>

      {/* Sidebar and Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className='fixed inset-0 bg-black/60 z-40'
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className='fixed top-0 left-0 h-full w-80 z-50 shadow-2xl'
              style={{ backgroundColor: '#000000' }}
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <div className='flex justify-end p-6'>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-lg'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiOutlineXMark className='text-white text-3xl' />
                </motion.button>
              </div>

              {/* Logo/Brand */}
              <div className='px-6 mb-10'>
                <h1 className='font-hurricane text-5xl text-yellow-400'>
                  Sovrinart
                </h1>
                <p className='font-cormorant text-sm text-white/70 mt-2'>
                  Where art meets emotion
                </p>
              </div>

              {/* Navigation Links */}
              <nav className='px-6'>
                <ul className='space-y-2'>
                  {navigationLinks.map((item, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className='block py-3 px-4 rounded-lg font-cormorant text-xl font-semibold text-white hover:bg-yellow-400/20 transition-all duration-300 border-b border-white/10'
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className='absolute bottom-6 left-6 right-6'>
                <p className='font-marvel text-xs text-white/50 text-center'>
                  © 2026 Sovrinart Gallery
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar