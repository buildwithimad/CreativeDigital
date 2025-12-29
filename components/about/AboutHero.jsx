'use client';

import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

const ABOUT_HERO_CONTENT = {
  en: {
    label: 'Who We Are',
    title: 'About CreativeDigital',
    subtitle: 'Pioneering digital innovation in Saudi Arabia.',
    description:
      'We transform ideas into impactful digital experiences. Our mission is to empower businesses with cutting-edge digital solutions that enhance brand presence, drive measurable growth, and create lasting competitive advantages in the marketplace.',
  },
  ar: {
    label: 'من نحن',
    title: 'عن كريتيف ديجيتال',
    subtitle: 'نقود الابتكار الرقمي في المملكة العربية السعودية.',
    description:
      'نحن نحول الأفكار إلى تجارب رقمية مؤثرة. مهمتنا هي تمكين الشركات بحلول رقمية متقدمة تعزز الحضور التجاري، وتحقق نموًا ملموسًا، وتخلق ميزة تنافسية مستدامة في السوق.',
  },
};

const AboutHero = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const content = isArabic ? ABOUT_HERO_CONTENT.ar : ABOUT_HERO_CONTENT.en;

  return (
    <section
      className="relative bg-secondary w-full min-h-[120vh] flex items-center justify-center overflow-hidden text-white"
      // This automatically handles the base direction (Left vs Right)
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- 1. BACKGROUND VIDEO LAYER --- */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-90"
          src="https://www.pexels.com/download/video/32880716/"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark Overlay Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
      </div>

      {/* --- 2. GRID LINES & TEXTURE --- */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* --- 3. MAIN CONTENT FRAME --- */}
      <div className="relative z-20 w-full max-w-[1400px] px-6 md:px-12 pt-20">
        
          
          <div className="flex flex-col items-start">
            
            {/* Massive Title */}
            <ScrollBasedAnimation direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-light text-white leading-[0.9] tracking-tighter mb-8">
                {isArabic ? (
                  <>عن <span className="text-accent">كريتيف</span></>
                ) : (
                  <>About <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Creative</span></>
                )}
                <br />
                {isArabic ? "ديجيتال" : "Digital"}
              </h1>
            </ScrollBasedAnimation>

            {/* Subtitle & Description */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <div className={`
                max-w-3xl
              `}>
                <h2 className="text-xl md:text-2xl text-white font-normal mb-6 leading-relaxed">
                   {content.subtitle}
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                  {content.description}
                </p>
              </div>
            </ScrollBasedAnimation>

          </div>

      

      </div>
    </section>
  );
};

export default AboutHero;