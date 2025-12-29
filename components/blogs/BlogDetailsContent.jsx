'use client';

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollBasedAnimation from '../../components/ScrollBasedAnimation';
import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export default function BlogDetailsContent({ blog, prevBlog, nextBlog }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  // -------------------------------------------------------
  // 1. HELPER: Robust Image Resolver
  // -------------------------------------------------------
  const getImageUrl = (source, width = 1200, height = 800) => {
    if (!source) return '/placeholder.jpg';
    const imageObj = Array.isArray(source) ? source[0] : source;

    try {
      if (imageObj?.asset) {
        return urlFor(imageObj)
          .width(width)
          .height(height)
          .fit('crop')
          .quality(90)
          .auto('format')
          .url();
      }
      if (imageObj?.asset?.url) return imageObj.asset.url;
    } catch (e) {
      console.warn('Image resolution failed', e);
    }
    return '/placeholder.jpg';
  };

  // -------------------------------------------------------
  // 2. DATA RESOLVERS (Fixing the Arabic/English Logic)
  // -------------------------------------------------------
  
  // Resolve simple text fields based on language
  const introduction = isArabic ? blog.introductionAr : blog.introduction;
  const conclusion = isArabic ? blog.conclusionAr : blog.conclusion;

  // Resolve Sections:
  // If Arabic, use 'sectionsAr' array. If English, use 'sections' array.
  // Fallback: If strict Arabic array is empty, default to English array (optional safety)
  const sectionsSource = isArabic 
    ? (blog.sectionsAr?.length ? blog.sectionsAr : []) 
    : (blog.sections || []);

  return (
    <article
      className="bg-secondary text-white min-h-screen relative overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {/* ---------------- 1. INTRODUCTION ---------------- */}
        {introduction && (
          <ScrollBasedAnimation direction="up">
            <div className="mb-20">
              <p className={`text-2xl md:text-3xl text-gray-200 leading-[1.6] font-light border-accent py-2 ${isArabic ? 'border-r-2 pr-6' : 'border-l-2 pl-6'}`}>
                {introduction}
              </p>
            </div>
          </ScrollBasedAnimation>
        )}

        {/* ---------------- 2. SECTIONS (Fixed Mapping) ---------------- */}
        <div className="space-y-16">
          {sectionsSource.map((section, index) => (
            <ScrollBasedAnimation key={section._key || index} direction="up" delay={index * 0.05}>
              <div className="group">
                {/* Fix: Schema uses 'title', NOT 'heading'. 
                   We check section.title (standard) or section.titleAr (if user put arabic in english array by mistake)
                */}
                {(section.title || (isArabic && section.titleAr)) && (
                  <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {isArabic && section.titleAr ? section.titleAr : section.title}
                  </h2>
                )}

                {/* Fix: Schema uses 'content'.
                */}
                {(section.content || (isArabic && section.contentAr)) && (
                  <div className="text-gray-300 leading-[1.8] text-lg md:text-xl font-light whitespace-pre-line">
                    {isArabic && section.contentAr ? section.contentAr : section.content}
                  </div>
                )}
              </div>
            </ScrollBasedAnimation>
          ))}
        </div>

        {/* ---------------- 3. VISUAL GALLERY ---------------- */}
        {blog.images && blog.images.length > 1 && (
          <div className="my-24">
            <ScrollBasedAnimation direction="up">
              <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-8">
                {isArabic ? 'معرض الصور' : 'Visual Gallery'}
              </h3>
            </ScrollBasedAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog.images.slice(1).map((img, index) => (
                <ScrollBasedAnimation 
                  key={img._key || index} 
                  direction="up" 
                  delay={index * 0.1}
                  className={index % 3 === 0 ? "md:col-span-2" : ""}
                >
                  <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-sm bg-[#111] border border-white/5">
                    <NextImage
                      src={getImageUrl(img, 1200, 800)}
                      alt="Blog Visual"
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-out hover:scale-105 will-change-transform"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollBasedAnimation>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 4. CONCLUSION ---------------- */}
        {conclusion && (
          <ScrollBasedAnimation direction="up">
            <div className="mt-24 p-8 md:p-12 bg-white/5 border border-white/10 rounded-lg relative overflow-hidden">
              <Quote className={`absolute top-8 text-white/5 w-24 h-24 ${isArabic ? 'left-8' : 'right-8 rotate-180'}`} />
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 relative z-10">
                {isArabic ? 'الخلاصة' : 'Conclusion'}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                {conclusion}
              </p>
            </div>
          </ScrollBasedAnimation>
        )}

        {/* ---------------- 5. NAVIGATION FOOTER ---------------- */}
        <div className="mt-32 border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Previous Post */}
            {prevBlog ? (
              <Link
                href={isArabic ? `/ar/blogs/${prevBlog.slug}` : `/en/blogs/${prevBlog.slug}`}
                className="group relative flex flex-col p-8 border border-white/10 hover:border-accent/50 bg-[#0a0a0a] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 group-hover:text-accent mb-4 relative z-10">
                  <ArrowLeft size={14} className={isArabic ? 'rotate-180' : ''} />
                  {isArabic ? 'المقال السابق' : 'Previous Article'}
                </span>
                
                <h4 className="text-xl font-medium text-white group-hover:underline decoration-accent underline-offset-4 relative z-10 line-clamp-2">
                  {isArabic ? prevBlog.titleAr : prevBlog.title}
                </h4>
              </Link>
            ) : <div />}

            {/* Next Post */}
            {nextBlog && (
              <Link
                href={isArabic ? `/ar/blogs/${nextBlog.slug}` : `/en/blogs/${nextBlog.slug}`}
                className={`group relative flex flex-col p-8 border border-white/10 hover:border-accent/50 bg-[#0a0a0a] transition-all duration-300 overflow-hidden ${isArabic ? 'text-right items-start' : 'text-right items-end'}`}
              >
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 group-hover:text-accent mb-4 relative z-10">
                  {isArabic ? 'المقال التالي' : 'Next Article'}
                  <ArrowRight size={14} className={isArabic ? 'rotate-180' : ''} />
                </span>
                
                <h4 className="text-xl font-medium text-white group-hover:underline decoration-accent underline-offset-4 relative z-10 line-clamp-2">
                  {isArabic ? nextBlog.titleAr : nextBlog.title}
                </h4>
              </Link>
            )}
            
          </div>
        </div>

      </div>
    </article>
  );
}