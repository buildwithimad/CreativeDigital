// app/services/page.js
import ServicesHero from '../../components/services/Servicehero';
import ServicesPageContent from '../../components/services/ServiceContent';
import { client } from '../../sanity/lib/client';

export default async function ServicesPage() {
  const servicesData = await client.fetch(`*[_type == "service"]{
    _id,
    title,
    description,
    image
  }`);

  return (

    <>
    <ServicesHero/>
    <ServicesPageContent servicesData={servicesData} />;
    
    </>
  ) 
}
