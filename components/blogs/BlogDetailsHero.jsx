'use client';
import React from 'react';
import Image from 'next/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

const BlogDetailsHero = ({ blog }) => {
  return (
    <section className="relative w-full h-[700px] overflow-hidden text-white">

     

      {/* Blog Image Overlay */}
      <div className="fixed top-0 left-0 w-full h-full object-cover z-0">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-80"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-12 py-20 md:py-0 text-center md:text-left max-w-5xl mx-auto">

        {/* Category */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <div className="mb-4">
            <span className="bg-accent text-black px-4 py-2 rounded-full text-sm font-semibold">
              {blog.category}
            </span>
          </div>
        </ScrollBasedAnimation>

        {/* Title */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-3xl md:max-w-4xl">
            {blog.title}
          </h1>
        </ScrollBasedAnimation>

        {/* Meta Information */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center">
              <span className="text-sm">{blog.date}</span>
            </div>
            <div className="flex items-center">
              <span className="mx-2">•</span>
              <span className="text-sm">{blog.readTime}</span>
            </div>
            <div className="flex items-center">
              <span className="mx-2">•</span>
              <span className="text-sm">By CreativeDigital</span>
            </div>
          </div>
        </ScrollBasedAnimation>

      </div>
    </section>
  );
};

export default BlogDetailsHero;