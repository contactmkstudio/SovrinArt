import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import DashboardStats from '../components/DashboardStats'

const AdminDashboard = () => {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='flex'>
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className='flex-1'>
          <AdminHeader />
          
          <div className='p-6 md:p-8'>
            {/* Page Title */}
            <div>
              <h1 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                Dashboard
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                Welcome back! Here's what's happening with your art business today.
              </p>
            </div>

            {/* Dashboard Stats */}
            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
