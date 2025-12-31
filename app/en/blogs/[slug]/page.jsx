import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { BLOG_DETAIL_QUERY, BLOG_NAV_QUERY } from '@/sanity/queries/blogs';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';
import CTASection from '@/components/home/CallToAction';

export const revalidate = 60; // Revalidate every 1 minute

/* -------------------------------------------------------
   1. SEO METADATA (ENGLISH – FULL)
------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) {
    return {
      title: 'Blog Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = blog.seo?.metaTitle || blog.title;
  const description =
    blog.seo?.metaDescription ||
    blog.introduction?.slice(0, 160);

  const canonicalUrl = `https://www.creativeedigital.com/en/blogs/${slug}`;
  const arUrl = `https://www.creativeedigital.com/ar/blogs/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ar: arUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Creative Digital',
      type: 'article',
      locale: 'en_US',
      alternateLocale: 'ar_SA',
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
export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  /* -------- FETCH BLOG -------- */
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) {
    notFound();
  }

  /* -------- FETCH NAV BLOGS -------- */
  const allBlogs = await client.fetch(BLOG_NAV_QUERY);
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);

  // Newest-first navigation
  const nextBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const prevBlog =
    currentIndex < allBlogs.length - 1
      ? allBlogs[currentIndex + 1]
      : null;

  /* -------- RENDER -------- */
  return (
    <>
     {/* ✅ Article Schema (English – Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',

      headline: blog.title,
      description: blog.seo?.metaDescription || blog.introduction,
      image: blog.mainImage?.asset?.url || '',

      // 🔹 NEW (Good SEO Signals)
      isAccessibleForFree: true,
      inLanguage: 'en',

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
        '@id': `https://www.creativeedigital.com/en/blogs/${slug}`,
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
      <CTASection />
    </>
  );
}
