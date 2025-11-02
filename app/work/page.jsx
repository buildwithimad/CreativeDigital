'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import WorkHero from '../../components/work/WorkHero';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';

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
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const closeGallery = () => setSelectedProject(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // 🔹 Fetch projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "work"]{
          _id,
          title,
          "thumbnail": thumbnail.asset->url,
          "gallery": gallery[].asset->url
        }`);
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
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

  if (!projects.length) return <p className="text-white text-center py-20">Loading projects...</p>;

  return (
    <>
      <WorkHero />
      <section className="py-20 bg-black/50 relative z-30 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollBasedAnimation key={project._id} direction="up" offset={80} delay={index * 0.1}>
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
