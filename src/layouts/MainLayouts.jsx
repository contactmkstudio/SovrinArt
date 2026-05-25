import React from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../pages/Footer'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import ProductCard from '../pages/ProductCard'
import GridDisplay from '../components/GridDisplay'
import AutoSlider from '../components/AutoSlider'


const MainLayouts = ({children}) => {
  return (
    <>
      <Sidebar />

      <main>
        {children}
      </main>
      <ProductCard />
      <GridDisplay />
      <AutoSlider />
      <Contact/>
      <Faq />
      <Footer />
    </>
   
  )
}

export default MainLayouts