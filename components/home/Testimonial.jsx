'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Testimonials = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // FETCH DATA
  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsQuery = groq`
        *[_type == "testimonial"] {
          _id,
          name,
          nameAr,
          role,
          roleAr,
          feedback,
          feedbackAr,
          image{
            asset->{ url }
          },
          rating
        }
      `;

      try {
        const data = await client.fetch(testimonialsQuery);
        setTestimonialsData(data);
      } catch (error) {
        console.error('❌ Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (testimonialsData.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === testimonialsData.length - 1 ? 0 : prev + 1
        );
      }, 6000); // Slightly slower for better readability of large text

      return () => clearInterval(interval);
    }
  }, [testimonialsData.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  // DESIGN CONSTANTS
  const borderGradientHorizontal = "bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"; 
  const borderGradientVertical = "bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20"; 

  return (
    <section className="relative w-full py-20 lg:py-32 bg-secondary text-white overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-24 px-4 sm:px-0">
          <ScrollBasedAnimation direction="up">
            <p className="text-sm md:text-base text-white/60 mb-4 tracking-wider uppercase">
              {isArabic ? "آراء العملاء" : "Testimonials"}
            </p>
            <h2 className="text-4xl md:text-6xl font-light max-w-4xl leading-tight text-white">
              {isArabic ? "قصص" : "Stories of "} <span className="text-accent">{isArabic ? "النجاح" : "Success"}</span>
            </h2>
          </ScrollBasedAnimation>
        </div>

        {/* MAIN TESTIMONIAL GRID FRAME */}
        <div className="relative w-full max-w-5xl mx-auto mt-12">
          
          {/* 1. FRAME BORDERS (The "Laser Grid") */}
          <div className={`absolute top-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />
          <div className={`absolute bottom-0 left-0 w-full h-[1px] ${borderGradientHorizontal} z-20`} />
          <div className={`absolute top-0 left-0 h-full w-[1px] ${borderGradientVertical} z-20`} />
          <div className={`absolute top-0 right-0 h-full w-[1px] ${borderGradientVertical} z-20`} />

          {/* 2. THE SLIDER CONTAINER */}
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center">
            
            {/* Ambient Glow inside the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none z-0" />

            {testimonialsData.length === 0 ? (
              <div className="w-full text-center text-white/40 p-12">
                {isArabic ? 'لا توجد مراجعات بعد' : 'No reviews yet'}
              </div>
            ) : (
              // SLIDING TRACK
              <div
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ transform: isArabic ? `translateX(${currentIndex * 100}%)` : `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialsData.map((testimonial, index) => (
                  <div key={testimonial._id || index} className="w-full flex-shrink-0 p-8 md:p-16 relative z-10">
                    
                    <div className="flex flex-col h-full justify-between gap-8 md:gap-12">
                      
                      {/* Quote Icon */}
                      <div className="text-purple-400 opacity-50">
                        <Quote size={40} className={isArabic ? "transform scale-x-[-1]" : ""} />
                      </div>

                      {/* The Quote */}
                      <blockquote className="relative">
                        <p className={`text-2xl md:text-4xl font-light leading-relaxed text-white/90 ${isArabic ? 'text-right' : 'text-left'}`}>
                          "{isArabic ? testimonial.feedbackAr || testimonial.feedback : testimonial.feedback}"
                        </p>
                      </blockquote>

                      {/* Author Info & Rating */}
                      <div className={`flex flex-col md:flex-row gap-6 items-center ${isArabic ? 'md:flex-row-reverse' : ''} border-t border-white/10 pt-8`}>
                        
                        {/* Avatar */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20">
                           <Image 
                             src={testimonial.image?.asset?.url || '/placeholder.jpg'} 
                             alt={isArabic ? testimonial.nameAr : testimonial.name}
                             fill
                             className="object-cover"
                           />
                        </div>

                        {/* Name/Role */}
                        <div className={`text-center ${isArabic ? 'md:text-right' : 'md:text-left'} flex-1`}>
                          <h4 className="text-lg font-medium text-white tracking-wide">
                            {isArabic ? testimonial.nameAr || testimonial.name : testimonial.name}
                          </h4>
                          <p className="text-sm text-accent mt-1 uppercase tracking-widest">
                            {isArabic ? testimonial.roleAr || testimonial.role : testimonial.role}
                          </p>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={16}
                              className={`${i < testimonial.rating ? 'text-accent fill-accent' : 'text-white/10'} transition-colors`} 
                            />
                          ))}
                        </div>

                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION DOTS */}
        {testimonialsData.length > 1 && (
          <div className="flex justify-center gap-4 mt-12">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-accent w-12'
                    : 'bg-white/20 w-4 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;