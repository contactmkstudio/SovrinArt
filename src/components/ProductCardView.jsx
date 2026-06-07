import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'

const ProductCardView = ({ product, id, image, name, price }) => {
  const navigate = useNavigate()
  const { currency } = useCurrency()

  const handleClick = () => {
    const productId = product?.id || id
    navigate(`/products/${productId}`)
  }

  return (
    <motion.div
      onClick={handleClick}
      className='group cursor-pointer overflow-hidden'
      style={{ backgroundColor: '#FFF8EC' }}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: { duration: 0.5 },
        rotateX: { duration: 0.6 }
      }}
      whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Image Container */}
      <div className='relative overflow-hidden aspect-square'>
        <motion.img
          src={product?.image || image}
          alt={product?.name || name}
          className='w-full h-full object-cover'
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.15 }}
        />
        {/* Gradient Overlay on Hover */}
        <motion.div 
          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          style={{ background: 'linear-gradient(to top, rgba(84, 107, 65, 0.7), transparent)' }}
        />
      </div>

      {/* Product Info */}
      <motion.div 
        className='p-4' 
        style={{ borderTop: '2px solid #DCCCAC' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Product Name */}
        <motion.h3 
          className='font-cormorant text-lg md:text-xl font-bold mb-1 line-clamp-2'
          style={{ color: '#546B41' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {product?.name || name}
        </motion.h3>

        {/* Price */}
        <motion.p 
          className='font-marvel text-sm md:text-base'
          style={{ color: '#99AD7A' }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          from <span className='font-bold' style={{ color: '#546B41' }}>
            {currency === 'INR' 
              ? `₹${(product?.price_rs || price || 0).toLocaleString('en-IN')}`
              : `$${(product?.price_usd || 0).toFixed(2)}`
            }
          </span>
        </motion.p>

        {/* View Details Button - Shows on Hover (Desktop) / Always Visible (Mobile) */}
        <motion.button
          className='mt-3 w-full py-2 font-cormorant font-semibold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300'
          style={{
            backgroundColor: '#546B41',
            color: '#FFF8EC'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default ProductCardView