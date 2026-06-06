import React from 'react'
import Home from '../pages/Home'
import ProductCard from '../pages/ProductCard'
import ViewAll from '../pages/ViewAll'
import ProductDetail from '../pages/ProductDetail'
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TermsAndConditions from '../pages/TermsAndConditions'
import AdminDashboard from '../adminpanel/pages/AdminDashboard'
import AddFaq from '../adminpanel/pages/AddFaq'
import AdProduct from '../adminpanel/pages/AdProduct'
import DeleteProduct from '../adminpanel/pages/DeleteProduct'
import DeleteFaq from '../adminpanel/pages/DeleteFaq'
import About from '../pages/About'
import OrderSummary from '../pages/OrderSummary'
import Orders from '../pages/Orders'
import PayPalReturn from '../pages/PayPalReturn'
import PayPalCancel from '../pages/PayPalCancel'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={
                <MainLayouts>
                    <Home />
                </MainLayouts>
            } />
            <Route path="/home" element={
                <MainLayouts>
                    <Home />
                </MainLayouts>
            } />
            <Route path='/products' element={<ViewAll />}/> 
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-faqs" element={<AddFaq />} />
            <Route path="/admin/add-product" element={<AdProduct />} />
            <Route path="/admin/delete-product" element={<DeleteProduct />} />
            <Route path='/admin/delete-faq' element={<DeleteFaq />} />
            <Route path="/about" element={<About />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/paypal/return" element={<PayPalReturn />} />
            <Route path="/paypal/cancel" element={<PayPalCancel />} />
         
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes