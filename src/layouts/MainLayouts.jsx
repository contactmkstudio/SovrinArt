import React from 'react'
import Footer from '../pages/Footer'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import ProductCard from '../pages/ProductCard'
import GridDisplay from '../components/GridDisplay'
import AutoSlider from '../components/AutoSlider'
import CategoryCard from '../components/CategoryCard'


const MainLayouts = ({children}) => {
  return (
    <>
      <main>
        {children}
      </main>
      <ProductCard />
      <CategoryCard category="automobile" heading="Automobile Art" />
      <CategoryCard category="digitaldownload" heading="Digital Download " subheading='All Copyrights Reserved'/>

      <GridDisplay />
      <AutoSlider />
      <Contact/>
      <Faq />
      <Footer />
    </>
   
  )
}

export default MainLayouts