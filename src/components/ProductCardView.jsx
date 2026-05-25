import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ProductCardView = ({ id, image, name, price }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${id}`)
  }

  return (
    <motion.div
      onClick={handleClick}
      className='group cursor-pointer overflow-hidden'
      style={{ backgroundColor: '#FFF8EC' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <div className='relative overflow-hidden aspect-square'>
        <motion.img
          src={image}
          alt={name}
          className='w-full h-full object-cover'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        {/* Gradient Overlay on Hover */}
        <div 
          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          style={{ background: 'linear-gradient(to top, rgba(84, 107, 65, 0.7), transparent)' }}
        />
      </div>

      {/* Product Info */}
      <div className='p-4' style={{ borderTop: '2px solid #DCCCAC' }}>
        {/* Product Name */}
        <h3 
          className='font-cormorant text-lg md:text-xl font-bold mb-1 line-clamp-2'
          style={{ color: '#546B41' }}
        >
          {name}
        </h3>

        {/* Price */}
        <p 
          className='font-marvel text-sm md:text-base'
          style={{ color: '#99AD7A' }}
        >
          from <span className='font-bold' style={{ color: '#546B41' }}>₹{price.toLocaleString('en-IN')}</span>
        </p>

        {/* View Details Button - Shows on Hover */}
        <motion.button
          className='mt-3 w-full py-2 font-cormorant font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300'
          style={{
            backgroundColor: '#546B41',
            color: '#FFF8EC'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCardView