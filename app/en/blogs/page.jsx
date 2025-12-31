import BlogHero from '@/components/blogs/BlogHero';
import BlogContent from '@/components/blogs/BlogContent';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

// 🔹 Professional SEO Metadata
export const metadata = {
  title: 'Blog & Insights | Web Development, SEO & Digital Marketing',
  description:
    'Explore expert insights, tutorials, and trends in web development, SEO, digital marketing, UI/UX design, and modern technologies. Practical knowledge to grow your business online.',

  alternates: {
    canonical: 'https://www.creativeedigital.com/en/blogs',
    languages: {
      'en': 'https://www.creativeedigital.com/en/blogs',
      'ar': 'https://www.creativeedigital.com/ar/blogs',
    },
  },

  openGraph: {
    title: 'Blog & Insights | Web Development, SEO & Digital Marketing',
    description:
      'Read expert-written articles on web development, SEO strategies, digital marketing, and modern business technologies.',
    url: 'https://www.creativeedigital.com/en/blogs',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | Web Development, SEO & Digital Marketing',
    description:
      'Latest articles, tutorials, and insights on web development, SEO, and digital marketing.',
  },
};


export default async function BlogsPage() {
  const blogs = await client.fetch(BLOGS_LIST_QUERY);
  const latestBlog = blogs?.[0] || null;

  return (
    <>
{/* ✅ English Blog Schema (Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Creative Digital Blog',
      url: 'https://www.creativeedigital.com/en/blogs',
      description:
        'Insights and articles about web development, SEO, digital marketing, and business growth.',
      inLanguage: 'en',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.creativeedigital.com/en/blogs',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Creative Digital',
        url: 'https://www.creativeedigital.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.creativeedigital.com/logo.png',
        },
      },
    }),
  }}
/>


      <BlogHero latestBlog={latestBlog} />
      <BlogContent blogs={blogs} />
    </>
  );
}
