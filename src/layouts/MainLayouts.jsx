import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'


const MainLayouts = ({children}) => {
  return (
    <>
      {/* <Navbar /> */}

      <main>
        {children}
      </main>
      <Contact/>
      <Faq />
      <Footer />
    </>
   
  )
}

export default MainLayouts