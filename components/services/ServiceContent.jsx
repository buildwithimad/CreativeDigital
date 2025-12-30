'use client';

import React from 'react';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Import Link
import { usePathname } from 'next/navigation';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

/* ================= Single Service Card (Sticky) ================= */
const ServiceCard = ({ service, index, isArabic }) => {
  const displayId = String(index + 1).padStart(2, '0');
  const imageUrl = service.mainImage?.asset?.url || '';
  
  // 2. Construct the URL based on language
  // Assuming your Sanity query returns "slug": slug.current
  const slug = service.slug; 
  const href = isArabic ? `/ar/services/${slug}` : `/en/services/${slug}`;

  return (
    <div 
      className="sticky top-0 w-full h-screen md:h-[85vh] flex items-center justify-center overflow-hidden border-t border-white/10 will-change-transform transform-gpu"
      style={{ zIndex: index + 1 }}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#06091c] to-transparent z-20 pointer-events-none" />

      <div className="relative w-full h-full group">
        <div className="absolute inset-0 z-0 bg-[#06091c]">
           <div className="absolute inset-0 bg-[#06091c]/50 z-10 pointer-events-none transition-colors duration-500 group-hover:bg-[#06091c]/40" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-transparent to-transparent z-10 pointer-events-none" />
           {imageUrl && (
             <Image
               src={imageUrl}
               alt={isArabic ? service.titleAr : service.title}
               fill
               sizes="100vw"
               className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 will-change-transform"
               priority={index === 0} 
               quality={90} 
             />
           )}
        </div>

        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-white/10 z-20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 z-20" />

        <div className="relative z-30 h-full w-full flex flex-col items-center justify-end md:justify-center p-6 md:p-8 text-center pb-24 md:pb-8">
           <div className="flex items-center gap-3 md:gap-4 mb-6">
             <div className="h-[1px] w-8 md:w-12 bg-white/30" />
             <span className="text-sm md:text-base font-bold tracking-[0.2em] text-white/70 uppercase">
               {isArabic ? `خدمة / ${displayId}` : `Service / ${displayId}`}
             </span>
             <div className="h-[1px] w-8 md:w-12 bg-white/30" />
           </div>

           <ScrollBasedAnimation direction="up">
             <h3 className="text-4xl md:text-7xl font-light text-white leading-[1] mb-6 md:mb-8 tracking-tighter">
               {isArabic ? service.titleAr : service.title}
             </h3>
           </ScrollBasedAnimation>

           <ScrollBasedAnimation direction="up" delay={0.1}>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
              {isArabic ? service.excerptAr : service.excerpt}
            </p>
           </ScrollBasedAnimation>

           {/* 3. Replaced <button> with <Link> to wrap the arrow */}
           <ScrollBasedAnimation direction="up" delay={0.2}>
              <Link 
                href={href}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:border-white hover:scale-110 group/btn"
              >
                 <ArrowUpRight className={`w-6 h-6 md:w-8 md:h-8 text-white transition-colors duration-300 group-hover/btn:text-black ${isArabic ? 'scale-x-[-1]' : ''}`} />
              </Link>
           </ScrollBasedAnimation>
        </div>
      </div>
    </div>
  );
};

/* ================== Main Services Page Component ================== */
export default function ServicesPageContent({ services = [] }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section className="bg-secondary relative min-h-screen flex flex-col" dir={isArabic ? 'rtl' : 'ltr'}>
      
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

      {/* Logic: Check if services exist */}
      {services && services.length > 0 ? (
        <div className="relative w-full">
            {services.map((service, index) => (
              <ServiceCard 
                key={service._id} 
                service={service} 
                index={index} 
                isArabic={isArabic}
              />
            ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-start pt-10 pb-32 px-4">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-white/40" />
           </div>
           <h3 className="text-2xl md:text-3xl text-white font-light mb-3 text-center">
             {isArabic ? "الخدمات غير متاحة حالياً" : "Services Currently Not Available"}
           </h3>
           <p className="text-white/40 text-center max-w-md font-light">
             {isArabic 
               ? "نحن نعمل على تحديث قائمة خدماتنا. يرجى التحقق مرة أخرى قريباً."
               : "We are currently updating our service list. Please check back soon."}
           </p>
        </div>
      )}

    </section>
  );
}