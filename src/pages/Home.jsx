import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import LaunchingSoon from '../components/LaunchingSoon'
import AutoSlider from '../components/AutoSlider'
import GridDisplay from '../components/GridDisplay'

const Home = () => {
  return (
    <div>
        <Hero />
        <AutoSlider />
        <GridDisplay />
        <LaunchingSoon />
    </div>
  )
}

export default Home