import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductDetailedView from '../components/ProductDetailedView'
import { getProductById } from '../api/apiService'
import Loader from '../components/Loader'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id)
      setProduct(response?.data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: '#FAFAFA' }}>
        <Loader />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: '#FAFAFA' }}>
        <div className='text-center'>
          <h1 className='font-cormorant text-4xl font-bold mb-4' style={{ color: '#546B41' }}>
            Product Not Found
          </h1>
          <p className='font-marvel mb-6' style={{ color: '#99AD7A' }}>
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/products')}
            className='px-6 py-2 font-cormorant font-semibold'
            style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <ProductDetailedView product={product} />
}

export default ProductDetail