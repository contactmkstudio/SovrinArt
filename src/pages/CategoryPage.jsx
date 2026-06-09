import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCardView from '../components/ProductCardView'
import { getProductsByCategory } from '../api/apiService'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Loader from '../components/Loader'

const CategoryPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await getProductsByCategory(category)
        setProducts(response?.data || response || [])
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : ''

  return (
    <div className='min-h-screen bg-white'>
      <NewArtLaunch />
      <Navbar />

      <div className='max-w-7xl mx-auto px-4 py-16'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='font-hurricane text-5xl md:text-7xl mb-4 text-black'>
            {displayCategory}
          </h1>
          <p className='font-cormorant text-lg md:text-xl text-black'>
            Explore our {displayCategory.toLowerCase()} collection
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {loading ? (
            <div className='col-span-full'><Loader /></div>
          ) : products.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <p className='text-gray-500 text-lg'>No products found in this category</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCardView key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
