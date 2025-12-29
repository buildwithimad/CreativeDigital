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

  // Design Constants
  const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50"; 
  const borderGradientVertical = "bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-purple-500/50"; 

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* --- 1. BACKGROUND VIDEO LAYER --- */}
      {/* Fixed position creates the parallax effect where content scrolls over it */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover opacity-60" // Reduced opacity for better text contrast
          src="https://res.cloudinary.com/ddpamvx3l/video/upload/v1762354614/Hero_Website_1_qzjbww.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* Dark Overlay Gradient (Top down and Bottom up) */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* --- 2. MAIN CONTENT FRAME --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 pt-20">
        
          
        

      

          <div className={`relative z-20 flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            

            {/* Massive Heading */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tighter mb-8">
                <span className="block text-white/50 text-4xl md:text-6xl mb-2 ml-2">{content.title}</span>
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