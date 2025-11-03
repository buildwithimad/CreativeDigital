"use client";

import ServicesSection from "../components/home/Services";
import AboutSection from "../components/home/About";
import HeroSection from "../components/home/hero";
import Image from "next/image";
import TestimonialsSection from "../components/home/Testimonial";
import CallToAction from "../components/home/CallToAction";
import Contact from "../components/home/Contact";
import Work from "../components/home/Work";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
     <TestimonialsSection/>
     <Work/>
     <Contact />
    <CallToAction />

    </div>
  );
}
