import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineUser, HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProfileCard = ({ iconSize = 'text-2xl' }) => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  // Close when clicking outside (for mobile click behaviour)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/login')
  }

  // Derive initials from username or email
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : '?'

  return (
    <div
      ref={wrapperRef}
      className='relative'
      // Desktop: hover to open/close
      onMouseEnter={() => window.innerWidth >= 768 && setIsOpen(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsOpen(false)}
    >
      {/* Icon trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center justify-center'
        aria-label='Profile'
      >
        <HiOutlineUser className={`text-white ${iconSize} hover:scale-110 transition-transform duration-300 cursor-pointer`} />
      </button>

      {/* Profile Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='absolute right-0 top-10 w-60 rounded-2xl shadow-2xl overflow-hidden z-50'
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f5efe6 100%)' }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {isAuthenticated ? (
              <>
                {/* Avatar + info */}
                <div className='flex flex-col items-center pt-6 pb-4 px-4'>
                  <div
                    className='w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3'
                    style={{ background: 'linear-gradient(135deg, #546B41, #7a9a60)' }}
                  >
                    {initials}
                  </div>
                  <p className='font-megrim font-bold text-gray-800 text-base tracking-wide truncate w-full text-center'>
                    {user?.username || '—'}
                  </p>
                  <p className='text-gray-500 text-sm truncate w-full text-center mt-0.5'>
                    {user?.email || '—'}
                  </p>
                </div>

                <div className='h-px bg-gray-200 mx-4' />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 w-full px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors duration-200'
                >
                  <HiArrowRightOnRectangle className='text-lg' />
                  Logout
                </button>
              </>
            ) : (
              <div className='flex flex-col items-center py-6 px-4 gap-2'>
                <p className='text-gray-600 text-sm mb-1'>You are not logged in</p>
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false) }}
                  className='w-full py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90'
                  style={{ background: '#546B41' }}
                >
                  Login
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileCard
