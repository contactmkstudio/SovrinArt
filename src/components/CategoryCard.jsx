import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProductCardView from './ProductCardView'
import { getProductsByCategory } from '../api/apiService'
import Loader from './Loader'

const CategoryCard = ({ category, heading , subheading="" }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory(category)
        const data = response?.data || response || []
        setProducts(data.slice(0, 8))
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const displayCategory = heading || (category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '')

  return (
    <div className='py-16 px-4' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='max-w-7xl mx-auto'>

        {/* Heading */}
        <motion.div
          className='text-center mb-8'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='font-hurricane text-4xl md:text-6xl mb-2' style={{ color: '#546B41' }}>
            {displayCategory}
          </h2>
          <p className='font-cormorant text-base md:text-lg' style={{ color: '#99AD7A' }}>
            Explore our {displayCategory.toLowerCase()} collection
          </p>
           {subheading && (
            <p className='font-cormorant text-sm md:text-base mb-2' style={{ color: '#546B41' }}>
              {subheading}
            </p>
          )}
        </motion.div>

        {/* Horizontal Scrollable Products */}
        <div className='relative mb-8'>
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No products in this category</p>
            </div>
          ) : (
            <div className='flex gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
              {products.map((product) => (
                <div key={product.id} className='shrink-0 w-64 md:w-80 snap-start'>
                  <ProductCardView product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={() => navigate(`/category/${category}`)}
            className='font-cormorant font-semibold px-8 py-3 text-base md:text-lg'
            style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
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

export default CategoryCard
