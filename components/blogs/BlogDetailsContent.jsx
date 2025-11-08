'use client';
import React from 'react';
import Image from 'next/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BlogDetailsContent = ({ blog, prevBlog, nextBlog }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  // Extra images after the header
  const extraImages = blog.images?.slice(1, 3) || [];

  return (
    <section className={`py-20 max-w-7xl mx-auto bg-black relative z-30 px-8 md:px-12 ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Introduction */}
      <ScrollBasedAnimation direction="up" offset={50}>
        <p className={`text-gray-300 text-lg leading-relaxed mb-10 ${isArabic ? 'text-right' : 'text-left first-letter:text-4xl first-letter:font-bold first-letter:text-accent first-letter:mr-2 first-letter:float-left'}`}>
          {isArabic ? blog.introductionAr : blog.introduction}
        </p>
      </ScrollBasedAnimation>

      {/* Sections */}
      {blog.sections?.map((section, idx) => (
        <React.Fragment key={idx}>
          <ScrollBasedAnimation direction="up" offset={50}>
            <div className={`mb-12 ${isArabic ? 'text-right' : 'text-left'}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {isArabic ? section.titleAr : section.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {isArabic ? section.contentAr : section.content}
              </p>
            </div>
          </ScrollBasedAnimation>

          {/* Insert extra images after 2nd section and 4th section */}
          {((idx === 1 && extraImages[0]) || (idx === 3 && extraImages[1])) && (
            <ScrollBasedAnimation direction="up" offset={50}>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 my-12">
                <div className="relative w-full h-80">
                  <Image
                    src={idx === 1 ? extraImages[0].asset.url : extraImages[1]?.asset.url}
                    alt={`Blog extra image ${idx}`}
                    fill
                    className=" object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                </div>
              </div>
            </ScrollBasedAnimation>
          )}
        </React.Fragment>
      ))}

      {/* Conclusion */}
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className={`bg-gray-900 p-6 rounded-lg ${isArabic ? 'border-r-4 border-l-0' : 'border-l-4 border-r-0'} border-accent`}>
          <p className={`text-gray-300 leading-relaxed italic ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? blog.conclusionAr : blog.conclusion}
          </p>
        </div>
      </ScrollBasedAnimation>

      {/* Navigation */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.3}>
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className={`flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            {prevBlog ? (
              <Link href={`/blogs/${prevBlog.slug}`} className="group flex-1">
                <div className={`bg-gray-900 hover:bg-gray-800 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-accent ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center text-accent group-hover:text-green-400 transition-colors duration-200 mb-3 ${isArabic ? 'justify-end flex-row-reverse' : ''}`}>
                    <span className={`${isArabic ? 'ml-2 mr-0' : 'mr-2 ml-0'} text-xl`}>{isArabic ? '→' : '←'}</span>
                    <span className="text-sm font-medium">{isArabic ? 'المقالة السابقة' : 'Previous Post'}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-accent transition-colors duration-200">
                    {isArabic ? prevBlog.titleAr : prevBlog.title}
                  </h3>
                  <div className={`flex items-center mt-3 text-gray-400 text-sm ${isArabic ? 'justify-end' : 'justify-start'}`}>
                    <span>{new Date(prevBlog.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            <div className="hidden md:block w-px h-16 bg-gray-700 mx-4"></div>

            {nextBlog ? (
              <Link href={`/blogs/${nextBlog.slug}`} className="group flex-1">
                <div className={`bg-gray-900 hover:bg-gray-800 p-6 rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-accent ${isArabic ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-end text-accent group-hover:text-green-400 transition-colors duration-200 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">{isArabic ? 'المقالة التالية' : 'Next Post'}</span>
                    <span className={`${isArabic ? 'mr-2 ml-0' : 'ml-2 mr-0'} text-xl`}>{isArabic ? '←' : '→'}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-tight text-right group-hover:text-accent transition-colors duration-200">
                    {isArabic ? nextBlog.titleAr : nextBlog.title}
                  </h3>
                  <div className="flex items-center justify-end mt-3 text-gray-400 text-sm">
                    <span>{new Date(nextBlog.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </div>
      </ScrollBasedAnimation>

      {/* Back to Blogs */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.4}>
        <div className="text-center mt-16">
          <Link
            href="/blogs"
            className={`inline-flex items-center bg-accent hover:bg-green-500 text-black font-semibold py-4 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <span className={`${isArabic ? 'ml-2 mr-0' : 'mr-2 ml-0'}`}>{isArabic ? '→' : '←'}</span>
            {isArabic ? 'العودة إلى المدونة' : 'Back to All Blogs'}
          </Link>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default BlogDetailsContent;
