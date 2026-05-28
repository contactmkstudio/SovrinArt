import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

const AdminOrders = () => {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      <div className='flex'>
        <AdminSidebar />
        
        <div className='flex-1'>
          <AdminHeader />
          
          <div className='p-6 md:p-8'>
            <div>
              <h1 className='font-cormorant text-3xl md:text-4xl font-bold mb-2' style={{ color: '#546B41' }}>
                Orders Management
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                Manage and track all customer orders.
              </p>
            </div>

            <div
              className='p-6 rounded-2xl border-2'
              style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
            >
              <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
                Orders content coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
