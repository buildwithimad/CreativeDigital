'use client';
import React, { useState, useEffect } from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutContent from '@/components/about/AboutContent';
import AboutTeam from '@/components/about/AboutTeam';
import Loading from '@/components/Loading';
import CTASection from '@/components/home/CallToAction';

export default function AboutClient() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <AboutHero/>
    <AboutContent/>
    <AboutTeam/>
    <CTASection/>
    </>
  );
}
