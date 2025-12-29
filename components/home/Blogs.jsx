'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

/* ================= Gradient Config (Static CSS) ================= */
const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 
const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

/* ================= Blog Card (Optimized) ================= */
const BlogCard = ({ blog, isArabic }) => {
  return (
    <div className="group relative w-full h-full border-r border-transparent overflow-hidden">
      
      {/* 1. Grid Lines (Static - Zero Lag) */}
      <div className={`absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20`} />
      <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />

      <Link href={`${isArabic ? '/ar' : ''}/blogs/${blog.slug?.current}`} className="block h-full">
        <div className="h-full min-h-[450px] p-8 md:p-12 flex flex-col relative z-10 transition-colors duration-500 group-hover:bg-white/[0.02]">
          
          {/* Image Area - Taller for 2-column layout */}
          <div className="relative w-full h-80 mb-8 overflow-hidden bg-zinc-900/50">
              {/* Gradient Overlay for Text Contrast */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <Image
                src={blog.images?.asset?.url || '/placeholder.jpg'}
                alt={isArabic ? blog.titleAr : blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" // Optimized sizes for 2-col layout
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                quality={85}
              />
          </div>

          {/* Content Area */}
          <div className="flex-grow relative z-20 flex flex-col justify-between" dir={isArabic ? 'rtl' : 'ltr'}>
            <div>
              <span className="block text-accent text-xs tracking-widest uppercase mb-4 font-medium">
                {new Date(blog.publishedAt || Date.now()).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>

              <h3 className="text-3xl md:text-4xl font-light leading-tight text-white line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
                {isArabic ? blog.titleAr : blog.title}
              </h3>
            </div>

            <div className="mt-10 flex items-center gap-3 text-white text-sm uppercase tracking-widest group-hover:text-accent transition-colors duration-300">
              <span>{isArabic ? 'اقرأ المزيد' : 'Read Article'}</span>
              <ArrowUpRight className={`w-5 h-5 transition-transform duration-500 ${isArabic ? 'group-hover:-translate-x-1 group-hover:-translate-y-1 rotate-180' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
            </div>
          </div>

          {/* Optimized Glow (CSS Gradient) */}
          <div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.1) 0%, transparent 60%)'
            }}
          />
        </div>
      </Link>
    </div>
  );
};

/* ================= Blogs Section (Carousel) ================= */

const Blogs = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const timeoutRef = useRef(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsQuery = groq`
        *[_type == "blogs"] | order(publishedAt desc)[0...8] { // Limit to 8 for cleaner 2-col loop
          _id, title, titleAr, slug, publishedAt,
          images[0]{ asset->{ url } }
        }
      `;
      try {
        const data = await client.fetch(blogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error('❌ Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // 2. Handle Resize - UPDATED FOR 2 COLUMNS
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerView(2); // Desktop & Tablet = 2 Columns
      } else {
        setItemsPerView(1); // Mobile = 1 Column
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Auto Slide Logic
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    resetTimeout();

    if (blogs.length > itemsPerView) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === blogs.length - itemsPerView ? 0 : prevIndex + 1
        );
      }, 3500); // Slightly slower for 2-col view to allow reading
    }
    return () => resetTimeout();
  }, [currentIndex, blogs.length, itemsPerView]);

  return (
    <section className="relative w-full py-20 lg:py-32 bg-secondary overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Background Ambience - Static Gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div 
           className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10"
           style={{ background: 'radial-gradient(circle, #1e3a8a 0%, transparent 70%)' }} 
         />
         <div 
           className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-10"
           style={{ background: 'radial-gradient(circle, #581c87 0%, transparent 70%)' }} 
         />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="mb-12 md:mb-16 px-4 sm:px-0 flex justify-between items-end">
          <ScrollBasedAnimation direction="up">
             <p className="text-sm md:text-base text-white/60 mb-4 tracking-wider uppercase">
               {isArabic ? "المعرفة والرؤى" : "Knowledge & Insights"}
             </p>
             <h2 className="text-4xl md:text-6xl font-light max-w-4xl leading-tight text-white">
              {isArabic ? (
                <>آخر <span className="text-accent">تحديثاتنا</span></>
              ) : (
                <>Media <span className="text-accent">Center</span></>
              )}
             </h2>
          </ScrollBasedAnimation>

          {/* Progress Bar */}
          <div className="hidden md:block w-32 h-[1px] bg-white/10 relative overflow-hidden mb-4 rounded-full">
             <div 
               key={currentIndex} 
               className="absolute top-0 left-0 h-full bg-purple-400 w-full animate-progress origin-left will-change-transform"
               style={{ 
                 animationDuration: '3500ms', 
                 animationTimingFunction: 'linear'
               }}
             />
          </div>
        </div>

        {/* CAROUSEL FRAME */}
        <div className="relative w-full overflow-hidden border-t border-l border-transparent">
          
          {/* Static Frame Borders */}
          <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />
          <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical} z-20`} />

          {/* SLIDING TRACK - Using translate3d for GPU */}
          <div 
            className="flex will-change-transform"
            style={{ 
              transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)', 
              transform: isArabic 
                ? `translate3d(${currentIndex * (100 / itemsPerView)}%, 0, 0)` 
                : `translate3d(-${currentIndex * (100 / itemsPerView)}%, 0, 0)` 
            }}
          >
            {blogs.map((blog, index) => (
              <div 
                key={blog._id} 
                className="flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <BlogCard
                  blog={blog}
                  isArabic={isArabic}
                />
              </div>
            ))}
          </div>

        </div>

        {/* Mobile: View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href={`${isArabic ? '/ar' : ''}/blogs`}
            className="text-white text-sm uppercase tracking-widest border-b border-accent pb-1"
          >
             {isArabic ? 'عرض جميع المقالات' : 'View All Articles'}
          </Link>
        </div>

      </div>

      <style jsx global>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-progress {
          animation-name: progress;
        }
      `}</style>
    </section>
  );
};

export default Blogs;