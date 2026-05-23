import React from 'react'
import { motion } from 'framer-motion'
import { autoSliderItems } from '../constants/autoSliderData'

const AutoSlider = () => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...autoSliderItems, ...autoSliderItems]

  return (
    <div className='w-full overflow-hidden bg-white py-3  mt-5'>
      <motion.div
        className='flex gap-12 md:gap-16'
        animate={{
          x: [0, -50 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={`${item.id}-${index}`}
              className='flex items-center gap-3 whitespace-nowrap border border-yellow-600 rounded-full px-4 py-2'
            >
              <Icon className='text-yellow-600 text-2xl md:text-3xl shrink-0' />
              <span className='text-black font-marvel text-sm md:text-base tracking-wide'>
                {item.text}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default AutoSlider
