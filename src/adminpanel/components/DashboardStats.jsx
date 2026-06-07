import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineCube, HiOutlineUsers, HiOutlineUserCircle } from 'react-icons/hi2'
import { getDashboardStats } from '../../api/apiService'

const DashboardStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats()
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const cards = stats ? [
    {
      title: 'Total Products',
      value: stats.total_products,
      icon: HiOutlineCube,
      color: '#546B41'
    },
    {
      title: 'Paid Orders',
      value: stats.orders?.paid,
      icon: HiOutlineShoppingBag,
      color: '#546B41'
    },
    {
      title: 'Pending Orders',
      value: stats.orders?.pending,
      icon: HiOutlineShoppingBag,
      color: '#b8860b'
    },
    {
      title: 'Failed Orders',
      value: stats.orders?.failed,
      icon: HiOutlineShoppingBag,
      color: '#e53e3e'
    },
    {
      title: 'Total Users',
      value: stats.total_users,
      icon: HiOutlineUsers,
      color: '#99AD7A'
    },
    {
      title: 'Logged In Users',
      value: stats.logged_in_users,
      icon: HiOutlineUserCircle,
      color: '#99AD7A'
    }
  ] : []

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='p-6 rounded-2xl border-2 animate-pulse' style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC', height: 130 }} />
        ))}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className='p-6 rounded-2xl border-2 hover:shadow-lg transition-shadow'
            style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 rounded-xl' style={{ backgroundColor: card.color + '22' }}>
                <Icon className='text-2xl' style={{ color: card.color }} />
              </div>
            </div>
            <h3 className='font-cormorant text-3xl font-bold mb-1' style={{ color: '#546B41' }}>
              {card.value ?? '—'}
            </h3>
            <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
              {card.title}
            </p>
            {card.sub && (
              <p className='font-marvel text-xs mt-1' style={{ color: '#BCBCBC' }}>
                {card.sub}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DashboardStats
