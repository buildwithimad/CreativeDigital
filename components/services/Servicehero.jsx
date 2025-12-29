'use client';

import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

const ServicesHero = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section
      className="relative bg-secondary w-full h-[85vh] min-h-[600px] overflow-hidden text-white flex items-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- BACKGROUND VIDEO --- */}
      {/* Using absolute to ensure it stays contained within this section */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60"
          src="https://www.pexels.com/download/video/8084623/"
          autoPlay
          loop
          muted
          playsInline
        />
        
        
       
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-20">
        
        <div className="max-w-4xl">
          

            {/* Main Headline */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-8xl font-light tracking-tighter leading-[0.9] text-white mb-8">
                    {isArabic ? (
                         <>
                            نصنع <span className="text-accent">المستقبل</span> <br/>
                            <span className="font-light text-white/80">الرقمي</span>
                         </>
                    ) : (
                        <>
                            Engineering <br />
                            <span className="text-accent">Digital</span> Excellence
                        </>
                    )}
                </h1>
            </ScrollBasedAnimation>

            {/* Subtext */}
            <ScrollBasedAnimation direction="up" delay={0.3}>
                <p className="text-base md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                    {isArabic 
                        ? 'حلول استراتيجية مبتكرة تجمع بين الإبداع والتكنولوجيا لتحقيق نمو استثنائي لعلامتك التجارية.'
                        : 'Strategic innovative solutions combining creativity and technology to drive exceptional growth for your brand.'
                    }
                </p>
            </ScrollBasedAnimation>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/50" />
      </div>

    </section>
  );
};

export default ServicesHero;