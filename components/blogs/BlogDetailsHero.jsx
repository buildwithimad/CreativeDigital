'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function BlogDetailsHero({ blog }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  console.log("BlogDetailsHero Image:", blog.images?.[0]);

  const heroImage = blog.images?.[0];

  return (
    <section
      className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Image */}
      {heroImage && (
        <Image
          src={heroImage.asset.url}
          alt={isArabic ? blog.titleAr : blog.title}
          fill
          priority
          className="object-cover opacity-70"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-5xl px-6 md:px-12 pb-16">
          {/* Category */}
          <span className="text-accent text-xs uppercase tracking-[0.25em] mb-4 block">
            {blog.categoryTitle}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
            {isArabic ? blog.titleAr : blog.title}
          </h1>

          {/* Date */}
          {blog.publishedAt && (
            <p className="mt-4 text-gray-400 text-sm">
              {new Date(blog.publishedAt).toLocaleDateString(
                isArabic ? 'ar-SA' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
