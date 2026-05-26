import React from 'react'
import { motion } from 'framer-motion'
import ProductCardView from '../components/ProductCardView'
import { productsData } from '../constants/productsData'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'

const ViewAll = () => {
  return (
    <div className='min-h-screen bg-white'> 

      {/* New Art Launch Banner */}
      <NewArtLaunch />

      {/* Navbar */}
      <Navbar />

      <div className='max-w-7xl mx-auto px-4 py-16'>
        
        {/* Page Header */}
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='font-hurricane text-5xl md:text-7xl mb-4 text-black'>
            Our Collection
          </h1>
          <p className='font-cormorant text-lg md:text-xl text-black'>
            Discover exquisite paintings that speak to your soul
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8'>
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

export default ViewAll