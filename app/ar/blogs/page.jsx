import BlogHero from '@/components/blogs/BlogHero';
import BlogContent from '@/components/blogs/BlogContent';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

// 🔹 Arabic SEO Metadata
export const metadata = {
  title: 'المدونة والمقالات | تطوير المواقع، تحسين محركات البحث والتسويق الرقمي',
  description:
    'اكتشف مقالات احترافية ونصائح عملية حول تطوير المواقع، تحسين محركات البحث (SEO)، التسويق الرقمي، تصميم تجربة المستخدم، وأحدث التقنيات لمساعدة عملك على النمو عبر الإنترنت.',

  alternates: {
    canonical: 'https://www.creativeedigital.com/ar/blogs',
    languages: {
      ar: 'https://www.creativeedigital.com/ar/blogs',
      en: 'https://www.creativeedigital.com/en/blogs',
    },
  },

  openGraph: {
    title: 'المدونة والمقالات | تطوير المواقع والتسويق الرقمي',
    description:
      'مقالات متخصصة في تطوير المواقع، تحسين محركات البحث، التسويق الرقمي، والتقنيات الحديثة لتنمية الأعمال.',
    url: 'https://www.creativeedigital.com/ar/blogs',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'المدونة والمقالات | Creative Digital',
    description:
      'اطّلع على أحدث المقالات والنصائح في تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي.',
  },
};

export default async function BlogsPage() {
  const blogs = await client.fetch(BLOGS_LIST_QUERY);
  const latestBlog = blogs?.[4] || null;

  return (
    <>
   {/* ✅ Arabic Blog Schema (Improved) */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'مدونة Creative Digital',
      url: 'https://www.creativeedigital.com/ar/blogs',
      description:
        'مقالات وموارد تعليمية حول تطوير المواقع، تحسين محركات البحث، والتسويق الرقمي.',
      inLanguage: 'ar',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.creativeedigital.com/ar/blogs',
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
