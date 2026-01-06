import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';
import { WORK_QUERY } from '@/sanity/queries/work';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';

export const revalidate = 60; // ✅ ISR: refresh every 60s

// Dynamic imports (safe for server components)
const HeroSection = dynamic(() => import('@/components/home/hero'));
const AboutSection = dynamic(() => import('@/components/home/About'));
const ServicesSection = dynamic(() => import('@/components/home/Services'));
const CaseStudies = dynamic(() => import('@/components/home/CaseStudy'));
const BlogsSection = dynamic(() => import('@/components/home/Blogs'));
const TestimonialsSection = dynamic(() => import('@/components/home/Testimonial'));
const CallToAction = dynamic(() => import('@/components/home/CallToAction'));

export default async function HomePage() {
  const [services, work, blogs] = await Promise.all([
    client.fetch(
      SERVICES_LIST_QUERY,
      {},
      { next: { revalidate: 60 } }
    ),
    client.fetch(
      WORK_QUERY,
      {},
      { next: { revalidate: 60 } }
    ),
    client.fetch(
      BLOGS_LIST_QUERY,
      {},
      { next: { revalidate: 60 } }
    ),
  ]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <CaseStudies work={work} />
      <BlogsSection blogs={blogs} />
      <TestimonialsSection />
      <CallToAction />
    </main>
  );
}
