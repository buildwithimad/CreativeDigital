'use client';
import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const ServicesHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full  h-[700px] overflow-hidden text-white">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/ddpamvx3l/video/upload/v1762329011/Digital_Marketing_ux6b2z.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative mt-50 z-20 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-12 py-20 md:py-0 text-center md:text-left max-w-5xl mx-auto">
       
      </div>
    </section>
  );
};

export default ServicesHero;
