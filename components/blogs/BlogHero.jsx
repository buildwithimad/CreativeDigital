'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mouse } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

const BlogHero = ({ latestBlog }) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  if (!latestBlog) return null;

  const date = new Date(latestBlog.publishedAt).toLocaleDateString(
    isArabic ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  // ---------------------------------------------------------
  // 1. HIGH-QUALITY IMAGE RESOLVER
  // ---------------------------------------------------------
  const imageObj = latestBlog.mainImage || (Array.isArray(latestBlog.images) ? latestBlog.images[0] : latestBlog.images);

  let heroImage = '/placeholder.jpg';
  let blurImage = null;

  if (imageObj?.asset) {
    try {
      heroImage = urlFor(imageObj)
        .width(3840)
        .height(2160)
        .fit('crop')
        .quality(100)
        .auto('format')
        .url();

      blurImage = urlFor(imageObj).width(20).quality(20).blur(50).url();
    } catch (e) {
      console.warn("Could not generate image URL", e);
    }
  }

  return (
    <section
      // UPDATED: Changed min-h-[800px] to min-h-[600px] for mobile
      className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden bg-secondary group"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* ---------------- BACKGROUND IMAGE ---------------- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={isArabic ? latestBlog.titleAr : latestBlog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 will-change-transform"
          {...(blurImage && {
            placeholder: 'blur',
            blurDataURL: blurImage,
          })}
        />

        {/* ---------------- OVERLAYS ---------------- */}
        <div className="absolute inset-0 bg-[#06091c]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-[#06091c]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(6_9_28)_100%)] z-10" />
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="relative z-20 h-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-28">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">

          {/* TEXT CONTENT */}
          <div className="max-w-4xl w-full">
            <ScrollBasedAnimation direction="up" delay={0.1}>
              <div className="flex items-center gap-4 text-accent mb-8">
                <span className="h-[2px] w-12 bg-accent" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold shadow-black drop-shadow-md">
                  {isArabic ? 'أحدث مقال' : 'LATEST INSIGHT'} • {date}
                </span>
              </div>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-light text-white leading-[0.9] mb-8 tracking-tighter drop-shadow-lg">
                {isArabic ? latestBlog.titleAr : latestBlog.title}
              </h1>
            </ScrollBasedAnimation>

            <ScrollBasedAnimation direction="up" delay={0.4}>
              <Link
                href={
                  isArabic
                    ? `/ar/blogs/${latestBlog.slug}`
                    : `/en/blogs/${latestBlog.slug}`
                }
                className="group/btn inline-flex items-center gap-6"
              >
                <div className="h-14 px-8 border border-white/20 hover:border-accent bg-primary backdrop-blur-md rounded-full text-gray-700 flex items-center justify-center uppercase tracking-widest text-sm font-medium transition-all duration-300 group-hover/btn:bg-accent group-hover/btn:text-black group-hover/btn:border-accent">
                  {isArabic ? 'اقرأ المقال كاملاً' : 'Read Full Article'}
                </div>

                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover/btn:scale-110 group-hover/btn:border-accent group-hover/btn:text-accent transition-all duration-300 bg-black/20 backdrop-blur-sm">
                  <ArrowUpRight size={24} className={isArabic ? 'rotate-180' : ''} />
                </div>
              </Link>
            </ScrollBasedAnimation>
          </div>

          {/* SCROLL INDICATOR (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col items-center gap-4 text-white/50 animate-pulse pb-4">
            <span className="text-[10px] uppercase tracking-widest -rotate-90 origin-center translate-y-8 drop-shadow-md">
              {isArabic ? 'تصفح' : 'Scroll'}
            </span>
            <Mouse size={28} className="text-accent drop-shadow-md" />
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogHero;