'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import WorkHero from '../../components/work/WorkHero';

const projects = [
  {
    id: 1,
    title: 'Brand Identity',
    thumbnail: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 2,
    title: 'Digital Campaign',
    thumbnail: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 3,
    title: 'Web Design',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 4,
    title: 'Mobile App',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 5,
    title: 'E-commerce Platform',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 6,
    title: 'Social Media Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1000&q=80',
    ],
  },
];

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-[#6EFF33] hover:text-white transition-colors duration-200">
    <ChevronRight size={42} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-[#6EFF33] hover:text-white transition-colors duration-200">
    <ChevronLeft size={42} />
  </button>
);

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeGallery = () => setSelectedProject(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    appendDots: (dots) => <div><ul className="!m-0 flex justify-center gap-2 mt-4">{dots}</ul></div>,
    customPaging: () => <div className="w-3 h-3 rounded-full bg-gray-400 hover:bg-[#6EFF33] transition-all" />,
  };

  return (
    <>
      <WorkHero />
      <section className="py-20 bg-black/50 relative z-30 w-full">
        <div className="px-0">

        {/* Projects Grid - NO gaps, NO rounded corners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollBasedAnimation key={project.id} direction="up" offset={80} delay={index * 0.1}>
              <div
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer overflow-hidden"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={500}
                  height={400}
                  className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.title}
                  </h3>
                </div>
              </div>
            </ScrollBasedAnimation>
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-60 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 text-white hover:text-[#6EFF33] transition-colors duration-200"
              aria-label="Close Gallery"
            >
              <X size={38} />
            </button>

            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-[#6EFF33] mb-6 text-center"
            >
              {selectedProject.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-5xl px-0"
            >
              <Slider {...sliderSettings}>
                {selectedProject.gallery.map((img, i) => (
                  <div key={i} className="flex justify-center">
                    <Image
                      src={img}
                      alt={`${selectedProject.title} image ${i + 1}`}
                      width={1200}
                      height={700}
                      className="object-cover max-h-[75vh] mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  </>
);
};

export default Work;
