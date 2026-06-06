import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMapPin, HiOutlineUser, HiOutlinePhone, HiOutlineHome, HiOutlineGlobeAlt, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineChevronDown } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Toast from '../components/Toast'
import { useCurrency } from '../context/CurrencyContext'
import { useAuth } from '../context/AuthContext'
import { initiateRazorpayPayment } from '../payments/razorpayHandler'
import { initiatePaypalPayment } from '../payments/paypalHandler'
import { countries } from '../constants/countriesData'
import OrderSuccessAnimation from '../components/OrderSuccessAnimation'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const OrderSummary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { currency } = useCurrency()
  const { user } = useAuth()

  const { product, selectedSize, quantity = 1, price_rs, price_usd, cartItems = [], fromCart = false } = state || {}

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [toast, setToast] = useState(null)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState({ orderId: null, paymentStatus: null })
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      phoneCode: '+91',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
    },
    mode: 'onBlur',
  })

  const selectedCountry = watch('country')
  const currentCountry = countries.find((c) => c.name === selectedCountry) || countries[0]

  if (!product && !(fromCart && cartItems.length > 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: '#FAFAFA' }}>
        <HiOutlineShieldCheck size={56} style={{ color: '#DCCCAC' }} />
        <p className="font-cormorant text-2xl" style={{ color: '#546B41' }}>
          No order details found.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="font-cormorant text-lg font-semibold px-8 py-3 transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
        >
          Browse Products
        </button>
      </div>
    )
  }

  const onSubmit = async (data) => {
    const orderPayload = {
      user_email: user?.email,
      currency: currency,
      items: fromCart
        ? cartItems.map(item => ({
            product_name: item?.product_details?.name || item?.name || item?.product_name,
            size: item?.size || 'm',
            quantity: item?.quantity || 1,
            price: currency === 'INR'
              ? parseFloat(item?.product_details?.price_rs || item?.product_details?.price || item?.price || 0).toFixed(2)
              : parseFloat(item?.product_details?.price_usd || 0).toFixed(2),
          }))
        : [
            {
              product_name: product?.name,
              size: selectedSize?.size || 'm',
              quantity: quantity,
              price: currency === 'INR'
                ? parseFloat(price_rs || 0).toFixed(2)
                : parseFloat(price_usd || 0).toFixed(2),
            },
          ],
    }

    const onSuccess = ({ orderId, paymentStatus }) => {
      setOrderDetails({ orderId, paymentStatus })
      setOrderSuccess(true)
      setIsPlacingOrder(false)
    }

    const onError = (message) => {
      setToast({ message, type: 'error' })
      setIsPlacingOrder(false)
    }

    try {
      setIsPlacingOrder(true)

      if (paymentMethod === 'razorpay') {
        await initiateRazorpayPayment({
          orderPayload,
          prefill: {
            name: data.fullName,
            contact: `${data.phoneCode}${data.phone}`,
            email: user?.email || '',
          },
          productName: fromCart ? 'Cart Order' : product?.name,
          onSuccess,
          onError,
          onDismiss: () => {
            setIsPlacingOrder(false)
            setToast({ message: 'Payment cancelled.', type: 'error' })
          },
        })
      } else {
        await initiatePaypalPayment({ orderPayload, onSuccess, onError })
      }

      setIsPlacingOrder(false)
    } catch (error) {
      setIsPlacingOrder(false)
      setToast({
        message: error?.message || error?.response?.data?.message || 'Failed to place order. Please try again.',
        type: 'error',
      })
    }
  }

  const displayPrice =
    currency === 'INR'
      ? `₹${parseFloat(price_rs || 0).toLocaleString('en-IN')}`
      : `$${(parseFloat(price_usd) || 0).toFixed(2)}`

  const cartTotal = fromCart
    ? cartItems.reduce((sum, item) => {
        const price = currency === 'INR'
          ? parseFloat(item?.product_details?.price_rs || item?.product_details?.price || item?.price || 0)
          : parseFloat(item?.product_details?.price_usd || 0)
        return sum + price * (item?.quantity || 1)
      }, 0)
    : null

  const displayTotalPrice = fromCart
    ? currency === 'INR'
      ? `₹${cartTotal.toLocaleString('en-IN')}`
      : `$${cartTotal.toFixed(2)}`
    : currency === 'INR'
      ? `₹${(parseFloat(price_rs || 0) * quantity).toLocaleString('en-IN')}`
      : `$${((parseFloat(price_usd) || 0) * quantity).toFixed(2)}`

  const totalItemCount = fromCart ? cartItems.reduce((sum, item) => sum + (item?.quantity || 1), 0) : quantity

  const image = product?.image || '/placeholder-image.jpg'

  const InputField = ({ name: fieldName, placeholder, icon: Icon, error, maxLength, registerProps }) => (
    <div>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#99AD7A' }}>
            <Icon size={18} />
          </div>
        )}
        <input
          {...registerProps}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full py-3.5 font-marvel text-sm outline-none rounded-lg transition-all duration-300 focus:shadow-md"
          style={{
            paddingLeft: Icon ? '44px' : '16px',
            paddingRight: '16px',
            border: `1.5px solid ${error ? '#e53e3e' : '#DCCCAC'}`,
            backgroundColor: '#FAFAFA',
            color: '#2D3A22',
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = '#546B41'
            e.target.style.backgroundColor = '#FFFFFF'
          }}
          onBlur={(e) => {
            registerProps.onBlur(e)
            if (!error) e.target.style.borderColor = '#DCCCAC'
            e.target.style.backgroundColor = '#FAFAFA'
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="font-marvel text-xs mt-1.5 ml-1"
            style={{ color: '#e53e3e' }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F3EF' }}>
      <OrderSuccessAnimation
        isVisible={orderSuccess}
        onClose={() => setOrderSuccess(false)}
        orderId={orderDetails.orderId}
        paymentStatus={orderDetails.paymentStatus}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <NewArtLaunch />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">

        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-marvel text-sm mb-6 group"
          style={{ color: '#546B41' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <HiOutlineArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Product
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="font-cormorant text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#546B41' }}
          >
            Checkout
          </h1>
          <p className="font-marvel text-base" style={{ color: '#99AD7A' }}>
            Review your order and complete your purchase
          </p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-cormorant font-bold text-sm"
                style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
              >
                1
              </div>
              <span className="font-marvel text-sm font-semibold hidden sm:inline" style={{ color: '#546B41' }}>
                Review
              </span>
            </div>
            <div className="w-12 h-0.5" style={{ backgroundColor: '#DCCCAC' }} />
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-cormorant font-bold text-sm"
                style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
              >
                2
              </div>
              <span className="font-marvel text-sm font-semibold hidden sm:inline" style={{ color: '#546B41' }}>
                Delivery
              </span>
            </div>
            <div className="w-12 h-0.5" style={{ backgroundColor: '#DCCCAC' }} />
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-cormorant font-bold text-sm border-2"
                style={{ borderColor: '#DCCCAC', color: '#DCCCAC', backgroundColor: 'transparent' }}
              >
                3
              </div>
              <span className="font-marvel text-sm hidden sm:inline" style={{ color: '#DCCCAC' }}>
                Payment
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column – Product Card (3 cols) */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            {/* Product Card */}
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Section Header */}
              <div className="px-6 py-4 border-b" style={{ borderColor: '#F0EBE3' }}>
                <h2 className="font-cormorant text-xl font-bold flex items-center gap-2" style={{ color: '#546B41' }}>
                  <HiOutlineCheckCircle size={22} />
                  Order Item
                </h2>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {fromCart ? (
                  <div className="space-y-4">
                    {cartItems.map((item, i) => {
                      const itemName = item?.product_details?.name || item?.name || item?.product_name
                      const itemImage = item?.product_details?.image || item?.image || item?.product_image
                      const itemPrice = currency === 'INR'
                        ? parseFloat(item?.product_details?.price_rs || item?.product_details?.price || item?.price || 0)
                        : parseFloat(item?.product_details?.price_usd || 0)
                      const itemQty = item?.quantity || 1
                      const itemSize = item?.size || 'm'
                      return (
                        <div key={i} className="flex gap-4 pb-4 last:pb-0 border-b last:border-b-0" style={{ borderColor: '#F0EBE3' }}>
                          <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden" style={{ backgroundColor: '#FFF8EC' }}>
                            {itemImage
                              ? <img src={itemImage} alt={itemName} className="w-full h-full object-cover" />
                              : <div className="w-full h-full" />}
                          </div>
                          <div className="flex flex-col justify-between flex-1 min-w-0">
                            <p className="font-cormorant text-lg font-bold truncate" style={{ color: '#546B41' }}>{itemName}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="font-cormorant font-bold text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}>Size: {itemSize}</span>
                              <span className="font-cormorant font-bold text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}>Qty: {itemQty}</span>
                            </div>
                            <p className="font-cormorant font-semibold text-base mt-1" style={{ color: '#99AD7A' }}>
                              {currency === 'INR' ? `₹${(itemPrice * itemQty).toLocaleString('en-IN')}` : `$${(itemPrice * itemQty).toFixed(2)}`}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex gap-6">
                    {/* Image */}
                    <div
                      className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden"
                      style={{ backgroundColor: '#FFF8EC' }}
                    >
                      <img
                        src={image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3
                          className="font-cormorant text-2xl sm:text-3xl font-bold leading-tight truncate"
                          style={{ color: '#546B41' }}
                        >
                          {product?.name}
                        </h3>
                        {product?.description && (
                          <p
                            className="font-marvel text-sm mt-2 line-clamp-2"
                            style={{ color: '#99AD7A' }}
                          >
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Size Badge */}
                      {selectedSize && (
                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className="font-marvel text-xs uppercase tracking-wider"
                            style={{ color: '#99AD7A' }}
                          >
                            Size
                          </span>
                          <span
                            className="font-cormorant font-bold text-sm px-4 py-1.5 rounded-full"
                            style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                          >
                            {selectedSize?.size}
                          </span>
                        </div>
                      )}

                      {/* Quantity Badge */}
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="font-marvel text-xs uppercase tracking-wider"
                          style={{ color: '#99AD7A' }}
                        >
                          Qty
                        </span>
                        <span
                          className="font-cormorant font-bold text-sm px-4 py-1.5 rounded-full"
                          style={{ backgroundColor: '#546B41', color: '#FFF8EC' }}
                        >
                          {quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Card */}
            {product?.details_read?.length > 0 && (
              <div
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="px-6 py-4 border-b" style={{ borderColor: '#F0EBE3' }}>
                  <h2 className="font-cormorant text-xl font-bold" style={{ color: '#546B41' }}>
                    Specifications
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {product.details_read.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: '#99AD7A' }}
                        />
                        <span className="font-marvel text-sm" style={{ color: '#546B41' }}>
                          {d?.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Address Card */}
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div className="px-6 py-4 border-b" style={{ borderColor: '#F0EBE3' }}>
                <h2 className="font-cormorant text-xl font-bold flex items-center gap-2" style={{ color: '#546B41' }}>
                  <HiOutlineMapPin size={22} />
                  Delivery Address
                </h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                    Full Name
                  </label>
                  <InputField
                    name="fullName"
                    placeholder="Enter your full name"
                    icon={HiOutlineUser}
                    error={errors.fullName}
                    registerProps={register('fullName', { required: 'Full name is required' })}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                    Phone Number
                  </label>
                  <div>
                    <div className="flex rounded-lg overflow-hidden" style={{ border: `1.5px solid ${errors.phone ? '#e53e3e' : '#DCCCAC'}` }}>
                      {/* Country code dropdown */}
                      <div className="relative shrink-0" style={{ backgroundColor: '#F0EBE3', borderRight: '1.5px solid #DCCCAC' }}>
                        <select
                          {...register('phoneCode')}
                          className="h-full pl-3 pr-7 font-marvel text-sm font-semibold outline-none cursor-pointer appearance-none"
                          style={{ backgroundColor: 'transparent', color: '#546B41', border: 'none' }}
                        >
                          {countries.map((c) => (
                            <option key={c.code + c.name} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#99AD7A' }}>
                          <HiOutlineChevronDown size={12} />
                        </div>
                      </div>
                      {/* Phone input */}
                      <input
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: { value: /^\d{7,15}$/, message: 'Enter a valid phone number' },
                        })}
                        placeholder="Enter phone number"
                        maxLength={15}
                        className="flex-1 py-3.5 px-4 font-marvel text-sm outline-none transition-all duration-300 focus:shadow-md"
                        style={{ backgroundColor: '#FAFAFA', color: '#2D3A22', border: 'none' }}
                        onFocus={(e) => {
                          e.target.style.backgroundColor = '#FFFFFF'
                          if (!errors.phone) e.target.parentElement.style.borderColor = '#546B41'
                        }}
                        onBlur={(e) => {
                          register('phone').onBlur(e)
                          e.target.style.backgroundColor = '#FAFAFA'
                          if (!errors.phone) e.target.parentElement.style.borderColor = '#DCCCAC'
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          className="font-marvel text-xs mt-1.5 ml-1"
                          style={{ color: '#e53e3e' }}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                    Address Line 1
                  </label>
                  <InputField
                    name="line1"
                    placeholder="House / Flat / Building No."
                    icon={HiOutlineHome}
                    error={errors.line1}
                    registerProps={register('line1', { required: 'Address line 1 is required' })}
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#99AD7A' }}>
                    Address Line 2 <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <InputField
                    name="line2"
                    placeholder="Street / Area / Locality"
                    icon={HiOutlineHome}
                    registerProps={register('line2')}
                  />
                </div>

                {/* City + State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                      City
                    </label>
                    <InputField
                      name="city"
                      placeholder="City"
                      error={errors.city}
                      registerProps={register('city', { required: 'City is required' })}
                    />
                  </div>
                  <div>
                    <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                      State
                    </label>
                    <InputField
                      name="state"
                      placeholder="State"
                      error={errors.state}
                      registerProps={register('state', { required: 'State is required' })}
                    />
                  </div>
                </div>

                {/* Pincode + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                      Pincode
                    </label>
                    <InputField
                      name="pincode"
                      placeholder="6-digit pincode"
                      error={errors.pincode}
                      maxLength={6}
                      registerProps={register('pincode', {
                        required: 'Pincode is required',
                        pattern: { value: /^\d{6}$/, message: 'Enter a valid 6-digit pincode' },
                      })}
                    />
                  </div>
                  <div>
                    <label className="font-marvel text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#546B41' }}>
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#99AD7A' }}>
                        <HiOutlineGlobeAlt size={18} />
                      </div>
                      <select
                        {...register('country', { required: 'Country is required' })}
                        className="w-full py-3.5 font-marvel text-sm outline-none rounded-lg transition-all duration-300 focus:shadow-md appearance-none cursor-pointer"
                        style={{
                          paddingLeft: '44px',
                          paddingRight: '40px',
                          border: `1.5px solid ${errors.country ? '#e53e3e' : '#DCCCAC'}`,
                          backgroundColor: '#FAFAFA',
                          color: '#2D3A22',
                        }}
                        onFocus={(e) => {
                          if (!errors.country) e.target.style.borderColor = '#546B41'
                          e.target.style.backgroundColor = '#FFFFFF'
                        }}
                        onBlur={(e) => {
                          if (!errors.country) e.target.style.borderColor = '#DCCCAC'
                          e.target.style.backgroundColor = '#FAFAFA'
                        }}
                      >
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#99AD7A' }}>
                        <HiOutlineChevronDown size={16} />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.country && (
                        <motion.p
                          className="font-marvel text-xs mt-1.5 ml-1"
                          style={{ color: '#e53e3e' }}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {errors.country.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column – Price Summary (2 cols, sticky) */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <div className="lg:sticky lg:top-28 space-y-5">

              {/* Price Summary Card */}
              <div
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div
                  className="px-6 py-4"
                  style={{ backgroundColor: '#546B41' }}
                >
                  <h2 className="font-cormorant text-xl font-bold" style={{ color: '#FFF8EC' }}>
                    Price Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="font-marvel text-sm" style={{ color: '#7A8A6A' }}>
                      Price ({totalItemCount} {totalItemCount > 1 ? 'items' : 'item'})
                    </span>
                    <span className="font-cormorant text-lg font-semibold" style={{ color: '#546B41' }}>
                      {fromCart ? displayTotalPrice : quantity > 1 ? `${displayPrice} × ${quantity}` : displayPrice}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="font-marvel text-sm" style={{ color: '#7A8A6A' }}>
                      Shipping
                    </span>
                    <span className="font-marvel text-sm font-semibold" style={{ color: '#99AD7A' }}>
                      Calculated at next step
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ backgroundColor: '#F0EBE3' }} />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-cormorant text-lg font-bold" style={{ color: '#546B41' }}>
                      Total
                    </span>
                    <span className="font-cormorant text-3xl font-bold" style={{ color: '#546B41' }}>
                      {displayTotalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="px-6 py-4 border-b" style={{ borderColor: '#F0EBE3' }}>
                  <h2 className="font-cormorant text-xl font-bold" style={{ color: '#546B41' }}>Payment Method</h2>
                </div>
                <div className="p-4 space-y-3">
                  {/* Razorpay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all duration-200"
                    style={{
                      borderColor: paymentMethod === 'razorpay' ? '#546B41' : '#DCCCAC',
                      backgroundColor: paymentMethod === 'razorpay' ? '#F2F6EE' : '#FAFAFA',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: paymentMethod === 'razorpay' ? '#546B41' : '#DCCCAC' }}
                    >
                      {paymentMethod === 'razorpay' && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#546B41' }} />
                      )}
                    </div>
                    <img
                      src="https://razorpay.com/favicon.ico"
                      alt="Razorpay"
                      className="w-5 h-5 rounded"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="text-left">
                      <p className="font-cormorant font-bold text-base" style={{ color: '#546B41' }}>Razorpay</p>
                      <p className="font-marvel text-xs" style={{ color: '#99AD7A' }}>Cards, UPI, Netbanking & Wallets</p>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all duration-200"
                    style={{
                      borderColor: paymentMethod === 'paypal' ? '#003087' : '#DCCCAC',
                      backgroundColor: paymentMethod === 'paypal' ? '#EEF3FB' : '#FAFAFA',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: paymentMethod === 'paypal' ? '#003087' : '#DCCCAC' }}
                    >
                      {paymentMethod === 'paypal' && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#003087' }} />
                      )}
                    </div>
                    <img
                      src="https://www.paypalobjects.com/webstatic/icon/favicon.ico"
                      alt="PayPal"
                      className="w-5 h-5 rounded"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="text-left">
                      <p className="font-cormorant font-bold text-base" style={{ color: '#003087' }}>PayPal</p>
                      <p className="font-marvel text-xs" style={{ color: '#5B8ED6' }}>PayPal balance & linked cards</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Place Order */}
              <motion.button
                onClick={handleSubmit(onSubmit)}
                disabled={isPlacingOrder}
                className="w-full py-4 rounded-xl font-cormorant text-lg font-bold tracking-wide transition-all duration-300 shadow-lg disabled:opacity-60"
                style={{
                  backgroundColor: '#546B41',
                  color: '#FFF8EC',
                  boxShadow: '0 4px 20px rgba(84, 107, 65, 0.3)',
                }}
                whileHover={{ scale: isPlacingOrder ? 1 : 1.02, boxShadow: '0 6px 28px rgba(84, 107, 65, 0.4)' }}
                whileTap={{ scale: isPlacingOrder ? 1 : 0.98 }}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </motion.button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-1.5" style={{ color: '#99AD7A' }}>
                  <HiOutlineShieldCheck size={16} />
                  <span className="font-marvel text-xs">Secure</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: '#99AD7A' }}>
                  <HiOutlineTruck size={16} />
                  <span className="font-marvel text-xs">Tracked Delivery</span>
                </div>
              </div>

              {/* Product thumbnail in sidebar */}
              {fromCart ? (
                <div className="rounded-2xl overflow-hidden mt-4" style={{ backgroundColor: '#FFF8EC' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: '#F0EBE3' }}>
                    <p className="font-cormorant text-sm font-bold" style={{ color: '#546B41' }}>
                      {cartItems.length} {cartItems.length > 1 ? 'items' : 'item'} in cart
                    </p>
                  </div>
                  {cartItems.slice(0, 3).map((item, i) => {
                    const itemImage = item?.product_details?.image || item?.image || item?.product_image
                    const itemName = item?.product_details?.name || item?.name || item?.product_name
                    return (
                      <div key={i} className="flex items-center gap-3 px-4 py-2 border-b last:border-b-0" style={{ borderColor: '#F0EBE3' }}>
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: '#DCCCAC' }}>
                          {itemImage && <img src={itemImage} alt={itemName} className="w-full h-full object-cover" />}
                        </div>
                        <p className="font-marvel text-xs truncate" style={{ color: '#546B41' }}>{itemName}</p>
                      </div>
                    )
                  })}
                  {cartItems.length > 3 && (
                    <p className="font-marvel text-xs text-center py-2" style={{ color: '#99AD7A' }}>+{cartItems.length - 3} more</p>
                  )}
                </div>
              ) : (
                <div
                  className="rounded-2xl overflow-hidden mt-4"
                  style={{ backgroundColor: '#FFF8EC' }}
                >
                  <img
                    src={image}
                    alt={product?.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-4 py-3">
                    <p className="font-cormorant text-sm font-bold truncate" style={{ color: '#546B41' }}>
                      {product?.name}
                    </p>
                    {selectedSize && (
                      <p className="font-marvel text-xs" style={{ color: '#99AD7A' }}>
                        Size: {selectedSize?.size}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
