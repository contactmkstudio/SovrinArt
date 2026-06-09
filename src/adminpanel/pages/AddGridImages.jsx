import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import Toast from '../../components/Toast'
import { addBannerImages } from '../../api/apiService'

const AddGridImages = () => {
  const { handleSubmit, formState: { errors } } = useForm()
  const [previews, setPreviews] = useState([null, null, null, null, null])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = [...previews]
      updated[index] = reader.result
      setPreviews(updated)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async () => {
    const allFilled = previews.every((p) => p !== null)
    if (!allFilled) {
      setToast({ message: 'All 5 images are required', type: 'error' })
      return
    }

    const payload = {
      images: previews.map((image) => ({ image }))
    }

    try {
      setLoading(true)
      await addBannerImages(payload)
      setToast({ message: 'Banner images added successfully!', type: 'success' })
      setPreviews([null, null, null, null, null])
    } catch (error) {
      setToast({
        message: error?.response?.data?.message || 'Failed to add banner images.',
        type: 'error'
      })
    } finally {
      setLoading(false)
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

      <div className='flex'>
        <AdminSidebar />

        <div className='flex-1'>
          <AdminHeader />

          <div className='p-6 md:p-8'>
            <div className='mb-8'>
              <h1 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                Add Grid Images
              </h1>
              <p className='font-marvel text-sm md:text-base' style={{ color: '#99AD7A' }}>
                Upload 5 banner images for the grid display section.
              </p>
            </div>

            <motion.div
              className='max-w-4xl p-8 rounded-2xl border-2'
              style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8'>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className='flex flex-col gap-2'>
                      <label
                        className='block border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition hover:border-green-500'
                        style={{ borderColor: '#DCCCAC' }}
                      >
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => handleImageChange(e, index)}
                          className='hidden'
                        />
                        {previews[index] ? (
                          <img
                            src={previews[index]}
                            alt={`Image ${index + 1}`}
                            className='w-full h-32 object-cover rounded-lg'
                          />
                        ) : (
                          <div className='py-10 text-gray-400'>
                            <p className='text-sm font-marvel'>Image {index + 1}</p>
                            <p className='text-xs mt-1'>Click to upload</p>
                          </div>
                        )}
                      </label>
                      {previews[index] && (
                        <button
                          type='button'
                          onClick={() => {
                            const updated = [...previews]
                            updated[index] = null
                            setPreviews(updated)
                          }}
                          className='text-xs text-red-500 hover:underline font-marvel'
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3 font-cormorant font-semibold text-lg rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed'
                  style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? 'Uploading...' : 'Upload Images'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGridImages
