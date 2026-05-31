import React, { useState, useEffect } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { deleteFaq, faqApi } from '../../api/apiService'

const DeleteFaq = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    setLoading(true)
    try {
      const data = await faqApi.getAllFaqs()
      setFaqs(Array.isArray(data) ? data : [])
    } catch (error) {
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    setSubmitMessage({ type: '', text: '' })
    try {
      await deleteFaq(id)
      setSubmitMessage({ type: 'success', text: 'FAQ deleted successfully!' })
      setFaqs((prev) => prev.filter((faq) => faq.id !== id))
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setSubmitMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete FAQ. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1'>
          <AdminHeader />
          <div className='p-6 md:p-8'>
            <div>
              <h1 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                Delete FAQ
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                Delete a frequently asked question by its ID.
              </p>
            </div>
            <div
              className='max-w-3xl p-8 rounded-2xl border-2'
              style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
            >
              {/* Success/Error Message */}
              {submitMessage.text && (
                <div
                  className={`mb-6 p-4 rounded-xl font-marvel text-sm ${
                    submitMessage.type === 'success'
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-red-100 text-red-800 border-2 border-red-300'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
              <div className='space-y-4'>
                {loading && <div className='text-center text-[#546B41] font-marvel'>Loading...</div>}
                {!loading && faqs.length === 0 && <div className='text-center text-[#546B41] font-marvel'>No FAQs found.</div>}
                {!loading && faqs.length > 0 && (
                  <ul className='divide-y divide-[#DCCCAC]'>
                    {faqs?.map((faq) => (
                      <li key={faq.id} className='flex items-start justify-between py-4'>
                        <div>
                          <div className='font-cormorant text-lg font-semibold mb-1' style={{ color: '#546B41' }}>{faq.question}</div>
                          <div className='font-marvel text-sm' style={{ color: '#99AD7A' }}>{faq.answer}</div>
                        </div>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className='ml-4 p-2 rounded-full hover:bg-red-100 transition-colors'
                          title='Delete FAQ'
                          disabled={loading}
                        >
                          <HiOutlineTrash className='text-xl text-red-600' />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteFaq
