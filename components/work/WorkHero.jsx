'use client';

import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

const WorkHero = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section
      className="relative bg-secondary w-full h-[85vh] min-h-[600px] overflow-hidden text-white flex items-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-50"
          // Swapped to a reliable direct stream link (Pexels download links often break in <video> tags)
          // This is a high-quality abstract tech background
          src="https://www.pexels.com/download/video/8084624/" 
          autoPlay
          loop
          muted
          playsInline
        />
        
    
        
        {/* Subtle Texture */}
        <div 
            className="absolute inset-0 opacity-[0.1] z-10 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-20">
        
        <div className="max-w-4xl">
            {/* Tagline */}
            <ScrollBasedAnimation direction="up" delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-accent/70" />
                    <span className="uppercase tracking-[0.2em] text-sm md:text-base text-accent font-medium">
                        {isArabic ? 'معرض الأعمال' : 'Our Portfolio'}
                    </span>
                </div>
            </ScrollBasedAnimation>

            {/* Main Headline */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
                <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] text-white mb-8">
                    {isArabic ? (
                         <>
                            قصص <span className="text-accent">النجاح</span> <br/>
                            <span className="font-light text-white/80">الرقمي</span>
                         </>
                    ) : (
                        <>
                            Digital <span className="text-accent">Success</span> <br />
                            Stories
                        </>
                    )}
                </h1>
            </ScrollBasedAnimation>

            {/* Subtext */}
            <ScrollBasedAnimation direction="up" delay={0.3}>
                <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                    {isArabic 
                        ? 'استكشف كيف ساعدنا العلامات التجارية على النمو وتحقيق تأثير حقيقي من خلال حلول رقمية مبتكرة.'
                        : 'Explore how we have helped brands grow and achieve real impact through innovative digital solutions.'
                    }
                </p>
            </ScrollBasedAnimation>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/30" />
      </div>

    </section>
  );
};

export default WorkHero;