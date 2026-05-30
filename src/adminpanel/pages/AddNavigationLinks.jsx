
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { navigationApi } from '../../api/apiService';



const AddNavigationLinks = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitMessage({ type: '', text: '' });
    try {
      await navigationApi.addNavigationLinks({ name: data.name, url: data.url });
      setSubmitMessage({ type: 'success', text: 'Navigation link added successfully!' });
      reset();
      setTimeout(() => setSubmitMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to add navigation link. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1'>
          <AdminHeader />
          <div className='p-6 md:p-8'>
            <div>
              <h1 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                Add Navigation Link
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                Add a new navigation link to your site.
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
                {/* Name Field */}
                <div>
                  <label
                    htmlFor='name'
                    className='font-cormorant text-lg font-semibold mb-2 block'
                    style={{ color: '#546B41' }}
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    {...register('name', { required: 'Name is required' })}
                    placeholder='Enter the link name'
                    className='w-full px-4 py-3 rounded-xl border-2 font-marvel text-sm focus:outline-none focus:border-[#546B41] transition-colors'
                    style={{ borderColor: '#DCCCAC', backgroundColor: '#FFFFFF' }}
                  />
                  {errors.name && (
                    <p className='mt-1 text-sm text-red-600 font-marvel'>{errors.name.message}</p>
                  )}
                </div>
                {/* URL Field */}
                <div>
                  <label
                    htmlFor='url'
                    className='font-cormorant text-lg font-semibold mb-2 block'
                    style={{ color: '#546B41' }}
                  >
                    URL
                  </label>
                  <input
                    type='text'
                    id='url'
                    {...register('url', { required: 'URL is required' })}
                    placeholder='Enter the link URL'
                    className='w-full px-4 py-3 rounded-xl border-2 font-marvel text-sm focus:outline-none focus:border-[#546B41] transition-colors'
                    style={{ borderColor: '#DCCCAC', backgroundColor: '#FFFFFF' }}
                  />
                  {errors.url && (
                    <p className='mt-1 text-sm text-red-600 font-marvel'>{errors.url.message}</p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-3 rounded-xl font-marvel text-base font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
                  style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                >
                  {loading ? 'Submitting...' : 'Add Link'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNavigationLinks;
