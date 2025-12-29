'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { urlFor } from '@/sanity/lib/image';
import dynamic from 'next/dynamic';

/* ---------------- SLIDER (SSR SAFE) ---------------- */
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="h-[70vh] flex items-center justify-center text-white/20">Loading Gallery...</div>
});

/* ---------------- CUSTOM ARROWS ---------------- */
const NextArrow = ({ onClick, isArabic }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-50 p-4 group ${
      isArabic ? 'left-2 md:left-8' : 'right-2 md:right-8'
    }`}
  >
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/10 bg-[#06091c] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl rounded-full">
      <ChevronRight size={28} className={isArabic ? 'rotate-180' : ''} />
    </div>
  </button>
);

const PrevArrow = ({ onClick, isArabic }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-50 p-4 group ${
      isArabic ? 'right-2 md:right-8' : 'left-2 md:left-8'
    }`}
  >
    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/10 bg-[#06091c] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl rounded-full">
      <ChevronLeft size={28} className={isArabic ? 'rotate-180' : ''} />
    </div>
  </button>
);

/* ---------------- MODAL VARIANTS ---------------- */
const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'linear' }, // Fast, linear fade is best for modals
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function WorkClient({ projects }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const [selectedProject, setSelectedProject] = useState(null);
  const [sliderReady, setSliderReady] = useState(false);

  /* ---------------- LOCK BODY SCROLL ---------------- */
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSliderReady(false); // Reset slider state on close
    }
    return () => (document.body.style.overflow = 'unset');
  }, [selectedProject]);

  /* ---------------- ESC KEY ---------------- */
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && setSelectedProject(null);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow isArabic={isArabic} />,
    prevArrow: <PrevArrow isArabic={isArabic} />,
    cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    lazyLoad: 'ondemand',
  };

  if (!projects?.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-secondary text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen relative selection:bg-accent selection:text-white">

      {/* STATIC NOISE TEXTURE (Premium Feel, 0% CPU Cost) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* ---------------- HEADER SECTION ---------------- */}
      <section className="pt-32 pb-20 px-6 md:px-12 relative z-10" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="max-w-4xl">
            <ScrollBasedAnimation direction="up">
              <div className="flex items-center gap-4 mb-6">
                
              </div>
              
              <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-[0.9]">
                {isArabic ? (
                  <>أعمالنا <span className="text-accent">المميزة</span></>
                ) : (
                  <>Case <span className="text-accent">Studies</span></>
                )}
              </h1>
            </ScrollBasedAnimation>
          </div>

          <div className="max-w-md hidden md:block pb-2">
             <ScrollBasedAnimation direction="up" delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed">
                {isArabic 
                  ? 'استكشف مجموعة مختارة من مشاريعنا التي تجسد التميز والابتكار في كل تفصيلة.'
                  : 'Explore a curated collection of our work that embody excellence and innovation in every detail.'}
              </p>
            </ScrollBasedAnimation>
          </div>

        </div>
      </section>

      {/* ---------------- GRID SECTION ---------------- */}
      <section className="relative z-10" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full p-6">
          {projects.map((project, index) => (
            <ScrollBasedAnimation
              key={project._id}
              direction="up"
              delay={index * 0.05}
              className="w-full"
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group relative w-full aspect-[4/3] md:aspect-[4/4] overflow-hidden cursor-pointer bg-secondary"
              >
                {/* 1. IMAGE LAYER */}
                <div className="absolute inset-0">
                  <Image
                    src={project.thumbnail ? urlFor(project.thumbnail).url() : '/placeholder.jpg'}
                    alt={isArabic ? project.titleAr : project.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-[0.22,1,0.36,1] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                

                {/* 3. CONTENT LAYER */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                  
               

                 
                </div>
              </div>
            </ScrollBasedAnimation>
          ))}
        </div>
      </section>

      {/* ---------------- FULLSCREEN MODAL ---------------- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={() => setSliderReady(true)}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 bg-[#050505] z-50">
              <div>
                <h2 className="text-2xl md:text-4xl font-medium text-white tracking-tight">
                  {isArabic ? selectedProject.titleAr : selectedProject.title}
                </h2>
                <span className="text-accent text-xs uppercase tracking-widest mt-1 block">
                  {isArabic ? 'معرض الصور' : 'Project Gallery'}
                </span>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="group flex items-center gap-4 text-white hover:text-accent transition-colors"
              >
                <span className="uppercase text-xs tracking-widest hidden md:block opacity-50 group-hover:opacity-100">
                   {isArabic ? 'إغلاق' : 'Close'}
                </span>
                <div className="w-12 h-12 border border-white/20 group-hover:border-accent group-hover:bg-accent group-hover:text-black rounded-full flex items-center justify-center transition-all duration-300">
                  <X size={20} />
                </div>
              </button>
            </div>

            {/* Main Slider Area */}
            <div className="flex-1 relative flex items-center justify-center bg-[#050505] w-full overflow-hidden">
               {sliderReady ? (
                 <div className="w-full h-full max-w-[100%] md:max-w-[90%] max-h-[85vh] py-4">
                    <Slider key={selectedProject._id} {...sliderSettings} className="h-full work-slider">
                       {selectedProject.gallery?.map((img, i) => (
                         <div key={i} className="h-full px-2 outline-none">
                            <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center">
                               <Image
                                 src={urlFor(img).url()}
                                 alt="Project Detail"
                                 fill
                                 className="object-contain drop-shadow-2xl"
                                 priority={i === 0}
                                 quality={90}
                               />
                            </div>
                         </div>
                       ))}
                    </Slider>
                 </div>
               ) : (
                 /* Loading State while animation finishes */
                 <div className="flex flex-col items-center gap-4 text-white/30 animate-pulse">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
                    <span className="text-xs uppercase tracking-widest">Loading Gallery...</span>
                 </div>
               )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex justify-center bg-[#050505]">
                <div className="flex items-center gap-4">
                     <span className="h-[1px] w-8 bg-white/20" />
                     <span className="font-mono text-white/40 text-sm">
                        {selectedProject.gallery?.length || 0} {isArabic ? 'صور' : 'IMAGES'}
                     </span>
                     <span className="h-[1px] w-8 bg-white/20" />
                </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}