import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import AddToCart from './AddToCart'

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pages = [
    {name: 'Home', link: '/home', type: 'route'},
    {name: 'About', link: '/about', type: 'route'},
    {name: 'Terms & Conditions', link: '/terms-and-conditions', type: 'route'},
    {name: 'Login' , link:'/login', type: 'route'},
  ]

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className='bg-white border-b border-gray-200'>
      {/* Header with Sovrinart Text */}
      <div className='py-6 px-4 pb-2'>
        <div className='flex flex-col items-center'>
          <motion.h1 
            className='font-hurricane text-xl tracking-widest md:text-4xl text-center font-bold mb-4'
            style={{ color: '#546B41' }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Sovrinart
          </motion.h1>
          <div className='w-32 h-px bg-linear-to-r from-transparent via-[#546B41] to-transparent'></div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className='relative flex items-center justify-center py-4 px-4 md:px-8'>
        {/* Hamburger Menu Button - Mobile Only */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden absolute left-4'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <HiOutlineXMark className='text-black text-3xl' />
          ) : (
            <HiOutlineBars3 className='text-black text-3xl' />
          )}
        </motion.button>

        {/* Desktop Navigation */}
        <motion.ul 
          className='hidden md:flex gap-15'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {pages.map((page, index)=>(
            <motion.li 
              key={index} 
              className='group'
              variants={itemVariants}
            >
                <Link to={page.link} className='relative'>
                  <h1 className='font-megrim tracking-[5px] text-xl font-bold text-black'>
                  {page.name}
                  </h1> 
                  <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-500 ease-in-out group-hover:w-full'></span>
                </Link>
            </motion.li>
            ))}
        </motion.ul>

        {/* Cart Icon */}
        <motion.div 
          className='absolute right-4 md:right-8'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className='relative group'
          >
            <HiOutlineShoppingBag className='text-black text-2xl md:text-3xl hover:scale-110 transition-transform duration-300' />
            {/* Optional: Cart item count badge */}
            {/* <span className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>0</span> */}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='md:hidden bg-white border-t border-gray-200'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className='px-4 py-4'>
              <ul className='space-y-3'>
                {pages.map((page, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={page.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='block py-2 px-4 font-megrim text-lg font-bold text-black hover:bg-gray-100 rounded transition-colors'
                    >
                      {page.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AddToCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      
      {/* About Popup removed */}
    </div>
  )
}

export default Navbar
