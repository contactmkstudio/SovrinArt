import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductCardView from '../components/ProductCardView'
import { productsData } from '../constants/productsData'

const ProductCard = () => {
  const navigate = useNavigate()

  // Show only first 8 products for horizontal scroll
  const displayProducts = productsData.slice(0, 8)

  return (
    <div className='py-16 px-4' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='max-w-7xl mx-auto'>
        
        {/* Section Header */}
        <motion.div 
          className='text-center mb-8'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='font-hurricane text-4xl md:text-6xl mb-2' style={{ color: '#546B41' }}>
            Our Collection
          </h2>
          <p className='font-cormorant text-base md:text-lg' style={{ color: '#99AD7A' }}>
            Discover exquisite paintings that speak to your soul
          </p>
        </motion.div>

        {/* Horizontal Scrollable Products */}
        <div className='relative mb-8'>
          <div className='flex gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
            {displayProducts.map((product) => (
              <div key={product.id} className='shrink-0 w-64 md:w-80 snap-start'>
                <ProductCardView
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button - Centered Below Cards */}
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={() => navigate('/products')}
            className='font-cormorant font-semibold px-8 py-3 text-base md:text-lg'
            style={{
              backgroundColor: '#546B41',
              color: '#FFF8EC'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductCard