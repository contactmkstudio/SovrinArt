import React from 'react'
import Home from '../pages/Home'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/home" element={
                <MainLayouts>
                    <Home />
                </MainLayouts>
            } />
            <Route path="/contact" element={
                <MainLayouts>
                    <Contact />
                </MainLayouts>  
            } />  
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes