import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { BLOG_DETAIL_QUERY, BLOG_NAV_QUERY } from '@/sanity/queries/blogs';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';

export const dynamic = 'force-dynamic'; // <--- ADD THIS AT THE TOP
export const revalidate = 0;

// --- 1. SEO METADATA GENERATION (English Only) ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) return { title: 'Blog Not Found' };

  // Use SEO fields if available, otherwise fallback to standard title/intro
  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.introduction;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: blog.mainImage?.asset?.url ? [{ url: blog.mainImage.asset.url }] : [],
    },
  };
}

// --- 2. MAIN PAGE COMPONENT (English Only) ---
export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  // A. Fetch Current Blog
  const blog = await client.fetch(BLOG_DETAIL_QUERY, { slug });

  if (!blog) {
    notFound(); 
  }

  // B. Fetch Navigation (Prev/Next)
  const allBlogs = await client.fetch(BLOG_NAV_QUERY);
  
  // Find index of current blog
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  
  // Determine Prev/Next logic (Newest First)
  // Next in list (index - 1) is the NEWER post
  // Prev in list (index + 1) is the OLDER post
  const nextBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null; 
  const prevBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null; 

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