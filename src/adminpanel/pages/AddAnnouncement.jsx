import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import Toast from '../../components/Toast'
import { postAnnouncement } from '../../api/apiService'

const AddAnnouncement = () => {
  const [text, setText] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      setLoading(true)
      await postAnnouncement({ text: text.trim(), is_active: isActive })
      setToast({ message: 'Announcement posted successfully!', type: 'success' })
      setText('')
      setIsActive(true)
    } catch (error) {
      setToast({
        message: error?.response?.data?.message || 'Failed to post announcement.',
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
                Announcement
              </h1>
              <p className='font-marvel text-sm md:text-base' style={{ color: '#99AD7A' }}>
                Post or update the announcement banner shown across the website.
              </p>
            </div>

            <motion.div
              className='max-w-2xl p-8 rounded-2xl border-2'
              style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Text field */}
                <div>
                  <label className='block font-marvel text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Announcement Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder='e.g. Next art drop coming soon — July 2026!'
                    className='w-full px-4 py-3 rounded-xl font-marvel text-sm outline-none resize-none transition-all duration-300 focus:shadow-md'
                    style={{
                      border: '1.5px solid #DCCCAC',
                      backgroundColor: '#FAFAFA',
                      color: '#2D3A22'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#546B41'}
                    onBlur={(e) => e.target.style.borderColor = '#DCCCAC'}
                    required
                  />
                </div>

                {/* is_active toggle */}
                <div className='flex items-center gap-4'>
                  <span className='font-marvel text-sm font-semibold' style={{ color: '#546B41' }}>
                    Active
                  </span>
                  <button
                    type='button'
                    onClick={() => setIsActive(!isActive)}
                    className='relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none'
                    style={{ backgroundColor: isActive ? '#546B41' : '#DCCCAC' }}
                  >
                    <span
                      className='absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300'
                      style={{ left: isActive ? '26px' : '4px' }}
                    />
                  </button>
                  <span className='font-marvel text-xs' style={{ color: '#99AD7A' }}>
                    {isActive ? 'Banner will be visible on site' : 'Banner will be hidden'}
                  </span>
                </div>

                {/* Submit */}
                <motion.button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3.5 rounded-xl font-cormorant text-lg font-bold tracking-wide transition-all duration-300'
                  style={{
                    backgroundColor: loading ? '#99AD7A' : '#546B41',
                    color: '#FFF8EC',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? 'Posting...' : 'Post Announcement'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAnnouncement
