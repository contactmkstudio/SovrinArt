import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Sidebar'
import LaunchingSoon from '../components/LaunchingSoon'
import NewArtLaunch from '../components/NewArtLaunch'
import EmailSignupModal from '../components/EmailSignupModal'
import Contact from './Contact'


const Home = () => {
  return (
    <div>
        <NewArtLaunch />
        <Hero />  
        {/* <LaunchingSoon /> */}
      <EmailSignupModal />
    </div>
  )
}

export default Home