'use client';

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ArrowRight, Quote, Sparkles, Minus } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';

// -------------------------------------------------------
// 1. CREATIVE STYLE ENGINE (Rich Text Components)
// -------------------------------------------------------
const RichTextComponents = {
  block: {
    // H2: Big, Bold, with a decorative accent line
    h2: ({ children }) => (
      <div className="mt-20 mb-8 relative group">
        <span className="absolute -left-6 top-2 w-1 h-8 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden" />
        <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-tight">
          {children}
        </h2>
      </div>
    ),
    // H3: Elegant Subheaders
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-light text-accent mt-12 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-accent/50 inline-block" />
        {children}
      </h3>
    ),
    // Normal Text: High readability, slight tint
    normal: ({ children }) => (
      <p className="text-gray-300 text-lg md:text-xl leading-[2] mb-8 font-light tracking-wide">
        {children}
      </p>
    ),
    // Blockquotes: Glassmorphism Card
    blockquote: ({ children }) => (
      <div className="relative my-16">
        <div className="absolute inset-0 bg-accent/5 blur-xl rounded-full" />
        <blockquote className="relative border-l-2 border-accent bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 rounded-r-2xl">
          <Quote className="text-accent mb-4 opacity-80" size={32} />
          <p className="text-2xl md:text-3xl text-white font-light italic leading-relaxed">
            "{children}"
          </p>
        </blockquote>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-4 mb-10 ml-2 md:ml-6">
        {React.Children.map(children, (child, i) => (
          <li className="flex gap-4 items-start text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span>{child}</span>
          </li>
        ))}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-4 mb-10 ml-6 list-decimal marker:text-accent marker:font-bold text-gray-300 text-lg md:text-xl font-light leading-relaxed">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-20 group relative">
           {/* Glow Effect behind image */}
           <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700" />
           
           <div className="relative w-full h-[400px] md:h-[700px] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl">
             <NextImage
               src={urlFor(value).width(1200).url()}
               alt={value.alt || 'Blog Content Image'}
               fill
               className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
             />
           </div>
           {value.caption && (
             <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 font-mono">
                <Minus size={12} className="text-accent" />
                {value.caption}
             </div>
           )}
        </div>
      );
    },
  },
};

export default function BlogDetailsContent({ blog, prevBlog, nextBlog }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  if (!blog) return null;

  const introduction = isArabic ? blog.introductionAr : blog.introduction;
  const content = isArabic ? blog.contentAr : blog.content;

  return (
    <article
      className="bg-secondary text-white min-h-screen relative overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- AMBIENT BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {/* ---------------- 1. EDITORIAL INTRODUCTION ---------------- */}
        {introduction && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex flex-col gap-6">
              <Sparkles className="text-accent w-8 h-8 opacity-80" />
              <p className={`text-2xl md:text-4xl text-white font-light leading-[1.6] tracking-wide ${isArabic ? 'font-arabic' : ''}`}>
                <span className="text-accent font-serif text-5xl md:text-6xl float-left mr-3 mt-[-10px] opacity-80">
                  {introduction.charAt(0)}
                </span>
                {introduction.slice(1)}
              </p>
            </div>
            
            {/* Elegant Divider */}
            <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="w-2 h-2 rotate-45 border border-white" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </motion.div>
        )}

        {/* ---------------- 2. MAIN CONTENT ---------------- */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="min-h-[200px]"
        >
           {content && content.length > 0 ? (
             <PortableText value={content} components={RichTextComponents} />
           ) : (
             <div className="text-white/40 italic py-20 border border-dashed border-white/10 rounded-xl text-center bg-white/[0.02]">
               {isArabic ? "لا يوجد محتوى." : "Content coming soon."}
             </div>
           )}
        </motion.div>

        {/* ---------------- 3. NEXT / PREV NAVIGATION ---------------- */}
        <div className="mt-40 border-t border-white/10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            
            {/* Previous Card */}
            {prevBlog ? (
              <Link
                href={isArabic ? `/ar/blogs/${prevBlog.slug}` : `/en/blogs/${prevBlog.slug}`}
                className="group relative flex flex-col justify-between p-8 md:p-10 h-full border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-accent/50 hover:bg-white/[0.05] transition-all duration-500 rounded-2xl overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div>
                  <span className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-accent/80 mb-6">
                    <ArrowLeft size={14} className={isArabic ? 'rotate-180' : ''} />
                    {isArabic ? 'المقال السابق' : 'Previous Read'}
                  </span>
                  <h4 className="text-xl md:text-2xl font-light text-white group-hover:text-accent transition-colors duration-300 leading-snug line-clamp-3">
                    {isArabic ? prevBlog.titleAr : prevBlog.title}
                  </h4>
                </div>
                
                <div className={`mt-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300 ${isArabic ? 'self-end' : 'self-start'}`}>
                   <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
                </div>
              </Link>
            ) : <div className="hidden md:block" />}

            {/* Next Card */}
            {nextBlog && (
              <Link
                href={isArabic ? `/ar/blogs/${nextBlog.slug}` : `/en/blogs/${nextBlog.slug}`}
                className={`group relative flex flex-col justify-between p-8 md:p-10 h-full border border-white/10 bg-gradient-to-bl from-white/[0.03] to-transparent hover:border-accent/50 hover:bg-white/[0.05] transition-all duration-500 rounded-2xl overflow-hidden ${isArabic ? 'text-right' : 'text-right'}`}
              >
                {/* Hover Glow */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div>
                  <span className={`flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-accent/80 mb-6 ${isArabic ? 'justify-start' : 'justify-end'}`}>
                    {isArabic ? 'المقال التالي' : 'Next Read'}
                    <ArrowRight size={14} className={isArabic ? 'rotate-180' : ''} />
                  </span>
                  <h4 className="text-xl md:text-2xl font-light text-white group-hover:text-accent transition-colors duration-300 leading-snug line-clamp-3">
                    {isArabic ? nextBlog.titleAr : nextBlog.title}
                  </h4>
                </div>

                <div className={`mt-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300 ${isArabic ? 'self-start' : 'self-end'}`}>
                   <ArrowRight size={20} className={isArabic ? 'rotate-180' : ''} />
                </div>
              </Link>
            )}
            
          </div>
        </div>

      </div>
    </article>
  );
}