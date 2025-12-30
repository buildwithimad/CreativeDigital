
import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { WORK_QUERY } from '@/sanity/queries/work';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';

const ServicesSection = dynamic(() => import("@/components/home/Services"));
const BlogsSection = dynamic(() => import("@/components/home/Blogs"));
const AboutSection = dynamic(() => import("@/components/home/About"));
const HeroSection = dynamic(() => import("@/components/home/hero"));
const TestimonialsSection = dynamic(() => import("@/components/home/Testimonial"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));
const CaseStudies = dynamic(() => import('@/components/home/CaseStudy'))

export const revalidate = 60; // ISR – refresh every 1 minutes

export default async function HomeClient() {


    const services = await client.fetch(SERVICES_LIST_QUERY);
    const work = await client.fetch(WORK_QUERY)
    const blogs = await client.fetch(BLOGS_LIST_QUERY)
  
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <CaseStudies work={work}/>
      <BlogsSection blogs={blogs} />
     <TestimonialsSection/>
     <CallToAction />

     </div>
  );
}
