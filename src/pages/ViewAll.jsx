import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCardView from '../components/ProductCardView'
import { getProducts } from '../api/apiService'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'

const ViewAll = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch products on mount
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await getProducts()
        setProducts(response.data || response || [])
      } catch (error) {
        console.log('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProductsData()
  }, [])
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className='bg-gray-300 rounded-lg animate-pulse h-80'></div>
            ))
          ) : products.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <p className='text-gray-500 text-lg'>No products available</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCardView
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewAll