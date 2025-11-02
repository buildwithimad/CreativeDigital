'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';

const BlogContent = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Web Development in Saudi Arabia",
      excerpt: "Exploring emerging technologies and trends shaping the digital landscape in the Kingdom.",
      date: "2024-11-01",
      readTime: "5 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Technology"
    },
    {
      id: 2,
      title: "Digital Marketing Strategies for Local Businesses",
      excerpt: "Proven tactics to boost your online presence and drive customer engagement.",
      date: "2024-10-28",
      readTime: "7 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Building Responsive Websites with Modern Frameworks",
      excerpt: "A comprehensive guide to creating mobile-first websites using React and Next.js.",
      date: "2024-10-25",
      readTime: "6 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Development"
    },
    {
      id: 4,
      title: "SEO Best Practices for 2024",
      excerpt: "Master the latest search engine optimization techniques to improve your website ranking.",
      date: "2024-10-22",
      readTime: "8 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "SEO"
    },
    {
      id: 5,
      title: "The Power of Social Media Marketing",
      excerpt: "Leverage social platforms to build brand awareness and engage with your audience.",
      date: "2024-10-19",
      readTime: "6 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Marketing"
    },
    {
      id: 6,
      title: "E-commerce Solutions for Small Businesses",
      excerpt: "Transform your retail business with modern online selling platforms and strategies.",
      date: "2024-10-16",
      readTime: "7 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "E-commerce"
    },
    {
      id: 7,
      title: "Mobile App Development Trends",
      excerpt: "Stay ahead with the latest mobile application development technologies and frameworks.",
      date: "2024-10-13",
      readTime: "5 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Development"
    },
    {
      id: 8,
      title: "Data Analytics for Business Growth",
      excerpt: "Use data-driven insights to make informed decisions and optimize your business performance.",
      date: "2024-10-10",
      readTime: "9 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Analytics"
    },
    {
      id: 9,
      title: "Cybersecurity Essentials for Modern Businesses",
      excerpt: "Protect your digital assets with comprehensive security measures and best practices.",
      date: "2024-10-07",
      readTime: "6 min read",
      image: "https://res.cloudinary.com/ddpamvx3l/image/upload/v1761990112/Gemini_Generated_Image_uezf6uezf6uezf6u-min_qudcgm.png",
      category: "Security"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 max-w-[1400px] mx-auto bg-black relative z-30 px-8 md:px-12">
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Latest <span className="text-accent">Blog Posts</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Insights, tips, and stories from the world of digital innovation
          </p>
        </div>
      </ScrollBasedAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog, idx) => (
          <ScrollBasedAnimation key={blog.id} direction="up" offset={50} delay={0.1 * idx}>
            <article className="bg-gray-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 flex-shrink-0">
                  {blog.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/blogs/${blog.id}`} className="text-accent hover:text-green-400 font-semibold transition-colors duration-200">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          </ScrollBasedAnimation>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <ScrollBasedAnimation direction="up" offset={50} delay={0.5}>
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 transition-all duration-300 rounded-lg"
            >
              ← Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-accent text-black'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 transition-all duration-300 rounded-lg"
            >
              Next →
            </button>
          </div>
        </ScrollBasedAnimation>
      )}
    </section>
  );
};

export default BlogContent;