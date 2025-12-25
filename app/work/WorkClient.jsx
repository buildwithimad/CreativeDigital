'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import WorkHero from '../../components/work/WorkHero';
import Loading from '../../components/Loading';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import { useTranslation } from 'react-i18next';

const NextArrow = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-[#6EFF33] hover:text-white transition-colors duration-300 bg-black/80 p-3 border border-[#6EFF33]/30 hover:border-[#6EFF33]"
  >
    <ChevronRight size={32} strokeWidth={2.5} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-[#6EFF33] hover:text-white transition-colors duration-300 bg-black/80 p-3 border border-[#6EFF33]/30 hover:border-[#6EFF33]"
  >
    <ChevronLeft size={32} strokeWidth={2.5} />
  </button>
);

export default function WorkClient({projects}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const closeGallery = () => setSelectedProject(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);


  console.log("All projects:", projects)


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div className="mt-8">
        <ul className="!m-0 flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-600 hover:bg-[#6EFF33] transition-all duration-300 cursor-pointer" />
    ),
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!projects.length) {
    return <p className="text-white text-center py-20">No projects found.</p>;
  }

  return (
    <>
      <WorkHero />
      
      {/* Professional Header Section */}
      <section className="bg-black border-b border-[#6EFF33]/20 py-16 px-8 md:px-12 relative z-30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {isArabic ? 'أعمالنا' : 'Our Work'}
            </h1>
            <div className="w-24 h-1 bg-[#6EFF33] mb-6"></div>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              {isArabic 
                ? 'استكشف مجموعة مختارة من مشاريعنا المميزة التي تجسد التميز والابتكار في كل تفصيلة'
                : 'Explore our curated collection of premium projects that embody excellence and innovation in every detail'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-8 md:px-12 bg-black relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#6EFF33]/10">
            {projects.map((project, index) => (
              <ScrollBasedAnimation 
                key={project._id} 
                direction="up" 
                offset={80} 
                delay={index * 0.1}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group relative cursor-pointer overflow-hidden border-r border-b border-[#6EFF33]/10 aspect-[4/3]"
                >
                  <Image
                    src={project.thumbnail}
                    alt={isArabic ? project.titleAr : project.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <div className="w-12 h-0.5 bg-[#6EFF33] mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <h3 className="text-white text-xl md:text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {isArabic ? project.titleAr : project.title}
                    </h3>
                     <p className="text-gray-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {isArabic ? project.descriptionAr : project.description || 'No description available'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {isArabic ? 'عرض المشروع' : 'View Project'}
                    </p>
                  </div>
                </div>
              </ScrollBasedAnimation>
            ))}
          </div>
        </div>

        {/* Professional Fullscreen Gallery Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black z-60 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-8 right-8 text-white hover:text-[#6EFF33] transition-colors duration-300 z-50 bg-black/50 p-3 border border-white/20 hover:border-[#6EFF33]"
                aria-label="Close Gallery"
              >
                <X size={28} strokeWidth={2.5} />
              </button>

              {/* Project Title */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute top-8 left-8 z-50"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {isArabic ? selectedProject.titleAr : selectedProject.title}
                </h2>
                <div className="w-16 h-0.5 bg-[#6EFF33]"></div>
              </motion.div>

              {/* Gallery Slider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative w-full max-w-6xl px-4 mt-24"
              >
                <Slider {...sliderSettings}>
                  {selectedProject.gallery.map((img, i) => (
                    <div key={i} className="flex justify-center px-2">
                      <div className="relative w-full border border-[#6EFF33]/20">
                        <Image
                          src={img}
                          alt={`${isArabic ? selectedProject.titleAr : selectedProject.title} ${i + 1}`}
                          width={1400}
                          height={800}
                          className="object-contain max-h-[70vh] w-full"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </motion.div>

              {/* Image Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 right-8 text-gray-400 text-sm font-mono bg-black/50 px-4 py-2 border border-white/20"
              >
                {selectedProject.gallery.length} {isArabic ? 'صور' : 'Images'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}