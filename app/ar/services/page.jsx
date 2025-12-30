import ServicesHero from '@/components/services/Servicehero';
import ServicesPageContent from '@/components/services/ServiceContent';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // ISR – refresh every 1 minute

export default async function ServicesPage() {
  // ✅ Fetch services list from Sanity
  const services = await client.fetch(SERVICES_LIST_QUERY);

  return (
    <>
      <ServicesHero />
      <ServicesPageContent services={services} />
    </>
  );
}
