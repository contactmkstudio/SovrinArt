import React, { useState , useEffect } from 'react'
import { RiBrushLine } from "react-icons/ri";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineHome, HiOutlineInformationCircle, HiOutlineEnvelope, HiOutlinePaintBrush } from "react-icons/hi2";
import { BiLink } from "react-icons/bi";
import { MdOutlineGavel, MdOutlinePrivacyTip } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { set } from 'react-hook-form';



const Footer = () => {

 
  const pages =[
    {name: 'Home', link: '/home', icon: HiOutlineHome},
    {name: 'About', link: '/about', icon: HiOutlineInformationCircle},
    {name: 'Contact', link: '#contact-section', icon: HiOutlineEnvelope},
  ]




  return (
    <section className='bg-black px-5 md:px-8 lg:px-20 py-10 text-white'>

       {/* {footer-content} */}
       <div className='flex flex-col space-y-5 md:flex-row  md:justify-between '>

         {/* {1st div} */}
         <div className='flex flex-col space-y-2 mt-5'>
            <div className='flex items-center gap-1'>
              <RiBrushLine className='text-[#b8860b] md:text-2xl'/>
              <h1 className='font-marvel md:text-2xl tracking-widest'>Mkkatelier</h1>
            </div>
            <h1 className='font-marvel text-white/50 max-w-sm tracking-wide'>
              Distincitive artworks for collectors who seek more than decoration , crafted with character , craftmanship and timeless design.
            </h1>
         </div>

         {/* {pages div}  */}
         <div className='flex flex-col space-y-2'>
           <div className='flex items-center gap-2'>
             <HiOutlineHome className='text-[#b8860b] text-xl md:text-2xl'/>
             <h1 className='text-white font-marvel tracking-widest md:text-2xl'>Navigate</h1>
           </div>
           <ul>
            {pages.map((page, index)=>{
              const IconComponent = page.icon;
              return (
              <li key={index} className='text-white/50 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>
                <a href={page.link} className='flex items-center gap-2'>
                  <IconComponent size={16} />
                  <h2 className='font-marvel tracking-wide'>
                    {page.name}
                  </h2>
                </a>
              </li>
              )
            })}
           </ul>
         </div>

         {/* {Quick-links} */}
         <div className='flex flex-col space-y-2'>
           <div className='flex items-center gap-2'>
             <BiLink className='text-[#b8860b] text-xl md:text-2xl'/>
             <h1 className='text-white font-marvel tracking-widest md:text-2xl'>Quick Links</h1>
           </div>
           <div className='flex gap-4 '>
             <a href={""} target="_blank" rel="noopener noreferrer" 
                className='text-white/50 hover:text-[#b8860b] hover:border-[#b8860b] border-2 border-transparent rounded-full p-2 transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 hover:-translate-y-1'>
               <FaWhatsapp size={24} />
             </a>
             <a href={""} target="_blank" rel="noopener noreferrer"
                className='text-white/50 hover:text-[#b8860b] hover:border-[#b8860b] border-2 border-transparent rounded-full p-2 transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 hover:-translate-y-1'>
               <FaFacebookF size={24} />
             </a>
             <a href={""} target="_blank" rel="noopener noreferrer"
                className='text-white/50 hover:text-[#b8860b] hover:border-[#b8860b] border-2 border-transparent rounded-full p-2 transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 hover:-translate-y-1'>
               <FaInstagram size={24} />
             </a>
           </div>
         </div>

         {/* {legal} */}
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2'>
              <MdOutlineGavel className='text-[#b8860b] text-xl md:text-2xl'/>
              <h1 className='text-white font-marvel tracking-widest md:text-2xl'>Legal</h1>
            </div>
            <ul>
              <li className='text-white/50 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>
                <a href="/privacy-policy" className='flex items-center gap-2'>
                  <MdOutlinePrivacyTip size={16} />
                  <h2 className='font-marvel tracking-wide'>
                    Privacy Policy
                  </h2>
                </a>
              </li>
              <li className='text-white/50 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>
                <a href="/terms-and-conditions" className='flex items-center gap-2'>
                  <IoDocumentTextOutline size={16} />
                  <h2 className='font-marvel tracking-wide'>
                    Terms and Conditions
                  </h2>
                </a>
              </li>
            </ul>
          </div>
       </div>

       {/* {separator line} */}
       <div className='border-t border-white/20 mt-8'></div>

       {/* {all rights reserved} */}
       <div className='text-center mt-5'>
         <p className='font-marvel text-white/50 text-sm'>
           © {new Date().getFullYear()} Mkkatelier. All rights reserved.
         </p>
       </div>
    </section>
  )
}

export default Footer