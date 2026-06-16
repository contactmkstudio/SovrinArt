import React, { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiOutlineXMark, HiOutlinePlus } from 'react-icons/hi2'
import { addProduct } from '../../api/apiService'
import Toast from '../../components/Toast'

const AdProduct = () => {
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      priceRs: '',
      priceUsd: '',
      mainImage: null,
      sizes: [{ size: '', priceRs: '', priceUsd: '' }],
      details: [{ detail: '' }],
      otherImages: [null, null, null, null, null]
    }
  })

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: 'sizes'
  })

  const { fields: detailFields, append: appendDetail, remove: removeDetail } = useFieldArray({
    control,
    name: 'details'
  })

  const otherImagesWatch = watch('otherImages')
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [otherImagePreviews, setOtherImagePreviews] = useState([null, null, null, null, null])
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const onSubmit = async (data) => {
    // Validate that all 5 images are uploaded
    const allImagesUploaded = otherImagePreviews.every(preview => preview !== null)
    if (!allImagesUploaded) {
      setToastMessage('All 5 images are required')
      setToastType('error')
      return
    }
    
    // Validate that main image is uploaded
    if (!mainImagePreview) {
      setToastMessage('Main image is required')
      setToastType('error')
      return
    }
    
    // Validate sizes - if any size field is filled, all must be filled
    const hasIncompleteSizes = data.sizes.some(size => {
      const isFilled = size.size || size.priceRs || size.priceUsd
      const isComplete = size.size && size.priceRs && size.priceUsd
      return isFilled && !isComplete
    })
    
    if (hasIncompleteSizes) {
      setToastMessage('Each size must have all fields (size, RS price, USD price)')
      setToastType('error')
      return
    }
    
    // Check that at least one size OR one detail is filled
    const hasCompleteSizes = data.sizes.some(size => size.size && size.priceRs && size.priceUsd)
    const hasDetails = data.details.some(detail => detail.detail && detail.detail.trim() !== '')
    
    // if (!hasCompleteSizes && !hasDetails) {
    //   setToastMessage('Please add at least one Size or one Detail')
    //   setToastType('error')
    //   return
    // }
    
    // Transform data to backend format
    const formattedData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price_rs: parseFloat(data.priceRs),
      price_usd: parseFloat(data.priceUsd),
      image: mainImagePreview,
      sizes: data.sizes
        .filter(size => size.size && size.priceRs && size.priceUsd)
        .map(size => ({
          size: size.size,
          price_rs: parseFloat(size.priceRs),
          price_usd: parseFloat(size.priceUsd)
        })),
      details: data.details
        .filter(detail => detail.detail && detail.detail.trim() !== '')
        .map(detail => ({
          detail: detail.detail
        })),
      other_images: otherImagePreviews.map(image => ({
        image: image
      }))
    }
    
    // Call API
    setLoading(true)
    try {
      const response = await addProduct(formattedData)
      
      setToastMessage('Product added successfully!')
      setToastType('success')
      setLoading(false)
      // Reset form
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setToastMessage('Error adding product: ' + (error?.response?.data?.message || error?.message))
      setToastType('error')
      setLoading(false)
    }
  }

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setMainImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleOtherImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPreviews = [...otherImagePreviews]
        newPreviews[index] = reader.result
        setOtherImagePreviews(newPreviews)
      }
      reader.readAsDataURL(file)
    }
  }



  return (
    <div className='min-h-screen p-4 md:p-8' style={{ background: 'linear-gradient(135deg, #FFF8EC 0%, #DCCCAC 100%)' }}>
      <motion.div
        className='max-w-5xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='font-megrim text-3xl md:text-4xl font-bold mb-8 text-center' style={{ color: '#546B41' }}>
          Add Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8'>

          {/* Basic Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Name */}
            <div>
              <label className='block font-semibold text-gray-700 mb-2'>Product Name *</label>
              <input
                type='text'
                {...register('name', { required: 'Name is required' })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='Enter product name'
              />
              {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className='block font-semibold text-gray-700 mb-2'>Category *</label>
              <input
                type='text'
                {...register('category', { required: 'Category is required' })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='Enter product category'
              />
              {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category.message}</p>}
            </div>

            {/* Price RS */}
            <div>
              <label className='block font-semibold text-gray-700 mb-2'>Price (₹ RS) *</label>
              <input
                type='number'
                {...register('priceRs', { required: 'Price in RS is required' })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='Enter price in rupees'
              />
              {errors.priceRs && <p className='text-red-500 text-sm mt-1'>{errors.priceRs.message}</p>}
            </div>

            {/* Price USD */}
            <div>
              <label className='block font-semibold text-gray-700 mb-2'>Price ($ USD) *</label>
              <input
                type=''
                {...register('priceUsd', { required: 'Price in USD is required' })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='Enter price in USD'
              />
              {errors.priceUsd && <p className='text-red-500 text-sm mt-1'>{errors.priceUsd.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='block font-semibold text-gray-700 mb-2'>Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter product description'
              rows='4'
            />
            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
          </div>

          {/* Main Image */}
          <div>
            <label className='block font-semibold text-gray-700 mb-2'>Main Image *</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleMainImageChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            {mainImagePreview && (
              <img src={mainImagePreview} alt='Preview' className='mt-4 w-32 h-32 object-cover rounded-lg' />
            )}
            {!mainImagePreview && <p className='text-red-500 text-sm mt-1'>Main image is required</p>}
          </div>

          {/* Sizes - Dynamic Fields */}
          {/* <div className='border-t pt-8'>
            <h2 className='font-semibold text-lg text-gray-800 mb-4'>Sizes (Optional)</h2>
            <div className='space-y-4'>
              {sizeFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg relative'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type='text'
                    placeholder='Size (e.g., S, M, L, XL)'
                    {...register(`sizes.${index}.size`)}
                    className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                  <input
                    type='number'
                    placeholder='Price (₹ RS)'
                    {...register(`sizes.${index}.priceRs`)}
                    className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                  <input
                    type='number'
                    placeholder='Price ($ USD)'
                    {...register(`sizes.${index}.priceUsd`)}
                    className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                  {sizeFields.length > 0 && (
                    <button
                      type='button'
                      onClick={() => removeSize(index)}
                      className='bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition'
                    >
                      <HiOutlineXMark className='text-xl' />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            <button
              type='button'
              onClick={() => appendSize({ size: '', priceRs: '', priceUsd: '' })}
              className='mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
            >
              <HiOutlinePlus /> Add Size
            </button>
          </div> */}

          {/* Details - Dynamic Fields */}
          <div className='border-t pt-8'>
            <h2 className='font-semibold text-lg text-gray-800 mb-4'>Details (Optional)</h2>
            <div className='space-y-4'>
              {detailFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  className='flex gap-4 p-4 bg-gray-50 rounded-lg'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type='text'
                    placeholder='Detail'
                    {...register(`details.${index}.detail`)}
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                  {detailFields.length > 0 && (
                    <button
                      type='button'
                      onClick={() => removeDetail(index)}
                      className='bg-red-500 text-white rounded-lg px-3 py-2 hover:bg-red-600 transition'
                    >
                      <HiOutlineXMark />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
            <button
              type='button'
              onClick={() => appendDetail({ detail: '' })}
              className='mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
            >
              <HiOutlinePlus /> Add Detail
            </button>
          </div>

          {/* Other Images - Exactly 5 */}
          <div className='border-t pt-8'>
            <h2 className='font-semibold text-lg text-gray-800 mb-4'>Other Images (Exactly 5) *</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  className='relative'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <label className='block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleOtherImageChange(e, index)}
                      className='hidden'
                    />
                    {otherImagePreviews[index] ? (
                      <img src={otherImagePreviews[index]} alt={`Image ${index + 1}`} className='w-full h-32 object-cover rounded-lg' />
                    ) : (
                      <div className='py-8 text-gray-400'>
                        <p className='text-sm'>Image {index + 1}</p>
                      </div>
                    )}
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

        {/* Toast Notification */}
        <Toast 
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
        />
      </motion.div>
    </div>
  )
}

export default AdProduct
