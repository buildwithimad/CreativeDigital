import ServicesHero from '@/components/services/Servicehero';
import ServicesPageContent from '@/components/services/ServiceContent';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // ISR – refresh every 60 seconds

// 🔹 English SEO Metadata
export const metadata = {
  title: 'Our Services | Web Development, SEO & Digital Marketing',
  description:
    'Explore Creative Digital’s professional services including web development, SEO, digital marketing, UI/UX design, and custom digital solutions for growing businesses.',

  keywords: [
    'web development services',
    'seo services',
    'digital marketing services',
    'ui ux design services',
    'next.js development',
    'creative digital services',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/en/services',
    languages: {
      en: 'https://www.creativeedigital.com/en/services',
      ar: 'https://www.creativeedigital.com/ar/services',
    },
  },

  openGraph: {
    title: 'Our Services | Creative Digital',
    description:
      'Discover our web development, SEO, and digital marketing services designed to help your business grow online.',
    url: 'https://www.creativeedigital.com/en/services',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Creative Digital',
    description:
      'Professional web development, SEO, and digital marketing services tailored for modern businesses.',
  },
};

export default async function ServicesPage() {
  const services = await client.fetch(SERVICES_LIST_QUERY);

  return (
    <>

{/* ✅ Service Collection Schema (English) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Creative Digital Services',
      description:
        'Professional services offered by Creative Digital including web development, SEO, and digital marketing.',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `https://www.creativeedigital.com/en/services/${service.slug}`,
      })),
    }),
  }}
/>


      <ServicesHero />
      <ServicesPageContent services={services} />
    </>
  );
}
