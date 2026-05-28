import React from 'react'
import { HiOutlineShoppingBag, HiOutlineCurrencyDollar, HiOutlineUsers, HiOutlineChartBar } from 'react-icons/hi2'

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      icon: HiOutlineShoppingBag,
      color: '#546B41'
    },
    {
      title: 'Revenue',
      value: '₹45,670',
      change: '+8%',
      icon: HiOutlineCurrencyDollar,
      color: '#99AD7A'
    },
    {
      title: 'Customers',
      value: '89',
      change: '+23%',
      icon: HiOutlineUsers,
      color: '#DCCCAC'
    },
    {
      title: 'Growth',
      value: '32%',
      change: '+5%',
      icon: HiOutlineChartBar,
      color: '#546B41'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <div
            key={index}
            className='p-6 rounded-2xl border-2 hover:shadow-lg transition-shadow'
            style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 rounded-xl' style={{ backgroundColor: stat.color, opacity: 0.1 }}>
                <Icon className='text-2xl' style={{ color: stat.color }} />
              </div>
              <span className='font-marvel text-xs font-semibold text-green-600'>
                {stat.change}
              </span>
            </div>
            
            <h3 className='font-cormorant text-3xl font-bold mb-1' style={{ color: '#546B41' }}>
              {stat.value}
            </h3>
            <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
              {stat.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardStats
