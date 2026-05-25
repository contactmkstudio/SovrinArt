import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2'

const ProductDetailedView = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

  return (
    <div className='min-h-screen py-20' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          
          {/* Left Section - Images (Fixed/Sticky) */}
          <div className='lg:sticky lg:top-24 lg:h-fit flex gap-4'>
            
            {/* Thumbnail Images */}
            <div className='flex flex-col gap-3 overflow-y-auto max-h-150 scrollbar-thin'>
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  className='cursor-pointer border-2 overflow-hidden'
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
                    alt={`${product.name} view ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </motion.div>
              ))}
            </div>

            {/* Main Product Image */}
            <motion.div 
              className='flex-1 overflow-hidden'
              style={{ backgroundColor: '#FFF8EC' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={selectedImage}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </motion.div>
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
              {product.name}
            </motion.h1>

            {/* Product Description */}
            <p className='font-marvel text-base mb-6' style={{ color: '#99AD7A' }}>
              {product.description}
            </p>

            {/* Price */}
            <div className='mb-8'>
              <p className='font-marvel text-sm mb-1' style={{ color: '#99AD7A' }}>
                Price
              </p>
              <p className='font-cormorant text-4xl font-bold' style={{ color: '#546B41' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Size Selection */}
            <div className='mb-8'>
              <p className='font-cormorant text-lg font-bold mb-3' style={{ color: '#546B41' }}>
                Select Size
              </p>
              <div className='grid grid-cols-4 gap-3'>
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className='py-3 font-cormorant font-semibold border-2 transition-all duration-300'
                    style={{
                      backgroundColor: selectedSize === size ? '#546B41' : '#FFF8EC',
                      color: selectedSize === size ? '#FFF8EC' : '#546B41',
                      borderColor: selectedSize === size ? '#546B41' : '#DCCCAC'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

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
                  className='flex-1 py-4 font-cormorant text-lg font-bold border-2 transition-all duration-300'
                  style={{
                    backgroundColor: '#FFF8EC',
                    borderColor: '#546B41',
                    color: '#546B41'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
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
              <ul className='space-y-2 font-marvel text-sm' style={{ color: '#99AD7A' }}>
                <li>• High-quality canvas print</li>
                <li>• Fade-resistant inks</li>
                <li>• Ready to hang</li>
                <li>• Certificate of authenticity included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailedView