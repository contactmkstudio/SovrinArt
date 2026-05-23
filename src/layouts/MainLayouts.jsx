import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
import Faq from '../pages/Faq'


const MainLayouts = ({children}) => {
  return (
    <>
      {/* <Navbar /> */}

      <main>
        {children}
      </main>
      <Faq />
      <Footer />
    </>
   
  )
}

export default MainLayouts