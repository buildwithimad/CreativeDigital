'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

/* ================= Data ================= */
const servicesData = [
  {
    id: "01",
    title: { en: "Web Development", ar: "تطوير المواقع" },
    desc: {
      en: "We craft immersive online experiences that blend captivating design with seamless functionality.",
      ar: "نصمم تجارب رقمية غامرة تمزج بين التصميم الجذاب والوظائف السلسة.",
    },
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: "02",
    title: { en: "Creative Content", ar: "المحتوى الإبداعي" },
    desc: {
      en: "Compelling storytelling and content strategies that create lasting impressions.",
      ar: "سرد قصصي مقنع واستراتيجيات محتوى تخلق انطباعات دائمة.",
    },
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    title: { en: "Social Media", ar: "وسائل التواصل" },
    desc: {
      en: "Build and engage your community across platforms with strategies that resonate.",
      ar: "بناء وتفاعل مجتمعك عبر المنصات باستراتيجيات تترك أثراً.",
    },
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "04",
    title: { en: "Digital Marketing", ar: "التسويق الرقمي" },
    desc: {
      en: "Discover unparalleled growth with clever marketing campaigns that elevate engagement.",
      ar: "اكتشف نمواً لا مثيل له مع حملات تسويقية ذكية ترفع من معدل التفاعل.",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "05",
    title: { en: "Visual Production", ar: "الإنتاج المرئي" },
    desc: {
      en: "Elevate your brand's essence by crafting a visual symphony that makes your brand memorable.",
      ar: "ارتقِ بجوهر علامتك التجارية من خلال صياغة سيمفونية بصرية تجعل علامتك لا تُنسى.",
    },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "06",
    title: { en: "Influencer Ads", ar: "تسويق المؤثرين" },
    desc: {
      en: "Connect with authentic voices to amplify your brand message to the right audience.",
      ar: "تواصل مع أصوات حقيقية لتعزيز رسالة علامتك التجارية للجمهور المناسب.",
    },
    image: "https://images.unsplash.com/photo-1516251193000-18e6584856ed?q=80&w=1200&auto=format&fit=crop"
  },
];

/* ================= Single Service Card (Sticky) ================= */
const ServiceCard = ({ service, index, isArabic }) => {
  return (
    <div 
      // Sticky positioning for stacking effect
      className="sticky top-0 w-full h-screen md:h-[85vh] flex items-center justify-center overflow-hidden border-t border-white/10 will-change-transform transform-gpu"
      style={{ 
        zIndex: index + 1, 
      }}
    >
      {/* Top Shadow for stacking depth - simplified to simple gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#06091c] to-transparent z-20 pointer-events-none" />

      <div className="relative w-full h-full group">
        
        {/* --- 1. BACKGROUND LAYER --- */}
        <div className="absolute inset-0 z-0 bg-[#06091c]">
           
           {/* Dark Tint Layer - Optimized (No filters) */}
           <div className="absolute inset-0 bg-[#06091c]/50 z-10 pointer-events-none transition-colors duration-500 group-hover:bg-[#06091c]/40" />

           {/* Bottom Fade for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-transparent to-transparent z-10 pointer-events-none" />

           <Image
             src={service.image}
             alt={isArabic ? service.title.ar : service.title.en}
             fill
             sizes="100vw"
             // Using scale transform which is GPU accelerated
             className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 will-change-transform"
             priority={index === 0} 
             quality={90} 
           />
        </div>

        {/* --- 2. GRID LINES (Clean, No Heavy Gradients) --- */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-white/10 z-20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 z-20" />

        
        {/* --- 3. CONTENT LAYER --- */}
        <div className="relative z-30 h-full w-full flex flex-col items-center justify-end md:justify-center p-6 md:p-8 text-center pb-24 md:pb-8">
           
           {/* Top Label */}
           <div className="flex items-center gap-3 md:gap-4 mb-6">
             <div className="h-[1px] w-8 md:w-12 bg-white/30" />
             <span className="text-sm md:text-base font-bold tracking-[0.2em] text-white/70 uppercase">
               {isArabic ? `خدمة / ${service.id}` : `Service / ${service.id}`}
             </span>
             <div className="h-[1px] w-8 md:w-12 bg-white/30" />
           </div>

           {/* Title - Clean text, no shadows */}
           <ScrollBasedAnimation direction="up">
             <h3 className="text-4xl md:text-7xl font-light text-white leading-[1] mb-6 md:mb-8 tracking-tighter">
               {isArabic ? service.title.ar : service.title.en}
             </h3>
           </ScrollBasedAnimation>

           {/* Description */}
           <ScrollBasedAnimation direction="up" delay={0.1}>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
              {isArabic ? service.desc.ar : service.desc.en}
            </p>
           </ScrollBasedAnimation>

           {/* Action Button - Optimized (No blur, simple border) */}
           <ScrollBasedAnimation direction="up" delay={0.2}>
              <button className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:border-white hover:scale-110 group/btn">
                 <ArrowUpRight className={`w-6 h-6 md:w-8 md:h-8 text-white transition-colors duration-300 group-hover/btn:text-black ${isArabic ? 'scale-x-[-1]' : ''}`} />
              </button>
           </ScrollBasedAnimation>

        </div>

      </div>
    </div>
  );
};

/* ================== Main Services Page Component ================== */
export default function ServicesPageContent() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section className="bg-secondary relative" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Intro Header */}
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto text-center relative z-10">
        <ScrollBasedAnimation direction="up">
          <div className="flex items-center justify-center gap-3 mb-4">
             <span className="w-8 h-[1px] bg-accent" />
             <p className="text-xs md:text-sm text-accent tracking-widest uppercase font-bold">
               {isArabic ? "ماذا نقدم" : "What We Do"}
             </p>
             <span className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="text-5xl md:text-8xl font-light text-white leading-tight mb-6">
            {isArabic ? (
                <>حلولنا <span className="text-accent font-normal">الإبداعية</span></>
            ) : (
                <>Our <span className="text-accent font-normal">Services</span></>
            )}
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light">
            {isArabic
                ? 'مجموعة متكاملة من الخدمات الرقمية المصممة لرفع مستوى علامتك التجارية.'
                : 'A comprehensive suite of digital services designed to elevate your brand presence.'}
          </p>
        </ScrollBasedAnimation>
      </div>

      {/* The Sticky Container - Items stack on top of each other */}
      <div className="relative w-full">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              isArabic={isArabic}
            />
          ))}
      </div>

    </section>
  );
}