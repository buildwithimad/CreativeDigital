import React from 'react';
import { client } from '@/sanity/lib/client';
import {
  BLOG_BY_SLUG_QUERY,
  BLOG_NAV_QUERY,} from '@/sanity/queries/blogs';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';
import Link from 'next/link';
import { categoryTitles } from '@/utils/categories';

export const revalidate = 300; // Revalidate every 60 seconds


export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  /* -------- FETCH BLOG -------- */
  const blog = await client.fetch(BLOG_BY_SLUG_QUERY, { 
    slug 
    });

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link
            href="/blogs"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  /* -------- CATEGORY TITLE -------- */
  blog.categoryTitle =
    categoryTitles?.[blog.category] || blog.category;

  /* -------- FETCH NAV BLOGS -------- */
  const allBlogs = await client.fetch(BLOG_NAV_QUERY);
  const currentIndex = allBlogs.findIndex(
    (b) => b.slug === slug
  );

  const prevBlog =
    currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  const nextBlog =
    currentIndex < allBlogs.length - 1
      ? allBlogs[currentIndex + 1]
      : null;

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