import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineTrash } from 'react-icons/hi2'
import { getProducts, deleteProduct } from '../../api/apiService'
import Toast from '../../components/Toast'

const DeleteProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getProducts()
      setProducts(response.data || response || [])
    } catch (error) {
      setToastMessage('Error fetching products: ' + (error?.response?.data?.message || error?.message))
      setToastType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await deleteProduct(productId)
        setToastMessage(`"${productName}" deleted successfully!`)
        setToastType('success')
        // Refresh products list
        fetchProducts()
      } catch (error) {
        setToastMessage('Error deleting product: ' + (error?.response?.data?.message || error?.message))
        setToastType('error')
      }
    }
  }

  return (
    <div className='min-h-screen p-4 md:p-8' style={{ background: 'linear-gradient(135deg, #FFF8EC 0%, #DCCCAC 100%)' }}>
      <motion.div
        className='max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='font-megrim text-3xl md:text-4xl font-bold mb-8 text-center' style={{ color: '#546B41' }}>
          Delete Product
        </h1>

        {loading ? (
          <div className='flex justify-center items-center min-h-96'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500'></div>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            className='text-center py-16 bg-white rounded-2xl shadow-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className='text-gray-500 text-lg'>No products found</p>
          </motion.div>
        ) : (
          <motion.div
            className='bg-white rounded-2xl shadow-lg overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr style={{ backgroundColor: '#546B41' }}>
                    <th className='px-6 py-4 text-left text-white font-semibold'>Product Name</th>
                    <th className='px-6 py-4 text-left text-white font-semibold'>Description</th>
                    <th className='px-6 py-4 text-left text-white font-semibold'>Price (₹)</th>
                    <th className='px-6 py-4 text-center text-white font-semibold'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      className='border-b hover:bg-gray-50 transition-colors'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className='px-6 py-4 font-semibold text-gray-800'>{product.name}</td>
                      <td className='px-6 py-4 text-gray-600 max-w-xs truncate'>{product.description}</td>
                      <td className='px-6 py-4 text-gray-800 font-semibold'>₹{product.price_rs}</td>
                      <td className='px-6 py-4 text-center'>
                        <motion.button
                          onClick={() => handleDelete(product.id, product.name)}
                          className='inline-flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <HiOutlineTrash className='text-xl' />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    </div>
  )
}

export default DeleteProduct
