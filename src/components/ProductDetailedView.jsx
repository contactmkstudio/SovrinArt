import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2'
import Navbar from './Navbar'
import NewArtLaunch from './NewArtLaunch'
import Toast from './Toast'
import { orderInclusions, orderInclusionsNote } from '../constants/orderInclusionsData'
import { addToCart } from '../api/apiService'
import { useAuth } from '../context/AuthContext'

const ProductDetailedView = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [toast, setToast] = useState(null)
  const { user } = useAuth()
  
  
 

  // Ensure product has valid images array
  const images = product?.other_images_read && product?.other_images_read?.length > 0 
    ? [product?.image, ...product?.other_images_read?.map(img => img?.image)].filter(img => img)
    : [product?.image || '/placeholder-image.jpg']
  // Filter sizes to only show available ones (not empty/null)
  const sizes = product?.sizes_read?.filter(s => s?.size) || []

  
  // Get current price based on selected size or product base price
  const currentPriceRs = selectedSize?.price_rs || product?.price_rs || 0
  const currentPriceUsd = selectedSize?.price_usd || product?.price_usd || 0

  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      setIsLoadingCart(true)
      const cartData = {
        product_id: product?.id,
        user_email: user?.email,
  
      }
      const response = await addToCart(cartData)
      setToast({
        message: 'Product added to cart successfully!',
        type: 'success'
      })
    } catch (error) {
      setToast({
        message: error?.response?.data?.message || 'Failed to add product to cart',
        type: 'error'
      })
    } finally {
      setIsLoadingCart(false)
    }
  }

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* {new launch component} */}
      <NewArtLaunch />

      {/* Navbar with Sovrinart Header */}
      <Navbar />

      <div className='max-w-7xl mx-auto px-4 pb-20 pt-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          
          {/* Left Section - Images (Fixed/Sticky) */}
          <div className='lg:sticky lg:top-24 lg:h-fit flex flex-col lg:flex-row-reverse gap-4'>
            
            {/* Main Product Image */}
            <motion.div 
              className='flex-1 overflow-hidden aspect-square lg:aspect-auto'
              style={{ backgroundColor: '#FFF8EC', height: '540px' }}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              key={selectedImage}
            >
              <img 
                src={images?.[selectedImage]} 
                alt={product?.name || 'Product'}
                className='w-full h-full object-cover'
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className='flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-150 scrollbar-thin'>
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  className='cursor-pointer border-2 overflow-hidden shrink-0'
                  style={{ 
                    borderColor: selectedImage === index ? '#546B41' : '#DCCCAC',
                    width: '80px',
                    height: '80px'
                  }}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={img} 
                    alt={`${product?.name || 'Product'} view ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Section - Product Info (Scrollable) */}
          <div>
            
            {/* Product Name */}
            <motion.h1 
              className='font-cormorant text-3xl md:text-5xl font-bold mb-4'
              style={{ color: '#546B41' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {product?.name || 'Product'}
            </motion.h1>

            {/* Product Description */}
            <p className='font-marvel text-base mb-6' style={{ color: '#99AD7A' }}>
              {product?.description || 'An exquisite piece of art that brings elegance and sophistication to any space.'}
            </p>

            {/* Price */}
            <div className='mb-8'>
              <p className='font-marvel text-sm mb-1' style={{ color: '#99AD7A' }}>
                {selectedSize ? `Price (${selectedSize?.size})` : 'Price'}
              </p>
              <p className='font-cormorant text-4xl font-bold' style={{ color: '#546B41' }}>
                ₹{parseFloat(currentPriceRs || 0).toLocaleString('en-IN')}
              </p>
              {currentPriceUsd && (
                <p className='font-cormorant text-4xl font-bold' style={{ color: '#546B41' }}>
                  ${(parseFloat(currentPriceUsd) || 0).toFixed(2)}
                </p>
              )}
            </div>

            {/* Size Selection */}
            {sizes?.length > 0 && (
              <div className='mb-8'>
                <p className='font-cormorant text-lg font-bold mb-3' style={{ color: '#546B41' }}>
                  Select Size
                </p>
                <div className='grid grid-cols-4 gap-3'>
                  {sizes?.map((sizeObj, index) => {
                    const sizeLabel = sizeObj?.size
                    const isSelected = selectedSize?.size === sizeLabel
                    return (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedSize(sizeObj)}
                        className='py-3 font-cormorant font-semibold border-2 transition-all duration-300'
                        style={{
                          backgroundColor: isSelected ? '#546B41' : '#FFF8EC',
                          color: isSelected ? '#FFF8EC' : '#546B41',
                          borderColor: isSelected ? '#546B41' : '#DCCCAC'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {sizeLabel}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className='space-y-3'>
              {/* Buy Now Button */}
              <motion.button
                className='w-full py-4 font-cormorant text-lg font-bold transition-all duration-300'
                style={{
                  backgroundColor: '#546B41',
                  color: '#FFF8EC'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>

              <div className='flex gap-3'>
                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isLoadingCart}
                  className='flex-1 py-4 font-cormorant text-lg font-bold border-2 transition-all duration-300 disabled:opacity-50'
                  style={{
                    backgroundColor: '#FFF8EC',
                    borderColor: '#546B41',
                    color: '#546B41'
                  }}
                  whileHover={{ scale: isLoadingCart ? 1 : 1.02 }}
                  whileTap={{ scale: isLoadingCart ? 1 : 0.98 }}
                >
                  {isLoadingCart ? 'Adding...' : 'Add to Cart'}
                </motion.button>

                {/* Wishlist Button */}
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className='py-4 px-6 border-2 transition-all duration-300'
                  style={{
                    backgroundColor: isWishlisted ? '#546B41' : '#FFF8EC',
                    borderColor: '#546B41',
                    color: isWishlisted ? '#FFF8EC' : '#546B41'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isWishlisted ? (
                    <HiHeart size={28} />
                  ) : (
                    <HiOutlineHeart size={28} />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Product Details */}
            <div className='mt-8 pt-8 border-t-2' style={{ borderColor: '#DCCCAC' }}>
              <h3 className='font-cormorant text-xl font-bold mb-3' style={{ color: '#546B41' }}>
                Product Details
              </h3>
              {product?.details_read && product?.details_read?.length > 0 ? (
                <ul className='space-y-2 font-marvel text-sm' style={{ color: '#546B41' }}>
                  {product?.details_read?.map((detail, index) => (
                    <li key={index}>• {detail?.detail}</li>
                  ))}
                </ul>
              ) : (
                <p className='font-marvel text-sm' style={{ color: '#546B41' }}>No details available</p>
              )}
            </div>

            {/* What's Included With Your Order */}
            <div className='mt-8 pt-8 border-t-2' style={{ borderColor: '#DCCCAC' }}>
              <h3 className='font-cormorant text-xl font-bold mb-3' style={{ color: '#546B41' }}>
                What's Included With Your Order
              </h3>
              <ul className='space-y-2 font-marvel text-sm' style={{ color: '#546B41' }}>
                {orderInclusions?.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              <p className='mt-3 font-marvel text-xs italic' style={{ color: '#546B41' }}>
                {orderInclusionsNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailedView