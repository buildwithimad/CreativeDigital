'use client';
import React from 'react';
import Link from 'next/link';
import ScrollBasedAnimation from '../components/ScrollBasedAnimation';

const NotFound = () => {

  return (
    <section className="relative w-full min-h-screen bg-secondary overflow-hidden">
      
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        {/* Large geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary transform rotate-45 opacity-10"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent opacity-20"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary opacity-15"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-accent transform rotate-12 opacity-25"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 h-full w-full p-8">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-primary"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6 py-20 text-center">
        
        {/* Large 404 Number */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <div className="mb-8">
            <h1 className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-bold text-primary leading-none tracking-tighter">
              404
            </h1>
            <div className="w-full h-1 bg-accent mt-4"></div>
          </div>
        </ScrollBasedAnimation>

        {/* Error Message */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              PAGE <span className="text-accent">NOT FOUND</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-primary opacity-70 leading-relaxed max-w-2xl mx-auto">
              The page you're looking for has been moved, deleted, or never existed.
            </p>
          </div>
        </ScrollBasedAnimation>

        {/* Navigation Options */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Link 
              href="/"
              className="bg-primary text-secondary px-12 py-4 font-bold text-lg uppercase tracking-wider border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300 transform hover:scale-105"
            >
              Go Home
            </Link>
            <Link 
              href="/contact"
              className="bg-accent text-secondary px-12 py-4 font-bold text-lg uppercase tracking-wider border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </ScrollBasedAnimation>

        {/* Breadcrumb Navigation */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.6}>
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-primary opacity-60">
            <Link href="/" className="hover:text-accent transition-colors duration-300 font-medium">
              HOME
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-accent transition-colors duration-300 font-medium">
              ABOUT
            </Link>
            <span>|</span>
            <Link href="/services" className="hover:text-accent transition-colors duration-300 font-medium">
              SERVICES
            </Link>
            <span>|</span>
            <Link href="/work" className="hover:text-accent transition-colors duration-300 font-medium">
              WORK
            </Link>
            <span>|</span>
            <Link href="/blogs" className="hover:text-accent transition-colors duration-300 font-medium">
              BLOGS
            </Link>
          </div>
        </ScrollBasedAnimation>

      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-2 bg-accent"></div>
        <div className="h-1 bg-secondary"></div>
      </div>

    </section>
  );
};

export default NotFound;