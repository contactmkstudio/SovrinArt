import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


const HeroItems = () => {
  
  const navigate = useNavigate()

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
     <div className='flex items-center justify-center'>
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
        
       
      </div>
  )
}

export default HeroItems