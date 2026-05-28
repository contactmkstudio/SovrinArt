import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark } from 'react-icons/hi2'
import sovrinHero2 from '../assets/sovrinHero2.webp'

const AboutPopup = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/60 z-40 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Content */}
          <motion.div
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[90%] lg:w-[80%] max-w-6xl z-50'
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div 
              className='relative rounded-3xl overflow-hidden shadow-2xl border-2'
              style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className='absolute top-3 right-3 md:top-4 md:right-4 z-100 p-2 md:p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg'
                style={{ backgroundColor: '#546B41' }}
              >
                <HiOutlineXMark className='text-xl md:text-2xl' style={{ color: '#FFF8EC' }} />
              </button>

              {/* Content Container */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[85vh] overflow-y-auto'>
                
                {/* Left Section - Image */}
                <motion.div 
                  className='relative h-64 lg:h-auto min-h-100'
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className='absolute inset-0 bg-linear-to-br from-[#546B41]/20 to-transparent z-10'></div>
                  <img 
                    src={sovrinHero2} 
                    alt="Artist" 
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent z-10'>
                    <motion.h3 
                      className='font-cormorant text-3xl font-bold text-white'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      JARIWALA MITALI
                    </motion.h3>
                    <motion.p 
                      className='font-marvel text-white/90 text-sm'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      Artist of the Page
                    </motion.p>
                  </div>
                </motion.div>

                {/* Right Section - About Content */}
                <motion.div 
                  className='p-6 md:p-10 flex flex-col justify-center'
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className='mb-6'>
                    <h2 className='font-cormorant text-3xl md:text-4xl font-bold mb-3' style={{ color: '#546B41' }}>
                      About The Artist
                    </h2>
                    <div className='w-20 h-1 mb-4' style={{ backgroundColor: '#546B41' }}></div>
                  </div>

                  <div className='space-y-4 font-marvel text-sm md:text-base' style={{ color: '#99AD7A' }}>
                    <p className='leading-relaxed'>
                      Welcome to SOVRINART, where every brushstroke tells a story and every canvas breathes life. 
                      Jariwala Mitali is a passionate artist dedicated to creating original, handcrafted artwork that 
                      speaks to the soul.
                    </p>
                    
                    <p className='leading-relaxed'>
                      With years of experience in various artistic mediums, Mitali specializes in creating unique pieces 
                      that blend traditional techniques with contemporary vision. Each artwork is meticulously crafted 
                      with attention to detail, ensuring that every piece is truly one-of-a-kind.
                    </p>

                    <p className='leading-relaxed'>
                      The philosophy behind SOVRINART is simple: art should be accessible, meaningful, and timeless. 
                      Whether it's a custom commission or a ready-made piece, every creation carries the artist's 
                      signature style and dedication to excellence.
                    </p>

                    <div className='pt-4 border-t-2' style={{ borderColor: '#DCCCAC' }}>
                      <h3 className='font-cormorant text-xl font-semibold mb-3' style={{ color: '#546B41' }}>
                        Artistic Journey
                      </h3>
                      <ul className='space-y-2 ml-4'>
                        <li className='flex items-start gap-2'>
                          <span style={{ color: '#546B41' }}>•</span>
                          <span>Specialized in custom automotive and portrait artwork</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span style={{ color: '#546B41' }}>•</span>
                          <span>Featured in multiple art exhibitions and galleries</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span style={{ color: '#546B41' }}>•</span>
                          <span>Committed to sustainable and eco-friendly art practices</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span style={{ color: '#546B41' }}>•</span>
                          <span>Delivering premium collector experiences worldwide</span>
                        </li>
                      </ul>
                    </div>

                    <div className='pt-6'>
                      <blockquote className='italic border-l-4 pl-4' style={{ borderColor: '#546B41', color: '#99AD7A' }}>
                        "Where Colors Speak Louder Than Words - Every piece is a conversation between the artist and the soul."
                      </blockquote>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AboutPopup
