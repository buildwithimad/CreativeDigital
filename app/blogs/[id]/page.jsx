'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import ScrollBasedAnimation from '../../../components/ScrollBasedAnimation';
import BlogDetailsHero from '@/components/blogs/BlogDetailsHero';
import BlogDetailsContent from '@/components/blogs/BlogDetailsContent';

const BlogDetailsPage = () => {
  const params = useParams();
  const blogId = parseInt(params.id);

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

  const blog = blogs.find(b => b.id === blogId);
  const prevBlog = blogs.find(b => b.id === blogId - 1);
  const nextBlog = blogs.find(b => b.id === blogId + 1);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blogs" className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors">
            Back to Blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogDetailsHero blog={blog} />
      <BlogDetailsContent blog={blog} prevBlog={prevBlog} nextBlog={nextBlog} />
    </>
  );
};

export default BlogDetailsPage;