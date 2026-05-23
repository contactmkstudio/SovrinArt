import React from 'react'
import { motion } from 'framer-motion'
import { gridImages } from '../constants/gridDisplayData'

const GridDisplay = () => {
  return (
    <section className='bg-white/50 py-12 md:py-20 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <motion.h2 
          className='font-cormorant text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className='relative inline-block cursor-pointer'
            whileHover="hover"
            initial="initial"
          >
            <span className='text-black'>Art </span>
            <span className='bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent' style={{ textShadow: '0 0 30px rgba(234, 179, 8, 0.5)' }}>
              Gallery
            </span>
            <motion.span 
              className='absolute bottom-0 right-0 h-1 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full' 
              style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.6)' }}
              variants={{
                initial: { width: '45%' },
                hover: { width: '100%' }
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </motion.span>
        </motion.h2>

        {/* Masonry Grid Layout */}
        <div className='grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4'>
          {/* Large featured item - spans 2x2 */}
          <motion.div
            className='col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={gridImages[0].src}
              alt={gridImages[0].alt}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>

          {/* Regular items */}
          {gridImages.slice(1, 3).map((image, index) => (
            <motion.div
              key={image.id}
              className='relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.div>
          ))}

          {/* Regular items */}
          {gridImages.slice(3, 5).map((image, index) => (
            <motion.div
              key={image.id}
              className='relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.div>
          ))}

          {/* Tall item - spans 1x2 */}
          <motion.div
            className='row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={gridImages[5].src}
              alt={gridImages[5].alt}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>

          {/* Wide item - spans 2x1 */}
          <motion.div
            className='col-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={gridImages[6].src}
              alt={gridImages[6].alt}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>

          {/* Regular items */}
          {gridImages.slice(7).map((image, index) => (
            <motion.div
              key={image.id}
              className='relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index + 7) * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.div>
          ))}
          {/* Extra grid item - repeat image */}
          <motion.div
            className='relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer border border-yellow-600/20'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={gridImages[2].src}
              alt={gridImages[2].alt}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>        </div>
      </div>
    </section>
  )
}

export default GridDisplay
