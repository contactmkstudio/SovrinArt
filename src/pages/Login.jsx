import React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import loginImg from '../assets/rest.jpeg'
import { loginUser } from '../api/apiService'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [toast, setToast] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const from = location.state?.from?.pathname || '/home'

  const onSubmit = async (data) => {
    try{
      setIsLoading(true)
      const response = await loginUser(data);
      if (response?.status === 200) {
        const { email, username } = response?.data?.data ?? {}
        login({ email, username })
        navigate(from, { replace: true });
      }
    } catch (error) {
      const message = error?.response?.data?.error || error?.response?.data?.message || 'Login failed. Please try again.'
      setToast({ message, type: 'error' })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ background: 'linear-gradient(135deg, #FFF8EC 0%, #DCCCAC 100%)' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
              src={loginImg} 
              alt="Mkkatelier Gallery" 
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
                Mkkatelier
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
                  Welcome Back
                </h2>
                <p className='font-marvel text-sm mb-8' style={{ color: '#99AD7A' }}>
                  Sign in to continue your art journey
                </p>
              </div>

              {/* Form */}
              <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                
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
                  disabled={isLoading}
                  className='w-full py-3 rounded-xl font-cormorant text-lg font-bold transition-all duration-300 hover:shadow-lg'
                  style={{ backgroundColor: isLoading ? '#99AD7A' : '#546B41', color: '#FFF8EC', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
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