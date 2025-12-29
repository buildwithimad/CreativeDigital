'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react'; 
import ScrollBasedAnimation from '@/components/ScrollBasedAnimation'; 

const ServicesSection = () => {
  const pathname = usePathname();
  const isAr = pathname?.includes('/ar');

  const services = [
    {
      id: "01",
      title: { en: "Web\nDevelopment", ar: "تطوير\nالمواقع" },
      desc: {
        en: "We craft immersive online experiences that blend captivating design with seamless functionality.",
        ar: "نصمم تجارب رقمية غامرة تمزج بين التصميم الجذاب والوظائف السلسة.",
      },
      action: { en: "Web Services", ar: "خدمات الويب" },
    },
     {
      id: "02",
      title: { en: "Creative\nContent", ar: "المحتوى\nالإبداعي" },
      desc: {
        en: "Compelling storytelling and content strategies that create lasting impressions.",
        ar: "سرد قصصي مقنع واستراتيجيات محتوى تخلق انطباعات دائمة.",
      },
      action: { en: "Content Services", ar: "خدمات المحتوى" },
    },
    {
      id: "03",
      title: { en: "Social\nMedia", ar: "وسائل\nالتواصل" },
      desc: {
        en: "Build and engage your community across platforms with strategies that resonate.",
        ar: "بناء وتفاعل مجتمعك عبر المنصات باستراتيجيات تترك أثراً.",
      },
      action: { en: "Social Services", ar: "خدمات التواصل" },
    },
    {
      id: "04",
      title: { en: "Digital\nMarketing", ar: "التسويق\nالرقمي" },
      desc: {
        en: "Discover unparalleled growth with clever marketing campaigns that elevate engagement.",
        ar: "اكتشف نمواً لا مثيل له مع حملات تسويقية ذكية ترفع من معدل التفاعل.",
      },
      action: { en: "Marketing Services", ar: "خدمات التسويق" },
    },
    {
      id: "05",
      title: { en: "Visual\nProduction", ar: "الإنتاج\nالمرئي" },
      desc: {
        en: "Elevate your brand's essence by crafting a visual symphony that makes your brand memorable.",
        ar: "ارتقِ بجوهر علامتك التجارية من خلال صياغة سيمفونية بصرية تجعل علامتك لا تُنسى.",
      },
      action: { en: "Production Services", ar: "خدمات الإنتاج" },
    },
    {
      id: "06",
      title: { en: "Influencer\nMarketing", ar: "تسويق\nالمؤثرين" },
      desc: {
        en: "Connect with authentic voices to amplify your brand message to the right audience.",
        ar: "تواصل مع أصوات حقيقية لتعزيز رسالة علامتك التجارية للجمهور المناسب.",
      },
      action: { en: "Influencer Services", ar: "خدمات المؤثرين" },
    },
  ];

  const servicesSlice = services.slice(0,3);

  // OPTIMIZED TRANSITIONS
  const smoothTransition = "transition-transform duration-500 ease-out will-change-transform";
  
  // Static Gradients for borders
  const borderGradientHorizontal = "bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20"; 
  const borderGradientVertical = "bg-gradient-to-b from-blue-500/20 via-blue-500/20 to-purple-500/20"; 

  return (
    <section 
      className="relative w-full py-12 md:py-24 bg-secondary text-white overflow-hidden" 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 md:mb-24 relative z-10">
          <ScrollBasedAnimation direction="up">
             <p className="text-xs md:text-base text-white/60 mb-3 md:mb-4 tracking-wider uppercase">
               {isAr ? "ماذا نقدم" : "What We Do"}
             </p>
             <h2 className="text-3xl md:text-5xl font-light max-w-3xl leading-tight text-white">
               {isAr 
                 ? "أطلق العنان لخيالك مع حلولنا الإبداعية." 
                 : "Let your imagination meet our creative solutions."}
             </h2>
          </ScrollBasedAnimation>
        </div>

        {/* MODERN GRID SYSTEM */}
        <div className="flex flex-wrap relative transform-gpu">
          
          {/* Main Grid Lines */}
          <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />
          <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical} z-20`} />

          {servicesSlice.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative w-full md:w-1/2 lg:w-1/3 overflow-hidden"
            >
              
              {/* Item Grid Lines */}
              <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />
              <div className={`absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20`} />

              {/* --- BACKGROUND HOVER GRADIENT --- */}
              {/* Replaced Image with pure CSS Gradient. 
                  Using opacity transition allows for 60fps performance without layout thrashing. */}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(0, 0, 0, 0) 100%)'
                }}
              />
              
              {/* Additional corner glow for depth (optional, keeping it subtle) */}
               <div 
                className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" 
              />

              <ScrollBasedAnimation 
                delay={index * 0.05} 
                direction="up"
                className="h-full"
              >
                {/* CARD CONTENT */}
                <div className="h-full min-h-[320px] md:min-h-[450px] p-6 md:p-12 flex flex-col justify-between relative z-10 transform-gpu">
                  
                  {/* Top Section */}
                  <div className="relative z-20">
                    <h3 className={`text-3xl md:text-5xl font-normal leading-[1.1] mb-4 md:mb-6 tracking-tight whitespace-pre-line text-white ${smoothTransition} group-hover:-translate-y-2`}>
                      {isAr ? service.title.ar : service.title.en}
                    </h3>
                    
                    <p className={`text-sm md:text-base text-white/60 font-light leading-relaxed max-w-sm transition-colors duration-500 group-hover:text-white/90`}>
                      {isAr ? service.desc.ar : service.desc.en}
                    </p>
                  </div>

                  {/* Bottom Section: Pill Button */}
                  <div className="mt-8 md:mt-12 relative z-20">
                    <button className="flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 text-xs md:text-sm tracking-wide uppercase text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                      {isAr ? service.action.ar : service.action.en}
                      <ArrowUpRight className={`w-3.5 h-3.5 md:w-4 md:h-4 ${smoothTransition} ${isAr ? 'group-hover:-translate-x-1 group-hover:-translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                    </button>
                  </div>

                </div>
              </ScrollBasedAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;