import React from 'react';
import { client } from '@/sanity/lib/client';
import { BLOG_DETAIL_QUERY, BLOG_NAV_QUERY } from '@/sanity/queries/blogs';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';
import Link from 'next/link';
import CTASection from '@/components/home/CallToAction';

export const revalidate = 60;

/* -------------------------------------------------------
   1. SEO METADATA (ARABIC – FULL)
------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) {
    return {
      title: 'المقال غير موجود',
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seo?.metaTitleAr || blog.titleAr;
  const description =
    blog.seo?.metaDescriptionAr ||
    blog.introductionAr?.slice(0, 160);

  const canonicalUrl = `https://www.creativeedigital.com/ar/blogs/${slug}`;
  const enUrl = `https://www.creativeedigital.com/en/blogs/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: canonicalUrl,
        en: enUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Creative Digital',
      type: 'article',
      locale: 'ar_SA',
      alternateLocale: 'en_US',
      images: blog.mainImage?.asset?.url
        ? [{ url: blog.mainImage.asset.url }]
        : [],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.mainImage?.asset?.url
        ? [blog.mainImage.asset.url]
        : [],
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

  if (!blog) {
    return (
      <div
        className="min-h-screen bg-black text-white flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-gray-400 mb-8">
            عذراً، لم نتمكن من العثور على المقال الذي تبحث عنه.
          </p>
          <Link
            href="/ar/blogs"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
          >
            العودة إلى المدونة
          </Link>
        </div>
      </div>
    );
  }

  /* -------- FETCH NAV BLOGS -------- */
  const allBlogs = await client.fetch(BLOG_NAV_QUERY);
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);

  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  /* -------- RENDER -------- */
  return (
    <>
    {/* ✅ Article Schema (Arabic – Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',

      headline: blog.titleAr,
      description: blog.seo?.metaDescriptionAr || blog.introductionAr,
      image: blog.mainImage?.asset?.url || '',

      // 🔹 NEW (SEO Enhancements)
      isAccessibleForFree: true,
      inLanguage: 'ar',

      datePublished: blog.publishedAt,
      dateModified: blog._updatedAt,

      author: {
        '@type': 'Organization',
        name: 'Creative Digital',
        url: 'https://www.creativeedigital.com',
      },

      publisher: {
        '@type': 'Organization',
        name: 'Creative Digital',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.creativeedigital.com/logo.png',
        },
      },

      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.creativeedigital.com/ar/blogs/${slug}`,
      },
    }),
  }}
/>


      <BlogDetailsHero blog={blog} />
      <BlogDetailsContent
        blog={blog}
        prevBlog={prevBlog}
        nextBlog={nextBlog}
      />
      <CTASection/>
    </>
  );
}
