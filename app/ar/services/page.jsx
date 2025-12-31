import ServicesHero from '@/components/services/Servicehero';
import ServicesPageContent from '@/components/services/ServiceContent';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // ISR – refresh every 60 seconds

// 🔹 Arabic SEO Metadata
export const metadata = {
  title: 'خدماتنا | تطوير المواقع، تحسين محركات البحث والتسويق الرقمي',
  description:
    'اكتشف خدمات Creative Digital الاحترافية في تطوير المواقع، تحسين محركات البحث (SEO)، التسويق الرقمي، تصميم تجربة المستخدم، والحلول الرقمية المخصصة لتنمية أعمالك.',

  keywords: [
    'خدمات تطوير المواقع',
    'خدمات تحسين محركات البحث',
    'التسويق الرقمي',
    'تصميم تجربة المستخدم',
    'شركة تطوير مواقع',
    'وكالة تسويق رقمي',
    'خدمات Creative Digital',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/ar/services',
    languages: {
      ar: 'https://www.creativeedigital.com/ar/services',
      en: 'https://www.creativeedigital.com/en/services',
    },
  },

  openGraph: {
    title: 'خدماتنا | Creative Digital',
    description:
      'تعرف على خدماتنا في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي المصممة لمساعدة أعمالك على النمو عبر الإنترنت.',
    url: 'https://www.creativeedigital.com/ar/services',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'خدماتنا | Creative Digital',
    description:
      'خدمات احترافية في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي للشركات الحديثة.',
  },
};

export default async function ServicesPage() {
  // ✅ Fetch services list from Sanity
  const services = await client.fetch(SERVICES_LIST_QUERY);

  return (
    <>

    
{/* ✅ Service Collection Schema (Arabic) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'خدمات Creative Digital',
      description:
        'قائمة خدمات Creative Digital في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي.',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.titleAr,
        url: `https://www.creativeedigital.com/ar/services/${service.slug}`,
      })),
    }),
  }}
/>

      <ServicesHero />
      <ServicesPageContent services={services} />
    </>
  );
}
