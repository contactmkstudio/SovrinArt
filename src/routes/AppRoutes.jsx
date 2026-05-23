import React from 'react'
import Home from '../pages/Home'
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'


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
         
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes