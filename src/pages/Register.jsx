import React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registerImg from '../assets/register.jpeg'
import { registerUser } from '../api/apiService'

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response?.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ background: 'linear-gradient(135deg, #FFF8EC 0%, #DCCCAC 100%)' }}>
      <motion.div 
        className='w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 min-h-150 lg:h-175'>
          
          {/* Left Side - Image */}
          <motion.div 
            className='hidden lg:block relative overflow-hidden'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={registerImg} 
              alt="Sovrinart Gallery" 
              className='w-full h-full object-cover'
            />
            {/* Overlay with gradient */}
            <div className='absolute inset-0' style={{ background: 'linear-gradient(to right, rgba(84, 107, 65, 0.3), transparent)' }} />
            
            {/* Branding */}
            <div className='absolute bottom-10 left-10 text-white z-10'>
              <motion.h1 
                className='font-hurricane text-5xl md:text-6xl mb-2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Sovrinart
              </motion.h1>
              <motion.p 
                className='font-cormorant text-lg md:text-xl text-white/90'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Where art meets emotion
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div 
            className='flex items-center justify-center p-6 md:p-8 lg:p-12'
            style={{ backgroundColor: '#FFF8EC' }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='w-full max-w-md py-8 md:py-0'>
              

              {/* Back Button */}
              <Link to="/" className='inline-flex items-center gap-2 mb-6 font-cormorant text-sm font-semibold hover:underline transition-all' style={{ color: '#546B41' }}>
                <IoArrowBack size={20} />
                Back to Home
              </Link>

              {/* Heading */}

              <div>
                <h2 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                  Create Account
                </h2>
                <p className='font-marvel text-sm mb-8' style={{ color: '#99AD7A' }}>
                  Join our community of art lovers
                </p>
              </div>

              {/* Form */}
              <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Full name is required' })}
                    placeholder="Enter your full name"
                    className='w-full px-4 py-3 rounded-xl font-marvel border-2 focus:outline-none transition-all duration-300'
                    style={{
                      backgroundColor: '#FFF8EC',
                      borderColor: '#DCCCAC',
                      color: '#546B41'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#99AD7A'}
                    onBlur={(e) => e.target.style.borderColor = '#DCCCAC'}
                  />
                  {errors.name && <p className='text-red-600 text-xs mt-1 font-marvel'>{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                    className='w-full px-4 py-3 rounded-xl font-marvel border-2 focus:outline-none transition-all duration-300'
                    style={{
                      backgroundColor: '#FFF8EC',
                      borderColor: '#DCCCAC',
                      color: '#546B41'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#99AD7A'}
                    onBlur={(e) => e.target.style.borderColor = '#DCCCAC'}
                  />
                  {errors.email && <p className='text-red-600 text-xs mt-1 font-marvel'>{errors.email.message}</p>}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder="Enter your phone number"
                    className='w-full px-4 py-3 rounded-xl font-marvel border-2 focus:outline-none transition-all duration-300'
                    style={{
                      backgroundColor: '#FFF8EC',
                      borderColor: '#DCCCAC',
                      color: '#546B41'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#99AD7A'}
                    onBlur={(e) => e.target.style.borderColor = '#DCCCAC'}
                  />
                  {errors.phone && <p className='text-red-600 text-xs mt-1 font-marvel'>{errors.phone.message}</p>}
                </div>

                  {/* Password Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter your password"
                    className='w-full px-4 py-3 rounded-xl font-marvel border-2 focus:outline-none transition-all duration-300'
                    style={{
                      backgroundColor: '#FFF8EC',
                      borderColor: '#DCCCAC',
                      color: '#546B41'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#99AD7A'}
                    onBlur={(e) => e.target.style.borderColor = '#DCCCAC'}
                  />
                  {errors.password && <p className='text-red-600 text-xs mt-1 font-marvel'>{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className='w-full py-3 rounded-xl font-cormorant text-lg font-bold transition-all duration-300 hover:shadow-lg'
                  style={{
                    backgroundColor: '#546B41',
                    color: '#FFF8EC'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
              {/* Success Popup */}
              {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
                  >
                    <svg width="60" height="60" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#99AD7A"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h2 className="font-cormorant text-2xl font-bold mt-4 mb-2 text-[#546B41]">Registration Successful!</h2>
                    <p className="font-marvel text-base text-[#99AD7A] mb-2 text-center">You will be redirected to the login page.</p>
                  </motion.div>
                </div>
              )}
                  Create Account
                </motion.button>

              </form>

              {/* Terms */}
              <motion.p 
                className='text-center text-xs mt-6 font-marvel'
                style={{ color: '#99AD7A' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                By creating an account, you agree to our{' '}
                <a href="#" className='underline' style={{ color: '#546B41' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" className='underline' style={{ color: '#546B41' }}>Privacy Policy</a>
              </motion.p>

              {/* Login Link */}
              <p 
                className='text-center text-sm mt-4 font-marvel'
                style={{ color: '#99AD7A' }}
              >
                Already have an account?{' '}
                <Link to="/login" className='font-semibold hover:underline transition-all' style={{ color: '#546B41' }}>
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}

export default Register