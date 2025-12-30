import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { SERVICE_DETAIL_QUERY } from '@/sanity/queries/services';
import ServiceDetailContent from '@/components/services/ServiceDetailsContent';

export const revalidate = 300; // Revalidate every 5 minutes

// 1. Generate SEO Metadata (English Only)
export async function generateMetadata({ params }) {

    const {slug} = await params;
  const service = await client.fetch(SERVICE_DETAIL_QUERY, { 
    slug: slug
  });

  console.log('service details:', service)

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  // Force English fields directly
  const title = service.seo?.title || service.title;
  const description = service.seo?.description || service.excerpt;
  const ogImage = service.seo?.ogImage?.asset?.url || service.mainImage?.asset?.url;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

// 2. The Page Component
export default async function ServicePage({ params }) {
  const {slug} = await params;
  const service = await client.fetch(SERVICE_DETAIL_QUERY, { 
    slug: slug
  });

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
}