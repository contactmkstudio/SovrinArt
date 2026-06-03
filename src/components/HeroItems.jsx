import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import AddToCart from './AddToCart'
import ProfileCard from './ProfileCard'


const HeroItems = () => {
  
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useState(false)

   const pages = [
    {name: 'Home', link: '/home'},
    {name: 'About', link: '/about'},
    {name: 'Contact', link: '#contact-section'},
    {name: 'Login' , link:'/login'},
  ]

  const handleClick = (e, page) => {
    e.preventDefault()
    
    if (page.name === 'Contact') {
      const element = document.querySelector('#contact-section')
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else if (page.name === 'About') {
      navigate(page.link)
    } else {
      navigate(page.link)
    }
  }

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
     <div className='relative flex items-center justify-center'>
        <motion.ul 
          className='flex gap-15'
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
                <a 
                  href={page.link} 
                  className='relative cursor-pointer'
                  onClick={(e) => handleClick(e, page)}
                >
                    <h1 className='hidden md:block font-megrim tracking-[5px] text-xl font-bold text-white'>
                    {page.name}
                    </h1> 
                    <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-500 ease-in-out group-hover:w-full'></span>
                </a>
            </motion.li>
            ))}
        </motion.ul>

        {/* Cart & Profile Icons - Desktop Only (mobile shown in Hero header row) */}
        <div className='absolute right-4 hidden md:flex items-center gap-4'>
          <motion.button
            onClick={() => setIsCartOpen(true)}
            className='relative group'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <HiOutlineShoppingBag className='text-white text-2xl md:text-3xl hover:scale-110 transition-transform duration-300' />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ProfileCard iconSize='text-2xl md:text-3xl' />
          </motion.div>
        </div>

        {/* AddToCart only needed on desktop here */}
        <AddToCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>
  )
}

export default HeroItems