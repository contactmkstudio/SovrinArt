import React, { useEffect, useState } from 'react'
import { getOrderDetails } from '../../api/apiService'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

const PaidOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrderDetails()
        setOrders(res.orders || [])
      } catch (err) {
        setError('Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })

  if (loading) return <p>Loading orders...</p>
  if (error) return <p>{error}</p>

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
                Paid Orders
              </h1>
              <p className='font-marvel text-sm md:text-base mb-8' style={{ color: '#99AD7A' }}>
                View all paid orders from your customers.
              </p>
            </div>

            {/* Orders Table */}
            <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
            {['Order ID', 'Date', 'Total', 'Currency', 'Items', 'Status', 'Gateway' , "User"].map(h => (
              <th key={h} style={{ padding: '10px 12px', borderBottom: '1px solid #eee', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px 12px' }}>#{order.order_id}</td>
              <td style={{ padding: '10px 12px' }}>{formatDate(order.created_at)}</td>
              <td style={{ padding: '10px 12px', fontWeight: 500 }}>
                {parseFloat(order.total_price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ padding: '10px 12px' }}>{order.currency}</td>
              <td style={{ padding: '10px 12px' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {item.image && (
                      <img src={item.image} alt={item.product_name}
                        style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 500, textTransform: 'capitalize' }}>{item.product_name}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>
                        Qty: {item.quantity} · Size: {item.size?.toUpperCase()} · {order.currency} {parseFloat(item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 99, fontSize: 11,
                  background: '#e6f4ea', color: '#2e7d32', fontWeight: 500
                }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '10px 12px', color: '#888', fontSize: 12 }}>
                {order.payment_gateway
                  ? order?.payment_gateway.charAt(0).toUpperCase() + order?.payment_gateway.slice(1)
                  : '—'}
              </td>
              <td style={{ padding: '10px 12px' }}>{order?.email || '—'}</td>
              <td style={{ padding: '10px 12px' }}>{order?.emailsent || '—'}</td>

            </tr>
          ))}
        </tbody>
      </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaidOrders