
import CaseStudies from '@/components/home/CaseStudy';
import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { WORK_QUERY } from '@/sanity/queries/work';

const ServicesSection = dynamic(() => import("@/components/home/Services"));
const BlogsSection = dynamic(() => import("@/components/home/Blogs"));
const AboutSection = dynamic(() => import("@/components/home/About"));
const HeroSection = dynamic(() => import("@/components/home/hero"));
const TestimonialsSection = dynamic(() => import("@/components/home/Testimonial"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export const revalidate = 60; // ISR – refresh every 1 minutes

export default async function HomeClient() {

      const services = await client.fetch(SERVICES_LIST_QUERY);
     const work = await client.fetch(WORK_QUERY)
      

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services}/>
      <CaseStudies work={work} />
      <BlogsSection />
     <TestimonialsSection/>
     <CallToAction />

     </div>
  );
}
