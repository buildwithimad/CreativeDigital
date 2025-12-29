'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { categoryTitles } from '@/utils/categories';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

const BlogContent = ({ blogs = [] }) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');


  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Safe check for document before scrolling
    if (typeof document !== 'undefined') {
      const grid = document.getElementById('blog-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!blogs.length) return null;

  return (
    <section
      id="blog-grid"
      className="py-24 w-full bg-secondary relative z-10"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <ScrollBasedAnimation direction="up">
            <h2 className="text-3xl md:text-5xl font-light text-white">
              {isArabic ? 'المزيد من المقالات' : 'More Insights'}
            </h2>
          </ScrollBasedAnimation>
          <span className="hidden md:block text-white/30 font-mono text-sm">
            PAGE {currentPage} / {totalPages}
          </span>
        </div>

        {/* ---------------- GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentBlogs.map((blog, idx) => {
             const date = new Date(blog.publishedAt).toLocaleDateString(
                isArabic ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }
             );

             // ------------------------------------------------
             // SAFE IMAGE RESOLVER
             // ------------------------------------------------
             const imageObj = Array.isArray(blog.images) ? blog.images[0] : blog.images;
             
             let imageUrl = '/placeholder.jpg';
             
             if (imageObj) {
               try {
                 imageUrl = urlFor(imageObj)
                   .width(800)
                   .height(450)
                   .quality(90)
                   .fit('crop')
                   .url();
               } catch (e) {
                 // Fallback to raw URL if available
                 if (imageObj?.asset?.url) {
                    imageUrl = imageObj.asset.url;
                 }
               }
             }
             
             return (
              <ScrollBasedAnimation
                key={blog._id}
                direction="up"
                delay={idx * 0.1}
                className="group flex flex-col h-full"
              >
                <Link
                  href={isArabic ? `/ar/blogs/${blog.slug}` : `/en/blogs/${blog.slug}`}
                  className="block h-full"
                >
                  {/* ------------------------------------------------
                     IMAGE AREA FIX:
                     Replaced aspect-[16/9] with explicit heights (h-60, h-72)
                     and added inline style as a fail-safe.
                     ------------------------------------------------
                  */}
                  <div 
                    className="relative w-full h-60 md:h-72 overflow-hidden bg-[#111] mb-8 border border-white/5"
                    style={{ aspectRatio: '16/9' }} 
                  >
                    <Image
                      src={imageUrl}
                      alt={isArabic ? blog.titleAr : blog.title}
                      fill
                      className="object-cover transform-gpu transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 will-change-transform opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                       <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-white/10">
                          {categoryTitles[blog.category] || blog.category}
                       </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-grow px-2">
                    <span className="text-accent text-xs font-mono mb-3 block">
                      {date}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 leading-snug group-hover:text-accent transition-colors duration-300">
                      {isArabic ? blog.titleAr : blog.title}
                    </h3>

                    <p className="text-gray-400 text-base leading-relaxed line-clamp-3 mb-6 font-light">
                      {isArabic ? blog.introductionAr : blog.introduction}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-white text-sm font-medium uppercase tracking-wider group-hover:text-accent transition-colors">
                      {isArabic ? 'اقرأ المزيد' : 'Read Story'}
                      <ArrowUpRight size={14} className={`transition-transform duration-300 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </Link>
              </ScrollBasedAnimation>
            );
          })}
        </div>

        {/* ---------------- PAGINATION ---------------- */}
        {totalPages > 1 && (
          <div className="mt-24 pt-12 border-t border-white/10 flex justify-center gap-2">
             <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-3 border border-white/10 text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all text-sm uppercase tracking-widest"
              >
                {isArabic ? 'السابق' : 'Prev'}
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-3 border border-white/10 text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all text-sm uppercase tracking-widest"
              >
                {isArabic ? 'التالي' : 'Next'}
              </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogContent;