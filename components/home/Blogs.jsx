'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import { useTranslation } from 'react-i18next';

const BlogCard = ({ blog, index }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <ScrollBasedAnimation direction="up" offset={50} delay={0.1 * index}>
      <Link href={`/blogs/${blog.slug?.current}`} className="block group">
        <div className="relative overflow-hidden bg-zinc-900/50 border border-zinc-800/50 hover:border-[#6EFF33]/50 transition-all duration-500 h-full">
          {/* Image Container */}
          <div className="relative w-full h-64 overflow-hidden bg-zinc-950">
            <Image
              src={blog.images?.asset?.url || '/placeholder.jpg'}
              alt={isArabic ? blog.titleAr : blog.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-3">
            {/* Title */}
            <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 group-hover:text-[#6EFF33] transition-colors duration-300">
              {isArabic ? blog.titleAr : blog.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {isArabic ? blog.introductionAr : blog.introduction}
            </p>

            {/* Read More Indicator */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[#6EFF33] text-sm font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                Read More
              </span>
              <svg 
                className="w-4 h-4 text-[#6EFF33] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Top Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#6EFF33]/10 transform translate-x-10 -translate-y-10 rotate-45 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500" />
        </div>
      </Link>
    </ScrollBasedAnimation>
  );
};

const Blogs = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsQuery = groq`
        *[_type == "blogs"] | order(publishedAt desc)[0...6] {
          _id,
          title,
          titleAr,
          slug,
          introduction,
          introductionAr,
          images[0]{
            asset->{
              url
            }
          }
        }
      `;

      try {
        const data = await client.fetch(blogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(110,255,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(110,255,51,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-16">
          <ScrollBasedAnimation direction="up" offset={50} delay={0}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#6EFF33]" />
              <span className="text-[#6EFF33] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
                {t("blogs")}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#6EFF33]" />
            </div>
          </ScrollBasedAnimation>

          <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              {t("latest")} <span className="text-[#6EFF33] inline-block">{t("blog-post")}</span>
            </h1>
          </ScrollBasedAnimation>

          <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed">
              {t("blogDescription")}
            </p>
          </ScrollBasedAnimation>
        </div>

        {/* Blogs Grid */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <ScrollBasedAnimation direction="up" offset={50}>
            <Link 
              href='/blogs' 
              className="group relative inline-flex items-center gap-3 bg-[#6EFF33] text-black font-bold px-10 py-4 text-base uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-[#6EFF33] border-2 border-[#6EFF33]"
            >
              <span className="relative z-10">{t("viewBlogs")}</span>
              <svg 
                className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-[#6EFF33] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
            </Link>
          </ScrollBasedAnimation>
        </div>
      </div>
    </section>
  );
};

export default Blogs;