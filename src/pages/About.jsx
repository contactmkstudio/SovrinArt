import React from 'react'
import { motion } from 'framer-motion'
import sovrinHero2 from '../assets/sovrinHero2.webp'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center py-10 px-2' style={{ backgroundColor: '#FFF8EC' }}>
      <div className='w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border-2' style={{ borderColor: '#DCCCAC' }}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
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
                MKKATELIER
              </motion.h3>
              <motion.p 
                className='font-marvel text-white/90 text-sm'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                About Us
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
                Avant Garde Art For Private Estates.
              </h2>
              <div className='w-20 h-1 mb-4' style={{ backgroundColor: '#546B41' }}></div>
            </div>

            <div className='space-y-4 font-marvel text-md md:text-lg' style={{ color: '#728553' }}>
              <p className='leading-relaxed'>
                Welcome to Mkkatelier, where every brushstroke tells a story and every canvas breathes life. 
                MKKATELIER is a passionate artist dedicated to creating original, handcrafted artwork that 
                speaks to the soul.
              </p>
              <p className='leading-relaxed'>
                With years of experience in various artistic mediums, MKKATELIER specializes in creating unique pieces 
                that blend traditional techniques with contemporary vision. Each artwork is meticulously crafted 
                with attention to detail, ensuring that every piece is truly one-of-a-kind.
              </p>
              <p className='leading-relaxed'>
                The philosophy behind Mkkatelier is simple: art should be accessible, meaningful, and timeless. 
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
    </div>
  )
}

export default About