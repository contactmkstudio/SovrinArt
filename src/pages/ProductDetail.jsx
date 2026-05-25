import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailedView from '../components/ProductDetailedView'
import { productsData } from '../constants/productsData'

const ProductDetail = () => {
  const { id } = useParams()
  
  // Find the product by ID
  const product = productsData.find(p => p.id === parseInt(id))

  // If product not found, show error
  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: '#FAFAFA' }}>
        <div className='text-center'>
          <h1 className='font-cormorant text-4xl font-bold mb-4' style={{ color: '#546B41' }}>
            Product Not Found
          </h1>
          <p className='font-marvel' style={{ color: '#99AD7A' }}>
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  // Create product object with multiple images (using same image for demo)
  const productWithImages = {
    ...product,
    images: [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image
    ],
    description: "An exquisite piece of art that brings elegance and sophistication to any space. Each painting is carefully crafted with premium materials and attention to detail."
  }

  return <ProductDetailedView product={productWithImages} />
}

export default ProductDetail