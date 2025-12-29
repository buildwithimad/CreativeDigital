
import CaseStudies from '@/components/home/CaseStudy';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import("@/components/home/Services"));
const BlogsSection = dynamic(() => import("@/components/home/Blogs"));
const AboutSection = dynamic(() => import("@/components/home/About"));
const HeroSection = dynamic(() => import("@/components/home/hero"));
const TestimonialsSection = dynamic(() => import("@/components/home/Testimonial"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export default function HomeClient() {

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CaseStudies/>
      <BlogsSection />
     <TestimonialsSection/>
     <CallToAction />

     </div>
  );
}
