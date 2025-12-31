import AboutClient from './AboutClient';

export const dynamic = 'force-static';

// 🔹 English SEO Metadata
export const metadata = {
  title: 'About Us | Creative Digital Team & Story',
  description:
    "Learn about Creative Digital’s journey, our expert team of designers, developers, and digital marketers, and our commitment to delivering high-quality digital solutions.",

  keywords: [
    'About Creative Digital',
    'Creative Digital team',
    'web development company',
    'digital marketing agency',
    'creative agency',
    'our story',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/en/about',
    languages: {
      en: 'https://www.creativeedigital.com/en/about',
      ar: 'https://www.creativeedigital.com/ar/about',
    },
  },

  openGraph: {
    title: 'About Us | Creative Digital Team & Story',
    description:
      'Discover the story behind Creative Digital, our experienced team, and how we deliver innovative web and digital marketing solutions.',
    url: 'https://www.creativeedigital.com/en/about',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Creative Digital',
    description:
      'Learn more about Creative Digital, our team, and our mission to help businesses grow online.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
