import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import PremiumBackground from '../components/PremiumBackground'



const Faq = () => {

  
  const [openIndex, setOpenIndex] = useState(null);

  
  const faqData = [
    {
      question: "How do I commission an artwork?",
      answer: "To commission an artwork, simply contact us through our website or email us at contact@sovrinart.com. We'll discuss your vision, preferences, and requirements to create a custom piece just for you."
    },
    {
      question: "What is the pricing for commissions?",
      answer: "Our pricing varies based on the size, complexity, and medium of the artwork. Please contact us for a personalized quote."
    },
    {
      question: "What is the turnaround time for a commission?",
      answer: "The turnaround time depends on the complexity of the artwork and our current workload. We will provide an estimated completion date when you contact us."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping. Shipping costs will be calculated based on the destination and size of the artwork."   
    },
    {
      question: "Can I visit your studio?",
      answer: "Yes, we welcome visitors to our studio. Please contact us in advance to schedule a visit."
    },
  ]

  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
     <section className='relative bg-black overflow-hidden'>
      
      {/* Premium Animated Background Component */}
      <PremiumBackground />

      {/* ============================================
          FAQ CONTENT SECTION
          Main content layer positioned above background
          ============================================ */}
      <div className='relative z-10 flex flex-col justify-center items-center text-white px-5 py-10 md:p-10'>
        
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
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className='border border-white/20 rounded-lg overflow-hidden'
              initial={{ opacity: 0, y: 50 }}        
              whileInView={{ opacity: 1, y: 0 }}     
              viewport={{ once: true, amount: 0.2 }} 
              transition={{ duration: 0.6, delay: index * 0.15 }} 
            >
              {/* Question Button - Clickable header */}
              <button
                onClick={() => toggleFaq(index)}
                className='w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-white/5 transition-colors duration-300'
              >
                <h3 className='font-cormorant text-sm md:text-base tracking-wide pr-4'>
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
                      <p className='text-white/70 text-sm md:text-base font-marvel tracking-wide leading-relaxed'>
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