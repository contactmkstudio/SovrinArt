import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCardView from '../components/ProductCardView'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Loader from '../components/Loader'
import { getFavourites } from '../api/apiService'
import { useAuth } from '../context/AuthContext'

const Favourites = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await getFavourites(user?.email)
        const items = response?.data?.items || response?.items || []
        setProducts(items.map(item => item.product_details))
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    if (user?.email) fetchFavourites()
    else setLoading(false)
  }, [user])

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
            Favourites
          </h1>
          <p className='font-cormorant text-lg md:text-xl text-black'>
            Your saved artworks, all in one place
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {loading ? (
            <div className='col-span-full'><Loader /></div>
          ) : products.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <p className='text-gray-500 text-lg'>No favourites added yet</p>
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

export default Favourites
