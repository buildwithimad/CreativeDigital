import ContactHero from '@/components/contact/ContactHero';
import Contact from '@/components/contact/Contact';
import CTASection from '@/components/home/CallToAction';
import React from 'react';

export const revalidate = 60; // ISR – refresh every 60 seconds

// 🔹 English SEO Metadata
export const metadata = {
  title: 'Contact Us | Creative Digital – Let’s Build Something Great',
  description:
    'Get in touch with Creative Digital to discuss your project, request a quote, or ask about web development, SEO, and digital marketing services.',

  keywords: [
    'contact Creative Digital',
    'web development contact',
    'digital marketing agency contact',
    'seo services contact',
    'hire web developers',
    'creative digital agency',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/en/contact',
    languages: {
      en: 'https://www.creativeedigital.com/en/contact',
      ar: 'https://www.creativeedigital.com/ar/contact',
    },
  },

  openGraph: {
    title: 'Contact Us | Creative Digital',
    description:
      'Contact Creative Digital today to start your next web development or digital marketing project.',
    url: 'https://www.creativeedigital.com/en/contact',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Creative Digital',
    description:
      'Reach out to Creative Digital for web development, SEO, and digital marketing solutions.',
  },
};

const ContactPage = () => {
  return (
    <>
      <ContactHero />
      <Contact />
      <CTASection />
    </>
  );
};

export default ContactPage;
