'use client';
import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

const ContactHero = () => {
  return (
    <section className="relative w-full h-[700px] overflow-hidden text-white">

      {/* Fixed Video Background */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.pexels.com/download/video/3573967/"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-12 py-20 md:py-0 text-center md:text-left max-w-5xl mx-auto">

        {/* Heading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-3xl md:max-w-4xl">
            Contact <span className="text-accent">Us</span>
          </h1>
        </ScrollBasedAnimation>

        {/* Subheading */}
        <ScrollBasedAnimation direction="up" offset={70} delay={0.2}>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-4 md:mb-6 opacity-90">
            Have questions or want to start a project? We'd love to hear from you.
          </p>
          <p className="text-md sm:text-lg md:text-xl max-w-3xl text-gray-300 leading-relaxed">
            Let's collaborate and create something amazing together. Reach out today and let's turn your vision into reality.
          </p>
        </ScrollBasedAnimation>

      </div>
    </section>
  );
};

export default ContactHero;