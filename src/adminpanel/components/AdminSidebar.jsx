import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HiOutlineQuestionMarkCircle,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMegaphone,
  HiOutlinePhoto
} from 'react-icons/hi2'

const AdminSidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { name: 'Add Product', path: '/admin/add-product', icon: HiOutlinePlus },
    { name: 'Delete Product', path: '/admin/delete-product', icon: HiOutlineTrash },
    { name: 'Add FAQs', path: '/admin/add-faqs', icon: HiOutlineQuestionMarkCircle },
    { name: 'Delete FAQ', path: '/admin/delete-faq', icon: HiOutlineTrash },
    { name: 'Announcement', path: '/admin/announcement', icon: HiOutlineMegaphone },
    { name: 'Add Grid Images', path: '/admin/add-grid-images', icon: HiOutlinePhoto },
  ]
  
  return (
    <div
      className='h-screen sticky top-0 border-r-2 transition-all duration-300'
      style={{ 
        backgroundColor: '#FFF8EC',
        borderColor: '#DCCCAC',
        width: collapsed ? '80px' : '250px'
      }}
    >
      {/* Logo */}
      <div className='p-6 border-b-2' style={{ borderColor: '#DCCCAC' }}>
        {!collapsed ? (
          <h1 className='font-hurricane text-3xl font-bold' style={{ color: '#546B41' }}>
            Mkkatelier
          </h1>
        ) : (
          <h1 className='font-hurricane text-2xl font-bold text-center' style={{ color: '#546B41' }}>
            S
          </h1>
        )}
      </div>

      {/* Menu Items */}
      <nav className='p-4'>
        <ul className='space-y-2'>
          {menuItems?.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className='flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-80'
                  style={{
                    backgroundColor: isActive ? '#546B41' : 'transparent',
                    color: isActive ? '#FFF8EC' : '#546B41'
                  }}
                >
                  <Icon className='text-xl shrink-0' />
                  {!collapsed && (
                    <span className='font-marvel text-sm font-semibold'>
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className='absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg font-marvel text-xs hover:opacity-80 transition-opacity'
        style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
      >
        {collapsed ? '→' : '←'}
      </button>
    </div>
  )
}

export default AdminSidebar
