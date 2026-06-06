import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineArrowLeft, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { getUserOrders } from '../api/apiService'
import { statusColors } from '../constants/statusColors'

const getStatusStyle = (status) =>
  statusColors[status?.toLowerCase()] || { bg: '#F5F5F5', text: '#757575', dot: '#9E9E9E' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const OrderCard = ({ order, index }) => {
  const [expanded, setExpanded] = useState(false)
  const s = getStatusStyle(order?.status)

  const orderCurrency = order?.currency || 'INR'
  const total = parseFloat(order?.total_price || 0)
  const displayTotal = orderCurrency === 'INR'
    ? `₹${total.toLocaleString('en-IN')}`
    : `$${total.toFixed(2)}`

  const date = order?.created_at
    ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Header row */}
      <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#F2F6EE' }}>
            <HiOutlineShoppingBag size={20} style={{ color: '#546B41' }} />
          </div>
          <div>
            <p className="font-cormorant text-lg font-bold" style={{ color: '#546B41' }}>
              Order #{order?.order_id || order?.id}
            </p>
            <p className="font-marvel text-xs" style={{ color: '#BCBCBC' }}>{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: s.bg }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.dot }} />
            <span className="font-marvel text-xs font-semibold uppercase tracking-wide" style={{ color: s.text }}>
              {order?.status || 'Unknown'}
            </span>
          </div>

          {/* Total */}
          <span className="font-cormorant text-xl font-bold" style={{ color: '#546B41' }}>
            {displayTotal}
          </span>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="p-1.5 rounded-full transition-colors"
            style={{ backgroundColor: '#F2F6EE', color: '#546B41' }}
          >
            {expanded ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Items */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 border-t space-y-3" style={{ borderColor: '#F0EBE3', paddingTop: '16px' }}>
              {(order?.items || []).map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-2 border-b last:border-b-0" style={{ borderColor: '#F0EBE3' }}>
                  <div className="flex items-center gap-3">
                    {/* Image or letter avatar */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F2F6EE' }}>
                      {item?.image
                        ? <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                        : <span className="font-cormorant font-bold text-xl uppercase" style={{ color: '#546B41' }}>
                            {(item?.product_name || '?').charAt(0)}
                          </span>
                      }
                    </div>
                    <div>
                      <p className="font-cormorant font-bold text-base" style={{ color: '#546B41' }}>{item?.product_name}</p>
                      <p className="font-marvel text-xs" style={{ color: '#99AD7A' }}>
                        Size: {item?.size || '—'} &nbsp;·&nbsp; Qty: {item?.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <span className="font-cormorant font-semibold text-base shrink-0" style={{ color: '#546B41' }}>
                    {orderCurrency === 'INR'
                      ? `₹${parseFloat(item?.price || 0).toLocaleString('en-IN')}`
                      : `$${parseFloat(item?.price || 0).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Orders = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      navigate('/login')
      return
    }
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await getUserOrders(user?.email)
        setOrders(response?.orders)
      } catch {
        setError('Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user?.email, isAuthenticated])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F3EF' }}>
      <NewArtLaunch />
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">

        {/* Back */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-marvel text-sm mb-6 group"
          style={{ color: '#546B41' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <HiOutlineArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </motion.button>

        {/* Heading */}
        <motion.div
          className="mb-10 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-cormorant text-4xl md:text-5xl font-bold mb-2" style={{ color: '#546B41' }}>
            My Orders
          </h1>
          <p className="font-marvel text-sm" style={{ color: '#99AD7A' }}>
            Track and review your past purchases
          </p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-2xl" style={{ color: '#546B41' }}>{error}</p>
          </div>
        ) : orders?.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <HiOutlineShoppingBag size={56} style={{ color: '#DCCCAC' }} />
            <p className="font-cormorant text-2xl" style={{ color: '#546B41' }}>No orders yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="font-cormorant text-lg font-semibold px-8 py-3 transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
            >
              Browse Products
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders?.map((order, i) => (
              <OrderCard key={order?.order_id || order?.id || i} order={order} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
