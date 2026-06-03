import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import PremiumBackground from '../components/PremiumBackground'
import HoverRevealImage from '../components/HoverRevealImage'
import Toast from '../components/Toast'
import contactImg from '../assets/sovrinHero2.webp'
import { contactReasons } from '../constants/contactReasons'
import { sendEmail } from '../api/apiService'

const Contact = () => {
  const [toast, setToast] = useState(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async(data) => {
    // Handle contact form submission here
    try{
      const response = await sendEmail(data);
      
      if(response?.message === 'Email sent successfully'){
        setToast({
          message: 'Email sent successfully!',
          type: 'success'
        })
        reset() // Clear form after successful submission
      }
    } catch (error) {
      setToast({
        message: error?.response?.data?.message || 'Failed to send email. Please try again.',
        type: 'error'
      })
    }
  };

  return (
    <section id="contact-section" className='relative py-12 md:py-20 bg-black text-white overflow-hidden'>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Premium Background */}
      <PremiumBackground />
      
      <div className='relative z-10 flex flex-col gap-6 md:gap-8 items-center justify-center px-5 max-w-7xl mx-auto'>

        {/* {get intouch animtion} */}
        <motion.div 
          className='relative max-w-fit p-0.5 rounded-2xl md:rounded-3xl overflow-hidden bg-black'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className='absolute inset-0'
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, #eab308 80%, #fbbf24 90%, #eab308 95%, transparent 100%)',
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className='relative z-10 px-6 md:px-8 py-2 rounded-2xl md:rounded-3xl flex flex-col items-center bg-black'>
            <h1 className='font-hurricane text-xl font-bold md:text-3xl bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>Get In Touch</h1>
          </div>
        </motion.div>

        <motion.div 
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className='font-cormorant text-2xl font-bold md:text-4xl lg:text-5xl'>
            Lets Create Something <span className='bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>Beautiful</span>
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3'>
          
          {/* Left Side - Premium Spotlight Reveal Effect */}
          <div className='h-full'>
            <HoverRevealImage imageSrc={contactImg} altText="Art Gallery" />
          </div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className='relative w-full h-full p-8 md:p-10 rounded-3xl flex flex-col gap-6 overflow-hidden'
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(251, 191, 36, 0.1)',
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Decorative Golden Glow - Hidden on mobile */}
            <div className='hidden md:block absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl' />
            <div className='hidden md:block absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl' />
            
            <div className='relative z-10'>
              <h1 className='font-cormorant text-2xl md:text-3xl font-bold text-white mb-2'>
                SEND MESSAGE
              </h1>
              <div className='w-20 h-1 bg-linear-to-r from-yellow-400 via-yellow-500 to-transparent rounded-full mb-3' />
            </div>

            <form className='relative z-10 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-2'>
                <label htmlFor='name' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Your Name
                </label>
                <input 
                  type="text"
                  id='name'
                  {...register('name', { required: 'Name is required' })}
                  placeholder='Enter your name' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-colors duration-200 bg-black/30 text-white placeholder:text-white/40'
                />
                {errors.name && <p className='text-yellow-400 text-xs mt-1 font-marvel'>{errors.name.message}</p>}
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Email Address
                </label>
                <input 
                  type="email"
                  id='email'
                  {...register('email', { required: 'Email is required' })}
                  placeholder='Enter your email' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-colors duration-200 bg-black/30 text-white placeholder:text-white/40'
                />
                {errors.email && <p className='text-yellow-400 text-xs mt-1 font-marvel'>{errors.email.message}</p>}
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='reason' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Reason for Contact
                </label>
                <select 
                  id='reason'
                  {...register('reason', { required: 'Please select a reason' })}
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-colors duration-200 bg-black/30 text-white appearance-none cursor-pointer'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23eab308'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  <option value="" className='bg-black'>Select a reason</option>
                  {contactReasons.map((reason, index) => (
                    <option key={index} value={reason.value} className='bg-black'>
                      {reason.label}
                    </option>
                  ))}
                </select>
                {errors.reason && <p className='text-yellow-400 text-xs mt-1 font-marvel'>{errors.reason.message}</p>}
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='message' className='font-cormorant text-white/90 text-base md:text-lg font-semibold flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-yellow-500 rounded-full'></span>
                  Your Message
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  {...register('message', { required: 'Message is required' })}
                  placeholder='Paint your thoughts and requirements here...' 
                  className='border border-white/20 rounded-xl px-5 py-3.5 w-full h-40 resize-none focus:border-yellow-500/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-colors duration-200 bg-black/30 text-white placeholder:text-white/40'
                ></textarea>
                {errors.message && <p className='text-yellow-400 text-xs mt-1 font-marvel'>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className='bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-lg font-bold md:text-xl px-8 py-4 w-full rounded-xl font-marvel tracking-wide hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 active:scale-98 transition-all duration-200 mt-2'
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default Contact