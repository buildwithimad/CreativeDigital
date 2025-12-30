'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import ScrollBasedAnimation from '@/components/ScrollBasedAnimation'; 

// Static Gradients (Zero performance cost)
const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 
const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

/* ================== Single Card Component ================== */
const ProjectCard = ({ project, index, isArabic }) => {
  // Safe Access to Data
  const title = isArabic ? project.titleAr : project.title;
  const category = isArabic ? project.categoryAr : project.category;
  const imageUrl = project.thumbnail?.asset?.url || '';
  const slug = project.slug?.current || project.slug; // Handle different slug shapes

  return (
    <div 
      className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden border-t border-white/10 will-change-transform transform-gpu"
      style={{ 
        zIndex: index + 1, 
        backgroundColor: '#000', 
      }}
    >
      {/* Depth Shadow Gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#06091c] to-transparent z-20 pointer-events-none" />

      <div className="relative w-full h-full group">
        
        {/* --- 1. BACKGROUND IMAGE LAYER --- */}
        <div className="absolute inset-0 z-0 bg-secondary">
           {/* Static Dark Overlay */}
           <div className="absolute inset-0 bg-[#06091c]/40 z-10 pointer-events-none" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-transparent to-[#06091c] z-10 pointer-events-none" />

           {imageUrl && (
             <Image
               src={imageUrl}
               alt={title || "Project Thumbnail"}
               fill
               sizes="(max-width: 768px) 100vw, 100vw"
               className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 will-change-transform"
               priority={index === 0} 
               quality={80}
             />
           )}
        </div>

        {/* --- 2. GRID LINES (Static CSS) --- */}
        <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20 opacity-30`} />
        <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical} z-20 opacity-30`} />
        <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20 opacity-30`} />
        <div className={`absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20 opacity-30`} />

        
        {/* --- 3. CENTERED CONTENT LAYER --- */}
        <div className="relative z-30 h-full w-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
           
           {/* Meta Info: Category Only (Removed ID) */}
           <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
             <div className="h-[1px] w-8 md:w-12 bg-accent" />
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent uppercase">
               {category}
             </span>
             <div className="h-[1px] w-8 md:w-12 bg-accent" />
           </div>

           {/* BIG TITLE */}
           <ScrollBasedAnimation direction="up">
             <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter whitespace-pre-line drop-shadow-lg">
               {title}
             </h3>
           </ScrollBasedAnimation>

           {/* ACTION BUTTON */}
           <div className="mt-2 md:mt-4">
             <Link 
               href={isArabic ? `/ar/work` : `/en/work`} 
               className="group/btn inline-flex items-center gap-3 md:gap-4"
             >
                {/* Pill Text */}
                <div className="relative overflow-hidden rounded-full border border-white/20 bg-black/40 px-6 py-3 md:px-10 md:py-5 group-hover/btn:bg-white group-hover/btn:border-white transition-colors duration-300">
                  <span className="relative z-10 text-xs md:text-sm font-medium tracking-widest uppercase text-white group-hover/btn:text-black transition-colors duration-300">
                    {isArabic ? ' عرض جالي ' : 'View Galley'}
                  </span>
                </div>

                {/* Circle Arrow */}
                <div className="p-3 md:p-5 rounded-full border border-white/20 bg-black/40 group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-300">
                   <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-white group-hover/btn:text-black group-hover/btn:rotate-45 transition-transform duration-300" />
                </div>
             </Link>
           </div>

        </div>

        {/* Lightweight Texture Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-10"
          style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '100px 100px'
          }} 
        />

      </div>
    </div>
  );
};

/* ================== Main Section ================== */
const CaseStudies = ({ work }) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar'); // Fixed logic for accurate language detection
  const container = useRef(null);

  const workslice = work;

  return (
    <section ref={container} className="bg-secondary relative" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Intro Header */}
      <div className="py-16 md:py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <ScrollBasedAnimation direction="up">
          <p className="text-xs md:text-base text-white/60 mb-3 md:mb-4 tracking-wider uppercase">
             {isArabic ? "أعمالنا المختارة" : "Selected Works"}
          </p>
          <h2 className="text-3xl md:text-6xl font-light text-white leading-tight">
            {isArabic 
              ? "نصنع تجارب رقمية " 
              : "Crafting Digital "}
             <span className="text-accent">
               {isArabic ? "استثنائية" : "Excellence"}
             </span>
          </h2>
        </ScrollBasedAnimation>
      </div>

      {/* The Sticky Container */}
      <div className="relative w-full">
        {workslice && workslice.length > 0 ? (
          workslice.map((project, index) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              index={index} 
              isArabic={isArabic}
            />
          ))
        ) : (
          <div className="py-20 text-center text-white/50">
             {isArabic ? "لا توجد مشاريع حالياً" : "No projects available at the moment."}
          </div>
        )}
      </div>

    </section>
  );
};

export default CaseStudies;