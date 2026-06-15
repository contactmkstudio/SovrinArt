import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Sidebar'
import LaunchingSoon from '../components/LaunchingSoon'
import NewArtLaunch from '../components/NewArtLaunch'
import EmailSignupModal from '../components/EmailSignupModal'
import Contact from './Contact'
import CurrencyPopUp from '../components/CurrencyPopUp'


const Home = () => {
  return (
    <div>
        <Hero />  
        <NewArtLaunch />
        {/* <LaunchingSoon /> */}
      <EmailSignupModal />
      <CurrencyPopUp />
    </div>
  )
}

export default Home