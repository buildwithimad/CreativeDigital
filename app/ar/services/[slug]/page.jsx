import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { SERVICE_DETAIL_QUERY } from '@/sanity/queries/services';
import ServiceDetailContent from '@/components/services/ServiceDetailsContent';

export const revalidate = 60; // Revalidate every 1 minute

/* -------------------------------------------------------
   1. SEO METADATA (ARABIC – FULL)
------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = await client.fetch(SERVICE_DETAIL_QUERY, { slug });

  if (!service) {
    return {
      title: 'الخدمة غير موجودة',
      robots: { index: false, follow: false },
    };
  }

  const title = service.seo?.titleAr || service.titleAr;
  const description =
    service.seo?.descriptionAr || service.excerptAr?.slice(0, 160);

  const ogImage =
    service.seo?.ogImage?.asset?.url ||
    service.mainImage?.asset?.url;

  const canonicalUrl = `https://www.creativeedigital.com/ar/services/${slug}`;
  const enUrl = `https://www.creativeedigital.com/en/services/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: canonicalUrl,
        en: enUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Creative Digital',
      type: 'website',
      locale: 'ar_SA',
      alternateLocale: 'en_US',
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
  {/* ✅ Service Schema (Arabic – Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',

      name: service.titleAr,
      description: service.seo?.descriptionAr || service.excerptAr,

      // 🔹 SEO Enhancements
      inLanguage: 'ar',
      isAccessibleForFree: true,

      provider: {
        '@type': 'Organization',
        name: 'Creative Digital',
        url: 'https://www.creativeedigital.com',
      },

      areaServed: {
        '@type': 'Country',
        name: 'المملكة العربية السعودية',
      },

      serviceType: service.titleAr,

      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.creativeedigital.com/ar/services/${slug}`,
      },
    }),
  }}
/>


      <ServiceDetailContent service={service} />
    </>
  );
}
