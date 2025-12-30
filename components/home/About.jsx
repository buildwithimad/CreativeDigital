'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const content = {
  en: {
    label: 'Who We Are',
    title: 'We Create...\nYou Grow.',
    description: "Creative Digital is not just a marketing agency; we are your strategic partner in the digital realm. We combine data-driven strategies with cutting-edge design to ensure your business doesn't just survive, but dominates the market.",
    cta: 'Start Your Journey',
  },
  ar: {
    label: 'من نحن',
    title: 'نخلق الإبداع...\nلتنمو أعمالك.',
    description: "كريتيف ديجيتال ليست مجرد وكالة تسويق؛ نحن شريكك الاستراتيجي في العالم الرقمي. نجمع بين الاستراتيجيات المبنية على البيانات والتصاميم المبتكرة لضمان ألا تنجو أعمالك فحسب، بل لتتصدر السوق بقوة.",
    cta: 'ابدأ رحلتك معنا',
  },
};

const AboutSection = () => {
  const pathname = usePathname();
  const isArabic = pathname?.includes('/ar');
  const t = isArabic ? content.ar : content.en;
  
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  // 1. Define the "Element8" Gradient Lines
  const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 
  const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-secondary text-white"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- LAYER 0: BACKGROUND IMAGE & OVERLAYS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Image - Lowered Opacity to blend with "Dark Mode" aesthetic */}
        <Image 
          src="https://res.cloudinary.com/dlsudrq9q/image/upload/v1766929210/pic-2_locq2r.png"
          alt="Creative Digital Office"
          fill
          className="object-cover opacity-50  transition-all duration-[2000ms]" 
          priority
        />

    
        
        {/* Top and Bottom Fades for section blending */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#06091c] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#06091c] to-transparent" />
      </div>



      {/* --- LAYER 2: CONTENT CONTAINER WITH GRID LINES --- */}
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-0">
        
        {/* THE GRID FRAME */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT SIDE */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="relative p-8 md:p-12"
          >
            {/* GRID LINES FOR TEXT BOX */}
            <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal}`} />
            <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal}`} />
            <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical}`} />
            {/* Right border only on mobile/tablet, removed on desktop to "open" towards image */}
            <div className={`lg:hidden absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical}`} />

            {/* Label */}
            <motion.span variants={fadeInUp} className="text-accent font-light tracking-widest uppercase text-sm flex items-center gap-3 mb-6">
               {/* Small dot instead of line for cleaner look */}
               <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
              {t.label}
            </motion.span>

            {/* Headline */}
            <motion.h2 variants={fadeInUp} className="text-5xl lg:text-7xl font-light leading-[1.1] mb-8 tracking-tight whitespace-pre-line">
              {t.title}
            </motion.h2>

            {/* Description */}
            <motion.p variants={fadeInUp} className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-lg mb-10">
              {t.description}
            </motion.p>

         

          </motion.div>

          {/* IMAGE/VOID SIDE */}
          <div className="hidden lg:block h-full min-h-[600px] relative">
             {/* Center vertical line dividing text and empty space */}
             <div className={`absolute top-0 ${isArabic ? 'right-0' : 'left-0'} h-full w-[1px] ${borderGradientVertical}`} />
             
             {/* Horizontal lines continuing from text side */}
             <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} opacity-50`} />
             <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} opacity-50`} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;