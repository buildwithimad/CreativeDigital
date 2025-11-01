'use client';
import React from 'react';
import ScrollBasedAnimation from '../components/ScrollBasedAnimation';

const NotFound = () => {
  return (
    <section className="relative w-full h-[700px] overflow-hidden text-white bg-black">

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-12 py-20 md:py-0 text-center md:text-left">

        {/* Heading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-3xl md:max-w-4xl">
            404 <span className="text-accent">Not Found</span>
          </h1>
        </ScrollBasedAnimation>

        {/* Subheading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-4 md:mb-6 opacity-90">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-md sm:text-lg md:text-xl max-w-3xl text-gray-300 leading-relaxed">
            It seems you've ventured into uncharted territory. Let's get you back on track.
          </p>
        </ScrollBasedAnimation>

        {/* Call to Action */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.4}>
          <a
            href="/"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-accent-dark transition-colors duration-300"
          >
            Go Home
          </a>
        </ScrollBasedAnimation>

      </div>
    </section>
  );
};

export default NotFound;