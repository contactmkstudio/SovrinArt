import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark, HiOutlineTrash } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import { getCartItems } from '../api/apiService'
import Loader from './Loader'

const AddToCart = ({ isOpen, setIsOpen }) => {
  const { user, isAuthenticated } = useAuth()
  const { currency } = useCurrency()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch cart items when cart opens
  useEffect(() => {
    if (isOpen) {
      if (!user?.email) {
        setCartItems([])
        setLoading(false)
      } else {
        fetchCartItems()
      }
    }
  }, [isOpen, user?.email])

  const fetchCartItems = async () => {
    try {
      setLoading(true)
      const response = await getCartItems(user?.email)
      
      // Handle different response formats
      const items = Array.isArray(response?.data?.items)
        ? response.data.items
        : Array.isArray(response?.data) 
        ? response.data 
        : Array.isArray(response?.items)
        ? response.items
        : Array.isArray(response)
        ? response
        : []
      
      setCartItems(items)
    } catch (error) {
      console.error('Error fetching cart items:', error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Use same extraction logic as rendering
      const priceRs = item?.product_details?.price_rs || item?.product_details?.price || item?.price || item?.product_price || item?.product?.price_rs || 0
      const priceUsd = item?.product_details?.price_usd || item?.product?.price_usd || 0
      const price = currency === 'INR' ? priceRs : priceUsd
      const quantity = item?.quantity || 1
      const itemTotal = parseFloat(price) * parseFloat(quantity)
      return total + itemTotal
    }, 0)
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => (item?.id || item?.product_id) !== id))
  }

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => {
      const itemId = item?.id || item?.product_id
      return itemId === id ? { ...item, quantity: newQuantity } : item
    }))
  }

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  // Overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }



  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/60 z-40'
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Sidebar */}
          <motion.div
            className='fixed top-0 right-0 h-full w-96 z-50 shadow-2xl flex flex-col'
            style={{ backgroundColor: '#FAFAFA' }}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-300'>
              <h2 className='font-cormorant text-2xl font-bold' style={{ color: '#546B41' }}>
                Shopping Cart
              </h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className='p-2 rounded-lg hover:bg-gray-200 transition-colors'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineXMark className='text-2xl' style={{ color: '#546B41' }} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-6'>
              {!user?.email ? (
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='font-cormorant text-lg text-gray-500 mb-4'>
                    Please login to view your cart
                  </p>
                  <Link 
                    to="/login"
                    className='px-6 py-2 font-cormorant font-semibold'
                    style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                  >
                    Go to Login
                  </Link>
                </div>
              ) : loading ? (
                <div className='flex items-center justify-center h-full'>
                  <Loader />
                </div>
              ) : cartItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='font-cormorant text-lg text-gray-500 mb-4'>
                    Your cart is empty
                  </p>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className='px-6 py-2 font-cormorant font-semibold'
                    style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cartItems.map((item) => {
                    // Handle different API response formats
                    const itemId = item?.id || item?.product_id
                    // Check product_details first (from API), then fallback to other formats
                    const itemName = item?.product_details?.name || item?.name || item?.product_name || item?.product?.name
                    const itemPrice = item?.product_details?.price_rs || item?.product_details?.price || item?.price || item?.product_price || item?.product?.price_rs
                    const itemImage = item?.product_details?.image || item?.image || item?.product_image || item?.product?.image
                    const itemQuantity = item?.quantity || 1
                    
                    return (
                      <motion.div
                        key={itemId}
                        className='flex gap-4 p-4 rounded-lg'
                        style={{ backgroundColor: '#FFF8EC' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {/* Product Image */}
                        <div 
                          onClick={() => {
                            // Navigate to product detail with full product object
                            navigate(`/products/${itemId}`, { 
                              state: { 
                                product: {
                                  id: itemId,
                                  name: itemName,
                                  price_rs: itemPrice,
                                  price_usd: item?.product_details?.price_usd || item?.product?.price_usd,
                                  image: itemImage,
                                  description: item?.product_details?.description || item?.product?.description,
                                  details_read: item?.product_details?.details_read || item?.product?.details_read,
                                  sizes_read: item?.product_details?.sizes_read || item?.product?.sizes_read,
                                  other_images_read: item?.product_details?.other_images_read || item?.product?.other_images_read
                                }
                              } 
                            })
                            setIsOpen(false)
                          }}
                          className='w-20 h-20 bg-gray-200 rounded flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity'
                        >
                          {itemImage ? (
                            <img 
                              src={itemImage} 
                              alt={itemName || 'Product'}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <span className='text-xs text-gray-400'>No Image</span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className='flex-1'>
                          <h3 className='font-cormorant font-bold text-lg' style={{ color: '#546B41' }}>
                            {itemName || 'Product'}
                          </h3>
                          <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
                            {currency === 'INR' 
                              ? `₹${parseFloat(itemPrice || 0).toLocaleString('en-IN')}`
                              : `$${parseFloat(item?.product_details?.price_usd || item?.product?.price_usd || 0).toFixed(2)}`
                            }
                          </p>

                          {/* Quantity Controls */}
                          <div className='flex items-center gap-2 mt-2'>
                            <button
                              onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                              className='w-6 h-6 flex items-center justify-center rounded border'
                              style={{ borderColor: '#546B41', color: '#546B41' }}
                            >
                              -
                            </button>
                            <span className='font-marvel text-sm w-8 text-center'>{itemQuantity}</span>
                            <button
                              onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                              className='w-6 h-6 flex items-center justify-center rounded border'
                              style={{ borderColor: '#546B41', color: '#546B41' }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(itemId)}
                          className='p-2 hover:bg-red-100 rounded transition-colors'
                        >
                          <HiOutlineTrash className='text-red-500 text-xl' />
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {user?.email && cartItems.length > 0 && (
              <div className='border-t border-gray-300 p-6 space-y-4'>
                {/* Subtotal */}
                <div className='flex justify-between items-center'>
                  <span className='font-cormorant text-lg font-semibold' style={{ color: '#546B41' }}>
                    Subtotal:
                  </span>
                  <span className='font-cormorant text-2xl font-bold' style={{ color: '#546B41' }}>
                    {currency === 'INR' 
                      ? `₹${calculateTotal().toLocaleString('en-IN')}`
                      : `$${calculateTotal().toFixed(2)}`
                    }
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/login')
                      return
                    }
                    setIsOpen(false)
                    navigate('/order-summary', { state: { cartItems, fromCart: true } })
                  }}
                  className='w-full py-3 font-cormorant text-lg font-bold'
                  style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={() => setIsOpen(false)}
                  className='w-full py-3 font-cormorant text-base font-semibold border-2'
                  style={{ borderColor: '#546B41', color: '#546B41', backgroundColor: '#FFF8EC' }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddToCart
