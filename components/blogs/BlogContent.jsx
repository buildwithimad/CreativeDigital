'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity'; // ✅ Import groq for the query
import { categoryTitles } from '../../utils/categories';
import { useTranslation } from 'react-i18next';


const BlogContent = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [blogs, setBlogs] = useState([]);

  // 🔹 Fetch blogs from Sanity
  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogsQuery = groq`
        *[_type == "blogs"] | order(publishedAt desc) {
          _id,
          title,
          titleAr,
          slug,
          introduction,
          introductionAr,
          category,
          publishedAt,
          images[0]{
            asset->{
              url
            }
          }
        }
      `;

      try {
        const data = await client.fetch(allBlogsQuery);
        setBlogs(data);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination
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
    <section className="py-20 w-full mx-auto bg-black relative z-30 px-8 md:px-12">
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("latest")} <span className="text-accent">{t("blog-post")}</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            {t("blogDescription")}
           
          </p>
        </div>
      </ScrollBasedAnimation>

      {/* 📰 Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog, idx) => (
          <ScrollBasedAnimation
            key={blog._id}
            direction="up"
            offset={50}
            delay={0.1 * idx}
          >
            <article className="bg-gray-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={blog.images?.asset?.url || '/placeholder.jpg'}
                  alt={isArabic ? blog.titleAr : blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">
  {categoryTitles[blog.category] || blog.category}
</div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 flex-shrink-0">
                  {isArabic ? blog.titleAr : blog.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {isArabic ? blog.introductionAr : blog.introduction}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/blogs/${blog.slug?.current}`}
                    className="text-accent hover:text-green-400 font-semibold transition-colors duration-200"
                  >
                    {t("read-more")} →
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
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 transition-all duration-300"
            >
              ← Previous
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 font-semibold transition-all duration-300 ${
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
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 transition-all duration-300"
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
