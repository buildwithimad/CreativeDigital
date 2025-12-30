import ContactHero from '@/components/contact/ContactHero'
import Contact from '@/components/contact/Contact'
import React from 'react'
import CTASection from '@/components/home/CallToAction'

export const revalidate = 60; // ISR – refresh every 1 minutes

const ContactPage = () => {
  return (
    <>
    <ContactHero/>
    <Contact/>
    <CTASection/>
    </>
  )
}

export default ContactPage