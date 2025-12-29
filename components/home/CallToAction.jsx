'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

const CTASection = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  // Lightweight CSS Gradients for borders
  const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30"; 
  const borderGradientVertical = "bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-purple-500/30"; 

  return (
    <section
      id="cta"
      className="relative w-full py-24 lg:py-32 bg-secondary text-white overflow-hidden flex items-center justify-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- 1. PERFORMANCE OPTIMIZED BACKGROUND --- */}
      {/* Replaced heavy image/blur with CSS Radial Gradient (Zero Lag) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* --- 2. MAIN CONTENT FRAME --- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        
        {/* The Grid Box Container */}
        <div className="relative p-12 md:p-20 text-center">
          
        
          {/* Inner Content */}
          <div className="flex flex-col items-center">
            
            {/* Small Tagline */}
            <ScrollBasedAnimation direction="up">
              <span className="inline-block py-1 px-3 border border-accent rounded-full bg-purple-900/10 text-accent text-xs md:text-sm tracking-widest uppercase mb-6">
                {isArabic ? "ابدأ رحلتك" : "Start Your Journey"}
              </span>
            </ScrollBasedAnimation>

            {/* Massive Heading */}
            <ScrollBasedAnimation direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight mb-6 text-white">
                {isArabic ? "جاهز للارتقاء " : "Ready to Elevate "}
                <br className="hidden md:block" />
                {isArabic ? "بأعمالك؟" : "Your Business?"}
              </h2>
            </ScrollBasedAnimation>

            {/* Description */}
            <ScrollBasedAnimation direction="up" delay={0.2}>
              <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                {isArabic
                  ? "دعنا نساعدك في تحويل أفكارك إلى تجارب رقمية قوية تحقق نموًا حقيقيًا ومستدامًا."
                  : "Let us help you transform your ideas into powerful digital experiences that drive real and sustainable growth."}
              </p>
            </ScrollBasedAnimation>

            {/* Performance Optimized Button */}
            <ScrollBasedAnimation direction="up" delay={0.3}>
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black hover:text-primary overflow-hidden transition-transform duration-300 active:scale-95 will-change-transform"
              >
                
                <span className="relative z-10 text-sm font-bold tracking-widest uppercase">
                  {isArabic ? "ابدأ المشروع" : "Start Project"}
                </span>

                <div className="relative z-10 p-2 bg-black rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                
                {/* Lightweight Hover Fill (Transform is cheaper than width/height animation) */}
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </Link>
            </ScrollBasedAnimation>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;