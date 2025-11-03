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
        src="https://www.pexels.com/download/video/3125427/"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-12 py-20 md:py-0 text-center md:text-left max-w-5xl mx-auto">
        {/* Heading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t("ourServices")}
          </h1>
        </ScrollBasedAnimation>

        {/* Subheading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-6 opacity-90">
            {t("servicesDescription")}
          </p>
        </ScrollBasedAnimation>

        
      </div>
    </section>
  );
};

export default ServicesHero;
