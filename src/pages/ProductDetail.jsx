import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import ProductDetailedView from '../components/ProductDetailedView'

const ProductDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product
  

  // If product data not passed, redirect back
  if (!product) {
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