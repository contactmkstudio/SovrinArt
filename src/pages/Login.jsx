import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import loginImg from '../assets/rest.jpeg'

const Login = () => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ background: 'linear-gradient(135deg, #FFF8EC 0%, #DCCCAC 100%)' }}>
      <motion.div 
        className='w-full max-w-6xl h-150 md:h-175 rounded-3xl overflow-hidden shadow-2xl'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 h-full'>
          
          {/* Left Side - Image */}
          <motion.div 
            className='hidden lg:block relative overflow-hidden'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={loginImg} 
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

          {/* Right Side - Login Form */}
          <motion.div 
            className='flex items-center justify-center p-8 md:p-12'
            style={{ backgroundColor: '#FFF8EC' }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='w-full max-w-md'>
              
              {/* Back Button */}
              <Link to="/" className='inline-flex items-center gap-2 mb-6 font-cormorant text-sm font-semibold hover:underline transition-all' style={{ color: '#546B41' }}>
                <IoArrowBack size={20} />
                Back to Home
              </Link>

              {/* Heading */}
              <div>
                <h2 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                  Welcome Back
                </h2>
                <p className='font-marvel text-sm mb-8' style={{ color: '#99AD7A' }}>
                  Sign in to continue your art journey
                </p>
              </div>

              {/* Form */}
              <form className='space-y-5'>
                
                {/* Email Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
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
                </div>

                {/* Password Field */}
                <div>
                  <label className='block font-cormorant text-sm font-semibold mb-2' style={{ color: '#546B41' }}>
                    Password
                  </label>
                  <input
                    type="password"
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
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                  <label className='flex items-center cursor-pointer'>
                    <input 
                      type="checkbox" 
                      className='mr-2 w-4 h-4 rounded accent-[#546B41]'
                    />
                    <span className='font-marvel text-sm' style={{ color: '#546B41' }}>
                      Remember me
                    </span>
                  </label>
                  <a href="#" className='font-marvel text-sm hover:underline transition-all' style={{ color: '#99AD7A' }}>
                    Forgot Password?
                  </a>
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
                  Sign In
                </motion.button>

              </form>

              {/* Sign Up Link */}
              <p 
                className='text-center text-sm mt-8 font-marvel'
                style={{ color: '#99AD7A' }}
              >
                Don't have an account?{' '}
                <Link to="/register" className='font-semibold hover:underline transition-all' style={{ color: '#546B41' }}>
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}

export default Login