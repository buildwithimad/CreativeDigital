'use client';
import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { useTranslation } from 'react-i18next';

const Hero = () => {
const { t, i18n } = useTranslation();
const isRTL = i18n.language === 'ar';

  return (
    <section
      className={`relative w-full h-[700px] overflow-hidden text-primary`}
    >
      {/* Fixed Video Background */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.pexels.com/download/video/3129957/"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div
        className={`relative z-20 flex flex-col justify-center items-center h-full px-6 md:px-12 py-20 md:py-0 text-center transition-all duration-300
        ${isRTL ? 'md:items-start md:text-right' : 'md:items-start md:text-left'}`}
      >
        {/* Heading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-3xl md:max-w-4xl">
            {t('be')} <span className="text-accent">{t('everywhere')}</span>
          </h1>
        </ScrollBasedAnimation>

        {/* Subheadings */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-4 md:mb-6 opacity-90">
            {t('heroSubheading1')}
          </p>
          <p className="text-md sm:text-lg md:text-xl max-w-3xl text-gray-300 leading-relaxed">
            {t('heroSubheading2')}
          </p>
        </ScrollBasedAnimation>
      </div>
    </section>
  );
};

export default Hero;
