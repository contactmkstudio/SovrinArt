import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { faqApi } from '../../api/apiService'

const AddFaq = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const onSubmit = async (data) => {
     setLoading(true)
     setSubmitMessage({ type: '', text: '' })

    const faqData = {
      question: data.question,
      answer: data.answer
    }
   

    try {
      const response = await faqApi.createFaq(faqData)
      
      // Success
      setSubmitMessage({ 
        type: 'success', 
        text: 'FAQ added successfully!' 
      })
      reset()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      // Error
      setSubmitMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to add FAQ. Please try again.' 
      })
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
                Add FAQ
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                Add a new frequently asked question to your FAQ page.
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

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Question Field */}
                <div>
                  <label 
                    htmlFor='question' 
                    className='font-cormorant text-lg font-semibold mb-2 block'
                    style={{ color: '#546B41' }}
                  >
                    Question
                  </label>
                  <input
                    type='text'
                    id='question'
                    {...register('question', { required: 'Question is required' })}
                    placeholder='Enter the question'
                    className='w-full px-4 py-3 rounded-xl border-2 font-marvel text-sm focus:outline-none focus:border-[#546B41] transition-colors'
                    style={{ borderColor: '#DCCCAC', backgroundColor: '#FFFFFF' }}
                  />
                  {errors.question && (
                    <p className='mt-1 text-sm text-red-600 font-marvel'>{errors.question.message}</p>
                  )}
                </div>

                {/* Answer Field */}
                <div>
                  <label 
                    htmlFor='answer' 
                    className='font-cormorant text-lg font-semibold mb-2 block'
                    style={{ color: '#546B41' }}
                  >
                    Answer
                  </label>
                  <textarea
                    id='answer'
                    {...register('answer', { required: 'Answer is required' })}
                    placeholder='Enter the answer'
                    rows='6'
                    className='w-full px-4 py-3 rounded-xl border-2 font-marvel text-sm focus:outline-none focus:border-[#546B41] transition-colors resize-none'
                    style={{ borderColor: '#DCCCAC', backgroundColor: '#FFFFFF' }}
                  ></textarea>
                  {errors.answer && (
                    <p className='mt-1 text-sm text-red-600 font-marvel'>{errors.answer.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3 rounded-xl font-marvel text-base font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
                  style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                >
                  {loading ? 'Submitting...' : 'Submit FAQ'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFaq
