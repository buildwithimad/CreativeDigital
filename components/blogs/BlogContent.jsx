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
  // UPDATED: Show 4 posts (Perfect 2x2 grid)
  const postsPerPage = 4; 
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 border-b border-white/10 pb-6 flex justify-between items-end">
          <ScrollBasedAnimation direction="up">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              {isArabic ? 'المزيد من المقالات' : 'More Insights'}
            </h2>
          </ScrollBasedAnimation>
          <span className="hidden md:block text-white/30 font-mono text-sm tracking-widest">
            PAGE {currentPage} / {totalPages}
          </span>
        </div>

        {/* ---------------- GRID (Creative 2-Column) ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {currentBlogs.map((blog, idx) => {
             const date = new Date(blog.publishedAt).toLocaleDateString(
                isArabic ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }
             );

             // ------------------------------------------------
             // SAFE IMAGE RESOLVER (Supports New & Old Schema)
             // ------------------------------------------------
             // 1. Try 'mainImage' (New Schema)
             // 2. Try 'images[0]' (Old Schema Array)
             // 3. Try 'images' (Old Schema Object)
             const imageObj = blog.mainImage || (Array.isArray(blog.images) ? blog.images[0] : blog.images);
             
             let imageUrl = '/placeholder.jpg';
             
             if (imageObj) {
               try {
                 imageUrl = urlFor(imageObj)
                   .width(1000) // High res for large cards
                   .height(600)
                   .quality(95)
                   .fit('crop')
                   .url();
               } catch (e) {
                 if (imageObj?.asset?.url) {
                    imageUrl = imageObj.asset.url;
                 }
               }
             }

             // Category Display
             const categoryName = (categoryTitles && categoryTitles[blog.category]) || blog.category || (isArabic ? 'عام' : 'General');
             
             return (
              <ScrollBasedAnimation
                key={blog._id}
                direction="up"
                delay={idx * 0.15} // Slower stagger for smoothness
                className="group flex flex-col h-full"
              >
                <Link
                  href={isArabic ? `/ar/blogs/${blog.slug}` : `/en/blogs/${blog.slug}`}
                  className="block h-full"
                >
                  {/* --- IMAGE CONTAINER --- */}
                  <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-[#0a0a0a] mb-8 border border-white/5 rounded-sm">
                    {/* Dark overlay that fades on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    
                    <Image
                      src={imageUrl}
                      alt={isArabic ? blog.titleAr : blog.title}
                      fill
                      className="object-cover transform-gpu transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105 will-change-transform opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Floating Category Tag */}
                    <div className="absolute top-4 left-4 z-20">
                       <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border border-white/10 rounded-full">
                          {categoryName}
                       </span>
                    </div>
                  </div>

                  {/* --- CONTENT --- */}
                  <div className="flex flex-col flex-grow pr-2">
                    {/* Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-[1px] bg-accent/50" />
                      <span className="text-white/60 text-xs font-mono tracking-widest uppercase">
                        {date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-4xl font-light text-white mb-4 leading-tight group-hover:text-accent transition-colors duration-500 line-clamp-2">
                      {isArabic ? blog.titleAr : blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed line-clamp-2 mb-6 font-light opacity-80 group-hover:opacity-100 transition-opacity">
                      {isArabic ? blog.introductionAr : blog.introduction}
                    </p>

                    {/* Button */}
                    <div className="mt-auto inline-flex items-center gap-2 text-white text-xs md:text-sm font-bold uppercase tracking-[0.15em] group-hover:text-accent transition-colors">
                      {isArabic ? 'اقرأ المزيد' : 'Read Article'}
                      <ArrowUpRight size={16} className={`transition-transform duration-500 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`} />
                    </div>
                  </div>
                </Link>
              </ScrollBasedAnimation>
            );
          })}
        </div>

        {/* ---------------- PAGINATION (Minimalist) ---------------- */}
        {totalPages > 1 && (
          <div className="mt-24 pt-12 border-t border-white/10 flex justify-center items-center gap-8">
             <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-white/50 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                {isArabic ? 'السابق' : 'Prev'}
              </button>
              
              {/* Dots for pages */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'bg-accent w-6' : 'bg-white/20'}`} 
                  />
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-white/50 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest text-xs font-bold"
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