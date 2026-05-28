import React from 'react'
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi2'

const AdminHeader = () => {
  return (
    <header
      className='sticky top-0 z-10 px-6 py-4 border-b-2'
      style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
    >
      <div className='flex items-center justify-between'>
        {/* Empty space for layout */}
        <div className='flex-1'></div>

        {/* Right Side Actions */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <button
            className='relative p-2 rounded-full hover:bg-[#546B41]/10 transition-colors'
          >
            <HiOutlineBell className='text-2xl' style={{ color: '#546B41' }} />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* Profile */}
          <button
            className='flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#546B41]/10 transition-colors'
          >
            <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ backgroundColor: '#546B41' }}>
              <HiOutlineUser className='text-lg' style={{ color: '#FFF8EC' }} />
            </div>
            <span className='font-marvel text-sm font-semibold hidden md:block' style={{ color: '#546B41' }}>
              Admin
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
