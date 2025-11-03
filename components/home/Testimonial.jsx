'use client';
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsQuery = groq`
        *[_type == "testimonial"] {
          _id,
          name,
          role,
          feedback,
          image{
            asset->{
              url
            }
          },
          rating
        }
      `;

      try {
        const data = await client.fetch(testimonialsQuery);
        setTestimonialsData(data);
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (testimonialsData.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonialsData.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-black/90 relative overflow-hidden">
      {/* Header */}
      <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-12">
        <ScrollBasedAnimation direction="up" offset={50} delay={0}>
          <span className="text-primary text-sm sm:text-base font-bold tracking-widest uppercase mb-2 inline-block">
            {t("testimonials")}
          </span>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
            {t("whatOurClientsSay")}
          </h1>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation direction="up" offset={50} delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4">
            {t("testimonialsDescription")}
          </p>
        </ScrollBasedAnimation>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative">
        {testimonialsData.length === 0 ? (
          <div className="text-center">
            <ScrollBasedAnimation direction="up" offset={50} delay={0.3}>
              <p className="text-gray-300 text-lg md:text-xl">
                {t("noReviewsYet")}
              </p>
            </ScrollBasedAnimation>
          </div>
        ) : (
          <>
            {/* Main Testimonial Card */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialsData.map((testimonial, index) => (
                  <div key={testimonial._id || index} className="w-full flex-shrink-0">
                    <ScrollBasedAnimation direction="up" offset={50} delay={0.1}>
                      <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-8 md:p-12 mx-auto max-w-2xl">
                        {/* Header with User Info */}
                        <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-[#1a1a1a]">
                          <img
                            src={testimonial.image?.asset?.url || '/placeholder.jpg'}
                            alt={testimonial.name}
                            className="w-12 h-12 object-cover"
                            style={{ clipPath: 'circle(50%)' }}
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-400 text-sm mt-1">{testimonial.role}</p>
                          </div>
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#6EFF33] fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* Feedback */}
                        <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed">
                          {testimonial.feedback}
                        </blockquote>

                        {/* Google-like timestamp */}
                        <div className="mt-6 pt-6 border-t-2 border-[#1a1a1a]">
                          <p className="text-gray-500 text-xs">{t("verifiedReview")}</p>
                        </div>
                      </div>
                    </ScrollBasedAnimation>
                  </div>
                ))}
              </div>
            </div>

           

            {/* Dots Indicator */}
            {testimonialsData.length > 1 && (
              <div className="flex justify-center gap-3 mt-8">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-[#6EFF33] w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;