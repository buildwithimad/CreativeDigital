import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { SERVICE_DETAIL_QUERY } from '@/sanity/queries/services';
import ServiceDetailContent from '@/components/services/ServiceDetailsContent';

export const revalidate = 60; // Revalidate every 1 minute

/* -------------------------------------------------------
   1. SEO METADATA (ENGLISH – FULL)
------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = await client.fetch(SERVICE_DETAIL_QUERY, { slug });

  if (!service) {
    return {
      title: 'Service Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = service.seo?.title || service.title;
  const description =
    service.seo?.description || service.excerpt?.slice(0, 160);

  const ogImage =
    service.seo?.ogImage?.asset?.url ||
    service.mainImage?.asset?.url;

  const canonicalUrl = `https://www.creativeedigital.com/en/services/${slug}`;
  const arUrl = `https://www.creativeedigital.com/ar/services/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ar: arUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Creative Digital',
      type: 'website',
      locale: 'en_US',
      alternateLocale: 'ar_SA',
      images: ogImage ? [{ url: ogImage }] : [],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* -------------------------------------------------------
   2. PAGE COMPONENT
------------------------------------------------------- */
export default async function ServicePage({ params }) {
  const { slug } = await params;

  const service = await client.fetch(SERVICE_DETAIL_QUERY, { slug });

  if (!service) {
    notFound();
  }

  return (
    <>
  {/* ✅ Service Schema (English – Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',

      name: service.title,
      description: service.seo?.description || service.excerpt,

      // 🔹 Small SEO Enhancements
      inLanguage: 'en',
      isAccessibleForFree: true,

      provider: {
        '@type': 'Organization',
        name: 'Creative Digital',
        url: 'https://www.creativeedigital.com',
      },

      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },

      serviceType: service.title,

      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.creativeedigital.com/en/services/${slug}`,
      },
    }),
  }}
/>


      <ServiceDetailContent service={service} />
    </>
  );
}
