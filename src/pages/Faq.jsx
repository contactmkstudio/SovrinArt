import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import PremiumBackground from '../components/PremiumBackground'
import { faqApi } from '../api/apiService'



const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([])

  

  // fetches faqs api and sets faqs state
  const fetchFaqs = async () => {    
    try {
      const response = await faqApi.getAllFaqs();
      Array.isArray(response) ? setFaqs(response) : setFaqs([]);
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      setFaqs([]) 
    } 
  } 

  // Fetch FAQs on component mount
  useEffect(()=>{
     fetchFaqs()
  },[])

 
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
     <section className='relative bg-black overflow-hidden' style={{ WebkitTapHighlightColor: 'transparent' }}>
      
      {/* Premium Animated Background Component */}
      <PremiumBackground />

  
      <div className='relative z-10 flex flex-col justify-center items-center text-white px-5 py-10 md:p-10' style={{ WebkitTapHighlightColor: 'transparent' }}>
        
        {/* Page Title - Fades in when scrolled into view */}
        <motion.h1 
          className='font-cormorant text-3xl md:text-5xl font-bold tracking-wide'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h1>

        {/* Subtitle - Fades in with slight delay */}
        <motion.h4 
          className='text-sm md:text-base text-center max-w-xs md:max-w-xl mt-3 text-white/60 font-marvel tracking-wide'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Everything you need to know about commissions, pricing, shipping, and visiting our studio.
        </motion.h4>

        {/* ============================================
            FAQ ACCORDION ITEMS
            ============================================ */}
        <div className='w-full max-w-3xl mt-10 space-y-4'>
          {faqs?.map((faq, index) => (
            <motion.div
              key={index}
              className='border border-white/20 rounded-lg overflow-hidden'
              style={{ WebkitTapHighlightColor: 'transparent' }}
              initial={{ opacity: 0, y: 50 }}        
              whileInView={{ opacity: 1, y: 0 }}     
              viewport={{ once: true, amount: 0.2 }} 
              transition={{ duration: 0.6, delay: index * 0.15 }} 
            >
              {/* Question Button - Clickable header */}
              <button
                onClick={() => toggleFaq(index)}
                className='w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-yellow-500/5 focus:outline-none focus-visible:outline-none active:outline-none transition-colors duration-300'
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <h3 className='font-cormorant text-base md:text-xl tracking-wide pr-4'>
                  {faq.question}
                </h3>

                
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiChevronDown className='text-[#b8860b] text-xl shrink-0' />
                </motion.div>
              </button>

              {/* Answer Section - Expands/Collapses with smooth animation */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}    
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}       
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden'
                  >
                    <div className='px-4 md:px-6 pb-4 md:pb-6 pt-2'>
                      <p className='text-white/70 text-base md:text-lg font-marvel tracking-wide leading-relaxed'>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
     </section>
  )
}

export default Faq