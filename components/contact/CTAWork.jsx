'use client';
import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import Link from 'next/link';

const CTAViewWork = () => {
  return (
    <section className="bg-black/60 relative py-20 w-full">
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="max-w-6xl mx-auto text-center px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to See What We Can Do?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Explore our portfolio and discover how CreativeDigital brings ideas to life.
          </p>
          <Link href="/portfolio">
            <button className="bg-accent hover:bg-accent/90 text-black font-semibold py-3 px-8 transition-all duration-300 transform hover:scale-105">
              View Our Work
            </button>
          </Link>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default CTAViewWork;
