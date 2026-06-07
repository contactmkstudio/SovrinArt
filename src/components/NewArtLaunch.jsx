import React, { useEffect, useState } from 'react'
import { getAnnouncement } from '../api/apiService'

const NewArtLaunch = () => {
  const [announcement, setAnnouncement] = useState(null)

  const fetchAnnouncement = async () => {
    try {
      const response = await getAnnouncement()
      if (response?.data?.is_active) {
        setAnnouncement(response.data)
      }
    } catch {
      // silently fail — fallback to nothing
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  if (!announcement) return null

  return (
    <section className='bg-black text-white p-1 text-center font-cormorant'>
      <h1><span className='text-sm mr-2'>★</span> {announcement?.text || 'New Art Launch Soon'} <span className='text-sm ml-2'>★</span></h1>
    </section>
  )
}

export default NewArtLaunch