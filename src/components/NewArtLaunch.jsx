import React, { useEffect, useState } from 'react'
import { getAnnouncement } from '../api/apiService'

const NewArtLaunch = () => {
  const [announcement, setAnnouncement] = useState({ text: 'New Art Launch Soon', is_active: true })

  const fetchAnnouncement = async () => {
    try {
      const response = await getAnnouncement()
      if (response?.data?.is_active) {
        setAnnouncement(response.data)
      }
      // if not active, keep the hardcoded default
    } catch {
      // silently fail — show nothing
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  return (
    <section className='bg-black text-white p-5 flex justify-center items-center gap-4 text-center font-cormorant'>
      <span className='text-sm mr-2'>★</span> 
         <h1 className="text-xl">
          {announcement?.text || 'New Art Launch Soon'}
         </h1>
       <span className='text-sm ml-2'>★</span>
    </section>
  )
}

export default NewArtLaunch