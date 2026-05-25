import React from 'react'
import { motion } from 'framer-motion'
import ProductCardView from '../components/ProductCardView'
import { productsData } from '../constants/productsData'

const ProductCard = () => {
  return (
    <div className='min-h-screen py-20 px-4' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='max-w-7xl mx-auto'>
        
        {/* Page Header */}
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='font-hurricane text-5xl md:text-7xl mb-4' style={{ color: '#546B41' }}>
            Our Collection
          </h1>
          <p className='font-cormorant text-lg md:text-xl' style={{ color: '#99AD7A' }}>
            Discover exquisite paintings that speak to your soul
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
          {productsData.map((product) => (
            <ProductCardView
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard