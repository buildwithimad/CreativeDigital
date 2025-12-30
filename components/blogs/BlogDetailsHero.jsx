'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { arSA, enUS } from 'date-fns/locale';
import { Calendar, Tag } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

export default function BlogDetailsHero({ blog }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  if (!blog) return null;

  // 1. Data Resolvers
  const title = isArabic ? blog.titleAr : blog.title;
  const category = isArabic ? blog.categoryAr : blog.category;
  const mainImage = blog.mainImage;

  // 2. Safe Image URL Generation
  const heroImageUrl = mainImage 
    ? urlFor(mainImage).width(1920).height(1080).fit('crop').url()
    : null;

  // 3. Date Formatting
  const dateObj = new Date(blog.publishedAt);
  const formattedDate = format(dateObj, 'MMMM dd, yyyy', {
    locale: isArabic ? arSA : enUS
  });

  return (
    <section
      className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-[#06091c]"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* --- Background Image Layer --- */}
      {heroImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
      )}

      {/* --- Gradient Overlays (For readability) --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06091c] via-[#06091c]/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091c]/60 to-transparent z-10" />

      {/* --- Content Layer --- */}
      <div className="relative z-20 h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 flex items-end">
        <div className="max-w-4xl">
          <ScrollBasedAnimation direction="up">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-mono tracking-widest uppercase text-accent/90">
              
              {/* Category Pill */}
              <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                <Tag size={14} />
                {category}
              </span>

              {/* Date */}
              <span className="flex items-center gap-2 text-white/70">
                <Calendar size={14} />
                {formattedDate}
              </span>

            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              {title}
            </h1>

          </ScrollBasedAnimation>
        </div>
      </div>
    </section>
  );
}