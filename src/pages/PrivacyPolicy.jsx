import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import NewArtLaunch from '../components/NewArtLaunch'
import Footer from './Footer'

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'who-we-are',
      title: '§ 01 — WHO WE ARE',
      content: [
        'This Privacy Policy applies to the personal art commission services offered through this website ("the Artist," "we," "us"). The Artist operates as an independent creative professional offering custom commissioned artwork to clients worldwide.',
        'This website is hosted via Vercel. All commission inquiries, payments, and communications are handled through the services described in this policy.'
      ]
    },
    {
      id: 'what-we-collect',
      title: '§ 02 — WHAT INFORMATION WE COLLECT',
      content: [
        'We only collect information that is necessary to process and fulfill your commission. This may include:'
      ],
      list: [
        'Your name or display name, as provided during the commission inquiry',
        'Your email address, used for correspondence and commission updates',
        'Reference images, descriptions, and creative briefs you voluntarily submit',
        'Records of communications exchanged via email',
        'Payment transaction records (processed entirely by third-party providers — see § 06)',
        'Website usage data collected automatically by Google Analytics (see § 04)'
      ],
      footer: 'We do not collect sensitive personal information such as identification documents, dates of birth, or physical addresses unless you choose to provide them for a specific purpose such as physical print delivery.'
    },
    {
      id: 'how-we-use',
      title: '§ 03 — HOW WE USE YOUR INFORMATION',
      content: [
        'Any information you provide is used solely for the following purposes:'
      ],
      list: [
        'To process, manage, and deliver your commission',
        'To communicate with you about your order, revisions, or updates',
        'To issue invoices and maintain transaction records for accounting and tax obligations',
        'To respond to support or follow-up inquiries',
        'To send newsletters or updates, only if you have explicitly subscribed (see § 07)',
        'To improve the website experience through anonymous analytics data'
      ],
      footer: 'We do NOT sell, rent, trade, or share your personal information with any third party for marketing purposes. Your data is never used for automated decision-making or profiling.'
    },
    {
      id: 'cookies',
      title: '§ 04 — COOKIES & GOOGLE ANALYTICS',
      content: [
        'This website uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics places small data files called cookies on your device to help us understand how visitors interact with the website — such as which pages are visited, how long visitors stay, and what country they are from.',
        'This data is aggregated and anonymised — it does not identify you personally. We use it solely to understand our audience and improve the website experience.'
      ],
      list: [
        'Google may transfer this data to servers in the United States or other countries',
        'Google\'s use of data is governed by their own Privacy Policy: policies.google.com/privacy',
        'You may opt out of Google Analytics at any time by installing the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout',
        'You may also adjust cookie preferences via your browser settings at any time'
      ],
      footer: 'Cookie Types Used: This site uses analytical/performance cookies only. We do not use advertising cookies, retargeting cookies, or social media tracking cookies.'
    },
    {
      id: 'third-party',
      title: '§ 05 — THIRD-PARTY SERVICES',
      content: [
        'We use the following trusted third-party platforms to operate our services. Each provider has its own privacy policy and independently governs the data it handles. We are not responsible for the privacy practices of these platforms.'
      ],
      list: [
        'PayPal — International payment processing — paypal.com/privacy',
        'Razorpay — Payment processing (India & international) — razorpay.com/privacy',
        'Google Analytics — Anonymous website usage analytics — policies.google.com/privacy',
        'Vercel — Website hosting & delivery — vercel.com/legal/privacy-policy',
        'Proton Mail — Secure email communication — proton.me/legal/privacy'
      ],
      footer: 'If the website platform changes in the future, this policy will be updated accordingly.'
    },
    {
      id: 'payment',
      title: '§ 06 — PAYMENT DATA',
      content: [
        'All payments are processed exclusively through PayPal and Razorpay. The Artist does not store, view, or have access to your credit card numbers, bank account details, or any sensitive financial information.',
        'Payment data is transmitted directly to and stored securely by the respective payment provider. Any dispute regarding a payment transaction should be directed to the relevant payment platform in the first instance.',
        'We retain only basic transaction records (amount, date, commission reference) for accounting and tax compliance purposes, as required by law.'
      ]
    },
    {
      id: 'email',
      title: '§ 07 — EMAIL & MAILING LIST',
      content: [
        'When you email us regarding a commission, your email address and the contents of your messages are received and stored in our secure Proton Mail inbox. This information is used solely to respond to and manage your commission inquiry.',
        'Regarding our mailing list:'
      ],
      list: [
        'You will only be added to any mailing list if you explicitly opt in by subscribing through a designated sign-up form',
        'We will never add past or current clients to a mailing list without their separate and clear consent',
        'Every promotional email will include a clear and immediate unsubscribe option',
        'You may withdraw your consent and unsubscribe at any time with no consequence to existing or future commissions'
      ]
    },
    {
      id: 'portfolio',
      title: '§ 08 — PORTFOLIO & PROMOTIONAL USE OF ARTWORK',
      content: [
        'Finished commissioned artwork may be displayed publicly by the Artist for portfolio, promotional, and artistic purposes — including on this website, social media platforms, and at exhibitions — unless the Client has separately negotiated and paid for a full confidentiality agreement prior to commencement of the commission.',
        'When sharing commissioned work publicly, the Artist will not disclose the Client\'s personal identity, real name, or contact information without the Client\'s explicit written consent.',
        'This is also governed by the Commission Terms & Conditions, which take precedence in the event of any conflict.'
      ]
    },
    {
      id: 'retention',
      title: '§ 09 — DATA RETENTION',
      content: [
        'We retain your personal data only for as long as necessary:'
      ],
      list: [
        'Commission correspondence: Retained for the duration of the project and up to 2 years after delivery for dispute resolution purposes',
        'Invoice and transaction records: Retained for a minimum of 5–7 years as required for tax and accounting compliance',
        'Reference images: Deleted upon delivery of the finished commission unless otherwise agreed in writing',
        'Mailing list subscriptions: Retained until you unsubscribe or request deletion'
      ],
      footer: 'Upon expiry of the relevant retention period, your data will be securely deleted or anonymised.'
    },
    {
      id: 'your-rights',
      title: '§ 10 — YOUR RIGHTS',
      content: [
        'Depending on your location, you may have the following rights regarding your personal data. We honour these rights for all clients worldwide:'
      ],
      list: [
        'Right to Access — Request a copy of the personal data we hold about you at any time',
        'Right to Correction — Request that inaccurate or incomplete data be corrected',
        'Right to Deletion — Request that your personal data be deleted, subject to legal retention requirements',
        'Right to Object — Object to the processing of your data for any purpose beyond fulfilling your commission',
        'Right to Withdraw Consent — Withdraw consent at any time for any consent-based use of your data such as the mailing list',
        'Right to Portability — Request your data in a structured, commonly used format where technically feasible'
      ],
      footer: 'GDPR (European clients) & CCPA (California clients): These rights are enshrined under applicable law for clients in these regions. We are committed to honouring them regardless of your location. To exercise any of these rights, please contact us via email.'
    },
    {
      id: 'children',
      title: '§ 11 — CHILDREN\'S PRIVACY',
      content: [
        'This website and commission services are not directed at individuals under the age of 13. We do not knowingly collect personal data from children under 13.',
        'For clients aged 13–17, a parent or legal guardian must review and consent to these Terms and this Privacy Policy on the minor\'s behalf before a commission is placed. By submitting a commission on behalf of a minor, the parent or guardian confirms their consent.',
        'If we become aware that we have inadvertently collected personal data from a child under 13 without verified parental consent, we will delete that information promptly.'
      ]
    },
    {
      id: 'security',
      title: '§ 12 — DATA SECURITY',
      content: [
        'We take reasonable and appropriate steps to protect your personal information. Measures include:'
      ],
      list: [
        'Use of Proton Mail, an end-to-end encrypted email platform, for all client communications',
        'Payment processing handled entirely by PCI-DSS compliant third-party providers',
        'Website hosted on Vercel with HTTPS encryption enforced across all pages'
      ],
      footer: 'No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security. In the unlikely event of a data breach affecting your rights, we will notify you as required by applicable law.'
    },
    {
      id: 'international',
      title: '§ 13 — INTERNATIONAL CLIENTS',
      content: [
        'Commissions are accepted from clients worldwide. By submitting personal information to us, international clients consent to the processing of that information in the country where the Artist is based, which may have different data protection laws than your country of residence.',
        'We are committed to treating all client data with the same high standard of care regardless of origin.',
        'Clients in the European Economic Area or United Kingdom benefit from the additional protections of the GDPR. California residents benefit from the CCPA. We honour the rights under both frameworks for all clients globally.'
      ]
    },
    {
      id: 'changes',
      title: '§ 14 — CHANGES TO THIS POLICY',
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal obligations. When we do, we will revise the Last Updated date at the top of this page.',
        'Continued use of this website or commission services after any changes are published constitutes your acceptance of the updated policy.',
        'If changes are material, we will make reasonable efforts to notify active clients by email.'
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
          <h1 className='font-cormorant text-4xl md:text-6xl font-bold mb-4' style={{ color: '#546B41' }}>
            PRIVACY & COOKIE POLICY
          </h1>
          <div className='w-32 h-1 mx-auto mb-6' style={{ backgroundColor: '#DCCCAC' }}></div>
          <p className='font-marvel text-sm md:text-base font-medium' style={{ color: '#3d5030' }}>
            Last Updated: 2025 · Applies globally to all clients
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-4 font-medium' style={{ color: '#3d5030' }}>
            Your privacy matters. This policy explains clearly and honestly what information is collected when you visit this website or commission artwork, how it is used, who it may be shared with, and what rights you hold — regardless of where in the world you are located.
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
                <ul className='ml-6 mb-4 space-y-2'>
                  {section.list.map((item, idx) => (
                    <li key={idx} className='font-marvel text-sm md:text-base font-medium' style={{ color: '#3d5030' }}>
                      — {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className='font-marvel text-sm md:text-base leading-relaxed mt-4 pt-4 border-t font-medium' style={{ color: '#3d5030', borderColor: '#DCCCAC' }}>
                  {section.footer}
                </p>
              )}
            </div>
          </motion.section>
        ))}

        {/* Privacy Enquiries */}
        <motion.div
          className='mt-12 p-6 md:p-8 rounded-2xl border-2'
          style={{ backgroundColor: '#546B41', borderColor: '#546B41' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='font-cormorant text-2xl md:text-3xl font-bold mb-4 text-white'>
            PRIVACY ENQUIRIES
          </h2>
          <div className='w-16 h-0.5 mb-6' style={{ backgroundColor: '#DCCCAC' }}></div>
          <p className='font-marvel text-sm md:text-base leading-relaxed mb-3 text-white/80'>
            For any questions, concerns, or data requests — including requests to access, correct, or delete your information — please contact us via the email listed on our commissions page.
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed mb-3 text-white/80'>
            Please include <span className='font-semibold text-white'>"Privacy Request"</span> in the subject line. We aim to respond within 14 business days.
          </p>
          <p className='font-marvel text-sm md:text-base leading-relaxed text-white/60 mt-6 pt-4 border-t' style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            This policy applies to all commission services offered through this website · Worldwide · © 2025 All Rights Reserved
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
