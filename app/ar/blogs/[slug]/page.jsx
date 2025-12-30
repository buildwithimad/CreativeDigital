import React from 'react';
import { client } from '@/sanity/lib/client';
import { BLOG_DETAIL_QUERY, BLOG_NAV_QUERY } from '@/sanity/queries/blogs';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

/* -------------------------------------------------------
   1. SEO METADATA (ARABIC)
------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) return { title: 'المقال غير موجود' };

  // Prioritize SEO fields, fallback to main Arabic content
  const title = blog.seo?.metaTitleAr || blog.titleAr;
  const description = blog.seo?.metaDescriptionAr || blog.introductionAr;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: blog.mainImage?.asset?.url ? [{ url: blog.mainImage.asset.url }] : [],
      locale: 'ar_SA',
    },
  };
}

/* -------------------------------------------------------
   2. MAIN PAGE COMPONENT
------------------------------------------------------- */
export default async function ArabicBlogDetailsPage({ params }) {
  const { slug } = await params;

  /* -------- FETCH BLOG -------- */
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  // Arabic 404 State
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-gray-400 mb-8">عذراً، لم نتمكن من العثور على المقال الذي تبحث عنه.</p>
          <Link
            href="/ar/blogs"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
          >
            العودة للمدونة
          </Link>
        </div>
      </div>
    );
  }

  /* -------- FETCH NAV BLOGS -------- */
  const allBlogs = await client.fetch(BLOG_NAV_QUERY);
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);

  // Determine Prev/Next logic
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  /* -------- RENDER -------- */
  return (
    <>
      <BlogDetailsHero blog={blog} />
      <BlogDetailsContent
        blog={blog}
        prevBlog={prevBlog}
        nextBlog={nextBlog}
      />
    </>
  );
}