'use client';

import React from 'react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

const ContactHero = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section
      className="relative w-full bg-secondary h-[90vh] min-h-screen overflow-hidden text-white"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* ---------------- 1. FIXED VIDEO BACKGROUND ---------------- */}
      {/* "fixed" position creates a smooth parallax effect with 0 JS overhead */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="fixed top-0 left-0 w-full h-full object-cover opacity-60"
          // Swapped for a more abstract/tech "connection" video
          src="https://www.pexels.com/download/video/8084619/"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* ---------------- 2. CREATIVE OVERLAYS ---------------- */}
      

      {/* ---------------- 3. CONTENT ---------------- */}
      <div className="relative z-20 h-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28">
        
      

        {/* Main Title */}
        <div className="max-w-6xl">
          <ScrollBasedAnimation direction="up" delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] mb-8">
              {isArabic ? (
                <>لنصنع شيئاً <span className="text-accent block">استثنائياً.</span></>
              ) : (
                <>Let’s create <span className="text-accent block md:inline">impact.</span></>
              )}
            </h1>
          </ScrollBasedAnimation>

          <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-t border-white/10 pt-8 mt-8">
            {/* Description */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                {isArabic
                  ? 'هل لديك فكرة مشروع؟ أم تبحث عن شريك رقمي استراتيجي؟ نحن هنا لتحويل رؤيتك إلى واقع رقمي ملموس.'
                  : 'Have a project in mind? Or looking for a strategic digital partner? We are here to turn your vision into a digital reality.'}
              </p>
            </ScrollBasedAnimation>

            {/* Scroll Indicator */}
            <ScrollBasedAnimation direction="up" delay={0.3}>
              <div className="flex items-center gap-4 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                <span className="hidden md:block text-xs uppercase tracking-[0.2em]">
                  {isArabic ? 'تواصل معنا' : 'Get in Touch'}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowDown size={20} className="animate-bounce" />
                </div>
              </div>
            </ScrollBasedAnimation>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactHero;