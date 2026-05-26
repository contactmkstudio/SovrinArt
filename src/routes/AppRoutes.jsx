import React from 'react'
import Home from '../pages/Home'
import ProductCard from '../pages/ProductCard'
import ViewAll from '../pages/ViewAll'
import ProductDetail from '../pages/ProductDetail'
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'
import Login from '../pages/Login'
import Register from '../pages/Register'


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
         
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes