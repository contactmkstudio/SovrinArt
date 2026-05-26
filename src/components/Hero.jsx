import React, { useState } from 'react'
import sovrinHero from '../assets/sovrinHero.webp'
import sovrinHero2 from '../assets/sovrinHero2.webp'
import { motion } from 'framer-motion'
import HeroItems from './HeroItems'
import Sidebar from './Sidebar'
import { HiOutlineUser, HiOutlineBars3 } from "react-icons/hi2"

const Hero = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Container animation for fade in + slide up animayion
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        staggerChildren: 0.4
      }
    }
  };

  // Child items animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  // Typewriter effect for letters
  const sentence = "JARIWALA MITALI";
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section className="relative min-h-dvh">

       {/* {banner}  */}
       <img src={sovrinHero} alt="Sovrin Hero" className='absolute h-full w-full object-cover inset-0'/>

       {/* {banner Text} */}
       <div className="absolute inset-0 flex flex-col justify-between bg-black/20 ">
          {/* {Headrer-Content} */}
          <div className='mt-8 md:mt-24 flex flex-col space-y-5'>

             
              <div className='flex justify-between items-center px-2.5 py-2 md:p-0 relative z-10'>
                {/* Hamburger Menu - Mobile Only */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className='md:hidden p-2'
                >
                  <HiOutlineBars3 className='text-white text-3xl' />
                </button>

                {/* Sovrinart Text */}
                <div className='grow flex justify-center'>
                  <motion.h1 
                    className='font-hurricane text-xl tracking-widest md:text-4xl text-center font-bold text-white'
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    Sovrinart
                  </motion.h1>
                </div>

                {/* Profile Icon - Mobile Only */}
                <div className='md:hidden p-2'>
                  <HiOutlineUser size={28} className='text-white'/>
                </div> 
              </div>
              
              {/* {nav-items} */}
               <HeroItems />


          </div>

          {/* {Banner-Content} */}
          <motion.div 
            className='flex flex-col items-center justify-center mb-40'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
              <motion.h1 
                className='text-white font-megrim text-md font-bold  max-w-full text-center'
                variants={itemVariants}
              >
                ARTIST OF THE PAGE
              </motion.h1>
              
              <motion.h1 
                className='text-white font-cormorant text-2xl md:text-4xl lg:text-6xl font-bold md:font-extrabold tracking-[2px] max-w-full text-center'
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
              >
                {sentence.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    transition={{ duration: 0.3 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h1 
                className='text-white text-sm md:text-2xl text-center font-marvel tracking-widest'
                variants={itemVariants}
              >
                Where Colors Speak Louder Than Words.
              </motion.h1>

              <motion.button 
                className='bg-white text-black px-6 py-1 md:py-3 mt-3 cursor-pointer group'
                variants={itemVariants}
                whileHover={{ scale: 1.1, transition: { type: "spring", bounce: 0.3, duration: 0.9 } }}
                whileTap={{ scale: 0.95 }}
              >
                <h1 className='font-marvel group-hover:font-hurricane tracking-[2px] md:tracking-[6px] font-bold md:font-extrabold transition-all duration-300'>CONTACT</h1>
              </motion.button>
          </motion.div>
       </div>

       {/* Sidebar */}
       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </section>
  )
}

export default Hero