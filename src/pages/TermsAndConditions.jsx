import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Footer from './Footer'

const TermsAndConditions = () => {
  const sections = [
    {
      id: 'copyright',
      title: 'COPYRIGHT OWNERSHIP',
      content: [
        'All artwork created and sold by SOVRINART remains the sole intellectual property of the Artist unless otherwise agreed in writing.',
        'The Artist retains all rights including:'
      ],
      list: [
        'copyright ownership,',
        'reproduction rights,',
        'distribution rights,',
        'commercial rights,',
        'portfolio rights,',
        'promotional rights,',
        'and licensing rights associated with the artwork.'
      ],
      footer: 'Purchasing artwork does not transfer ownership of copyright or intellectual property to the buyer.'
    },
    {
      id: 'client-responsibility',
      title: 'CLIENT RESPONSIBILITY FOR REFERENCES',
      content: [
        'Any references or materials submitted by the Client for commissioned artwork remain the sole responsibility of the Client.',
        'By providing references, the Client confirms that they:'
      ],
      list: [
        'own the material,',
        'have obtained proper authorization,',
        'or possess the legal right to use the submitted content.'
      ],
      footer: 'SOVRINART does not independently verify ownership or licensing of client-provided references and shall not be held liable for copyright infringement claims, trademark disputes, or legal actions related to such materials.'
    },
    {
      id: 'personal-usage',
      title: 'PERSONAL USAGE RIGHTS',
      content: ['Clients and collectors may:'],
      list: [
        'display purchased artwork for personal use,',
        'repost artwork online with visible credit to SOVRINART,',
        'share artwork for non-commercial purposes only.'
      ]
    },
    {
      id: 'restricted-usage',
      title: 'RESTRICTED & PROHIBITED USAGE',
      content: ['Without prior written permission from SOVRINART, buyers and clients may not:'],
      list: [
        'reproduce or duplicate artwork,',
        'commercially distribute artwork,',
        'sell prints or merchandise,',
        'modify or alter artwork,',
        'remove artist signatures or watermarks,',
        'claim ownership or authorship,',
        'mint artwork as NFTs,',
        'use artwork within AI training systems or machine learning datasets,',
        'or exploit the artwork for commercial purposes.'
      ],
      footer: 'Unauthorized usage may result in refusal of future services and potential legal action.'
    },
    {
      id: 'commission',
      title: 'COMMISSION ACCEPTANCE',
      content: [
        'SOVRINART reserves the right to refuse, cancel, or decline any commission request at its discretion, including requests involving copyright concerns, inappropriate subject matter, abusive conduct, or violation of these Terms & Conditions.'
      ]
    },
    {
      id: 'payment',
      title: 'PAYMENT POLICY',
      content: [
        'All commissions, original artworks, and ready-made collections purchased through SOVRINART require full payment in advance before production, reservation, or shipment begins.',
        'No final artwork, high-resolution files, or shipped artwork will be delivered until payment has been completed in full.',
        'Failure to complete payment may result in cancellation of the order or commission.'
      ]
    },
    {
      id: 'refund',
      title: 'REFUND, DAMAGE & CANCELLATION POLICY',
      content: [
        'Due to the handmade and custom nature of the artwork, cancellations, returns, or refunds are generally not accepted once an order has been confirmed.',
        'However, customer satisfaction remains important to SOVRINART, and refunds or replacements may be considered in specific situations involving verified transit damage or major delivery-related defects.',
        'To help us review and resolve such cases fairly, clients are kindly requested to record a clear unboxing video at the time of opening the package. The video must:'
      ],
      list: [
        'begin before the package is opened,',
        'clearly show the sealed packaging,',
        'remain continuous without cuts, pauses, or edits,',
        'and visibly capture any damage or issue upon opening.'
      ],
      content2: [
        'This process helps protect both the Client and SOVRINART during shipping-related claims and ensures transparency for all parties involved.',
        'Unboxing proof may be submitted through:'
      ],
      list2: [
        'email,',
        'WhatsApp,',
        'or any official social media platform through which the client is connected with SOVRINART.'
      ],
      footer: 'Refunds, replacements, or resolutions will be reviewed on a case-by-case basis and remain subject to approval after verification of the provided evidence. SOVRINART reserves the right to decline refund requests where sufficient proof of damage or defect cannot be provided.'
    },
    {
      id: 'revisions',
      title: 'REVISIONS & APPROVAL PROCESS',
      content: [
        'Due to the handmade nature of the artwork, revisions are limited to the initial sketch stage only.',
        'Clients may request up to two reasonable revisions during the draft or sketching phase before final approval is provided.',
        'Once the sketch has been approved by the Client, the artwork will proceed into the final production stage. After approval, no further modifications, redesigns, or revision requests will be accepted.',
        'This policy helps maintain the artistic integrity, quality, and structure of the artwork, as excessive alterations during later stages may negatively affect the final piece.',
        'Clients are therefore encouraged to carefully review the sketch draft before confirming approval.'
      ]
    },
    {
      id: 'delivery',
      title: 'DELIVERY & SHIPPING',
      content: [
        'Estimated completion timelines are provided as approximations only and may vary depending on workload, project complexity, revisions, shipping delays, customs procedures, or unforeseen circumstances.',
        'SOVRINART is not responsible for delays caused by shipping providers, customs processing, import taxes, local regulations, or force majeure events beyond reasonable control.',
        'Any customs duties, VAT charges, import taxes, or regional fees remain the responsibility of the Client.'
      ]
    },
    {
      id: 'digital',
      title: 'DIGITAL FILES & SOCIAL MEDIA',
      content: ['SOVRINART reserves the right to display commissioned or sold artwork within:'],
      list: [
        'portfolio websites,',
        'social media platforms,',
        'promotional content,',
        'exhibitions,',
        'advertisements,',
        'and future marketing materials,'
      ],
      footer: 'unless a prior written confidentiality agreement has been made with the Client.'
    },
    {
      id: 'liability',
      title: 'LIMITATION OF LIABILITY',
      content: ['SOVRINART shall not be held liable for:'],
      list: [
        'indirect or incidental damages,',
        'misuse of artwork,',
        'third-party printing errors,',
        'unauthorized reposting by external users,',
        'copyright disputes related to client-provided references,',
        'or losses resulting from delayed shipping or customs processes.'
      ],
      footer: 'The maximum liability of SOVRINART shall never exceed the original amount paid by the Client for the specific artwork or commission.'
    },
    {
      id: 'collector',
      title: 'COLLECTOR EXPERIENCE, DOCUMENTATION & SUSTAINABILITY',
      content: [
        'Each order from SOVRINART is carefully prepared to create a thoughtful and premium collector experience.',
        'Depending on the artwork and order type, clients may receive:'
      ],
      list: [
        'a personalized thank you note,',
        'a Certificate of Authenticity,',
        'a Certificate of Ownership,',
        'official purchase receipts or invoices,',
        'artwork care and maintenance instructions,',
        'exclusive discount codes for future purchases,',
        'and occasional exclusive artwork collectibles or bonus items.'
      ],
      footer: 'These additions are intended to enhance the overall experience of owning original artwork from SOVRINART and may vary between orders.',
      subsections: [
        {
          title: 'Certificates & Receipts',
          content: [
            'Certificates of Authenticity, Certificates of Ownership, receipts, invoices, and other accompanying documentation are important collector records and should be safely preserved by the client for future reference.',
            'Replacement certificates or documentation may not always be available in the event of loss, damage, or mishandling after delivery.',
            'The responsibility for preserving all certificates, receipts, and accompanying documents remains with the collector once the order has been delivered.'
          ]
        },
        {
          title: 'Artwork Care & Responsibility',
          content: [
            'Clients are kindly advised to carefully follow all artwork care and maintenance instructions provided with their order to help preserve the quality, longevity, and condition of the artwork.',
            'SOVRINART is not responsible for damage occurring after successful delivery, including but not limited to:'
          ],
          list: [
            'accidental damage,',
            'improper storage,',
            'exposure to moisture, sunlight, heat, or environmental conditions,',
            'mishandling,',
            'or failure to follow recommended care instructions.'
          ],
          footer: 'Proper care helps ensure the best possible long-term experience for the collector and the artwork itself.'
        },
        {
          title: 'Sustainability & Environmental Responsibility',
          content: [
            'SOVRINART values sustainability and encourages responsible ownership and preservation of artwork whenever possible.',
            'Collectors are kindly encouraged not to discard artwork unnecessarily. Instead, artworks may be preserved, archived, repurposed, or gifted to others whenever appropriate.',
            'As part of ongoing sustainability efforts, SOVRINART is also working toward introducing environmentally conscious packaging and collectible materials, including thank you cards and printed materials embedded with plantable seeds that can later be grown instead of discarded as waste.',
            'These sustainability initiatives are currently in development and may be introduced progressively in future orders.'
          ]
        }
      ]
    }
  ]

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FAFAFA' }}>
      <NewArtLaunch />
      <Navbar />
      
      <div className='max-w-5xl mx-auto px-4 py-12 md:py-16'>
        {/* Header */}
        <motion.div 
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='font-cormorant text-4xl md:text-6xl font-bold mb-6' style={{ color: '#546B41' }}>
            TERMS & CONDITIONS
          </h1>
          <div className='w-32 h-1 mx-auto mb-8' style={{ backgroundColor: '#DCCCAC' }}></div>
          <p className='font-marvel text-base md:text-lg leading-relaxed mb-4 font-medium' style={{ color: '#3d5030' }}>
            Welcome to SOVRINART.
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-medium' style={{ color: '#3d5030' }}>
            These Terms & Conditions govern all purchases, commissions, artwork collections, services, and interactions made through SOVRINART. By accessing this website, placing an order, purchasing artwork, submitting references, or commissioning a custom piece, you acknowledge that you have read, understood, and agreed to the policies outlined below.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div 
          className='mb-12 p-6 md:p-8 rounded-2xl border-2'
          style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className='font-marvel text-sm md:text-base leading-relaxed mb-4 font-medium' style={{ color: '#3d5030' }}>
            These terms are intended to protect both the Artist and the Client by clearly defining ownership rights, permitted usage, copyright responsibilities, payment policies, delivery conditions, and general policies related to all artwork created or sold by SOVRINART.
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed mb-4 font-medium' style={{ color: '#3d5030' }}>
            All artwork, whether custom commissioned or part of a ready-made collection, is created as original artistic work and remains protected under applicable copyright and intellectual property laws. Purchasing artwork does not transfer copyright ownership unless explicitly stated in a separate written agreement.
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed font-medium' style={{ color: '#3d5030' }}>
            Clients are solely responsible for ensuring that any references, concepts, photographs, vehicles, logos, characters, or other materials provided for commissions are legally authorized for use and do not infringe upon any third-party copyrights, trademarks, or intellectual property rights. SOVRINART shall not be held liable for disputes arising from client-provided materials.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            className='mb-8'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <div className='p-6 md:p-8 rounded-2xl border-2' style={{ backgroundColor: '#FFF8EC', borderColor: '#DCCCAC' }}>
              <h2 className='font-cormorant text-2xl md:text-3xl font-bold mb-4' style={{ color: '#546B41' }}>
                {section.title}
              </h2>
              <div className='w-16 h-0.5 mb-6' style={{ backgroundColor: '#546B41' }}></div>
              
              {section.content?.map((text, idx) => (
                <p key={idx} className='font-marvel text-sm md:text-base leading-relaxed mb-3 font-medium' style={{ color: '#3d5030' }}>
                  {text}
                </p>
              ))}
              
              {section.list && (
                <ul className='ml-6 mb-4 space-y-1'>
                  {section.list.map((item, idx) => (
                    <li key={idx} className='font-marvel text-sm md:text-base font-medium' style={{ color: '#3d5030' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
              
              {section.content2?.map((text, idx) => (
                <p key={idx} className='font-marvel text-sm md:text-base leading-relaxed mb-3 font-medium' style={{ color: '#3d5030' }}>
                  {text}
                </p>
              ))}
              
              {section.list2 && (
                <ul className='ml-6 mb-4 space-y-1'>
                  {section.list2.map((item, idx) => (
                    <li key={idx} className='font-marvel text-sm md:text-base font-medium' style={{ color: '#3d5030' }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
              
              {section.footer && (
                <p className='font-marvel text-sm md:text-base leading-relaxed mt-4 pt-4 border-t font-medium' style={{ color: '#3d5030', borderColor: '#DCCCAC' }}>
                  {section.footer}
                </p>
              )}

              {/* Subsections */}
              {section.subsections && (
                <div className='mt-6 space-y-6'>
                  {section.subsections.map((subsection, subIdx) => (
                    <div key={subIdx} className='pl-4 border-l-2' style={{ borderColor: '#DCCCAC' }}>
                      <h3 className='font-cormorant text-xl md:text-2xl font-semibold mb-3' style={{ color: '#546B41' }}>
                        {subsection.title}
                      </h3>
                      {subsection.content?.map((text, idx) => (
                        <p key={idx} className='font-marvel text-sm md:text-base leading-relaxed mb-3 font-medium' style={{ color: '#3d5030' }}>
                          {text}
                        </p>
                      ))}
                      {subsection.list && (
                        <ul className='ml-6 mb-4 space-y-1'>
                          {subsection.list.map((item, idx) => (
                            <li key={idx} className='font-marvel text-sm md:text-base font-medium' style={{ color: '#3d5030' }}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {subsection.footer && (
                        <p className='font-marvel text-sm md:text-base leading-relaxed italic font-medium' style={{ color: '#3d5030' }}>
                          {subsection.footer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        ))}

        {/* Final Agreement */}
        <motion.div 
          className='mt-12 p-6 md:p-8 rounded-2xl border-2'
          style={{ backgroundColor: '#546B41', borderColor: '#546B41' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='font-cormorant text-2xl md:text-3xl font-bold mb-4' style={{ color: '#FFF8EC' }}>
            AGREEMENT TO TERMS
          </h2>
          <p className='font-marvel text-sm md:text-base leading-relaxed' style={{ color: '#FFF8EC' }}>
            By accessing this website, purchasing artwork, commissioning artwork, or submitting payment, you acknowledge and agree to all Terms & Conditions stated above. Failure to review these Terms does not exempt any user or buyer from responsibility or compliance.
          </p>
        </motion.div>

        {/* Footer note */}
        <motion.div 
          className='text-center mt-12'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className='font-marvel text-sm' style={{ color: '#99AD7A' }}>
            Last updated: May 28, 2026
          </p>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default TermsAndConditions