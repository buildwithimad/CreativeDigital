import BlogHero from '@/components/blogs/BlogHero';
import BlogContent from '@/components/blogs/BlogContent';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogsPage() {
  const blogs = await client.fetch(BLOGS_LIST_QUERY);

  const latestBlog = blogs?.[4] || null;

  return (
    <>
      <BlogHero latestBlog={latestBlog} />
      <BlogContent blogs={blogs} />
    </>
  );
}
