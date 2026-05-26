import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineXMark, HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const AddToCart = ({ isOpen, setIsOpen }) => {
  // Dummy cart items - replace with actual cart state management
  const [cartItems, setCartItems] = useState([
    // Example structure:
    // { id: 1, name: 'Product Name', price: 5000, quantity: 1, image: 'url' }
  ])

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
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
              {cartItems.length === 0 ? (
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
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className='flex gap-4 p-4 rounded-lg'
                      style={{ backgroundColor: '#FFF8EC' }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {/* Product Image */}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className='w-20 h-20 object-cover rounded'
                      />

                      {/* Product Details */}
                      <div className='flex-1'>
                        <h3 className='font-cormorant font-bold text-lg' style={{ color: '#546B41' }}>
                          {item.name}
                        </h3>
                        <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-2 mt-2'>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className='w-6 h-6 flex items-center justify-center rounded border'
                            style={{ borderColor: '#546B41', color: '#546B41' }}
                          >
                            -
                          </button>
                          <span className='font-marvel text-sm w-8 text-center'>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className='w-6 h-6 flex items-center justify-center rounded border'
                            style={{ borderColor: '#546B41', color: '#546B41' }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className='p-2 hover:bg-red-100 rounded transition-colors'
                      >
                        <HiOutlineTrash className='text-red-500 text-xl' />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {cartItems.length > 0 && (
              <div className='border-t border-gray-300 p-6 space-y-4'>
                {/* Subtotal */}
                <div className='flex justify-between items-center'>
                  <span className='font-cormorant text-lg font-semibold' style={{ color: '#546B41' }}>
                    Subtotal:
                  </span>
                  <span className='font-cormorant text-2xl font-bold' style={{ color: '#546B41' }}>
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
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
