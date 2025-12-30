'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

const Hero = () => {
  const pathname = usePathname();
  const isRTL = pathname?.startsWith('/ar');

  const content = {
    title: isRTL ? 'كن' : 'Be',
    accent: isRTL ? 'في كل مكان' : 'Everywhere',
    description: isRTL
      ? 'نحن نصنع تجارب رقمية تساعد علامتك التجارية على التميز والوصول إلى جمهورك أينما كانوا. بدءًا من استراتيجيات التسويق المبتكرة ووصولاً إلى تجارب المستخدم السلسة.' 
      : 'We craft digital experiences that help your brand stand out and reach your audience wherever they are. From innovative marketing strategies to seamless user experiences.',
    cta: isRTL ? 'اكتشف خدماتنا' : 'Explore Services'
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* --- 1. BACKGROUND VIDEO LAYER --- */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover opacity-60"
          src="https://res.cloudinary.com/ddpamvx3l/video/upload/v1762354614/Hero_Website_1_qzjbww.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-[#06091c]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-transparent to-black/60" />
      </div>

      {/* --- 2. MAIN CONTENT FRAME --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 pt-20">
        
        {/* Flex Container Update:
           Using 'items-start' allows the 'dir' attribute to handle alignment automatically.
           - LTR: items-start = Left
           - RTL: items-start = Right
        */}
        <div className="relative z-20 flex flex-col items-start">
            
            {/* Massive Heading */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tighter mb-8">
                {/* Changed ml-2 to ms-2 (Margin Start) for correct spacing in both languages */}
                <span className="block text-white/50 text-4xl md:text-6xl mb-2 ms-2">
                  {content.title}
                </span>
                <span className='text-accent'>
                  {content.accent}
                </span>
              </h1>
            </ScrollBasedAnimation>

            {/* Description */}
            <ScrollBasedAnimation direction="up" delay={0.3}>
              <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mb-12">
                {content.description}
              </p>
            </ScrollBasedAnimation>

        </div>
      
      </div>
    </section>
  );
};

export default Hero;