'use client';
import React from 'react';
import Image from 'next/image';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import Link from 'next/link';

const BlogDetailsContent = ({ blog, prevBlog, nextBlog }) => {
  // Mock detailed content for each blog
  const getBlogContent = (id) => {
    const contents = {
      1: {
        introduction: "The digital landscape in Saudi Arabia is rapidly evolving, driven by Vision 2030 and the Kingdom's commitment to technological innovation. As we stand on the brink of a new era, web development is not just about creating websites—it's about building the future of digital interaction.",
        sections: [
          {
            title: "Emerging Technologies Shaping the Future",
            content: "Artificial Intelligence and Machine Learning are becoming integral parts of web development. From chatbots that provide 24/7 customer support to recommendation engines that personalize user experiences, AI is revolutionizing how we interact with digital platforms."
          },
          {
            title: "The Rise of Progressive Web Apps",
            content: "PWAs combine the best of web and mobile applications, offering users an app-like experience directly through their browsers. In Saudi Arabia, where mobile usage is exceptionally high, PWAs represent a significant opportunity for businesses to reach their audience effectively."
          },
          {
            title: "Cloud-Native Development",
            content: "With the proliferation of cloud services, developers are increasingly adopting cloud-native approaches. This paradigm shift allows for greater scalability, improved performance, and reduced operational costs."
          }
        ],
        conclusion: "The future of web development in Saudi Arabia is bright and full of possibilities. By embracing these emerging technologies and staying ahead of the curve, businesses can position themselves for success in the digital age."
      },
      2: {
        introduction: "In today's competitive digital marketplace, local businesses in Saudi Arabia need more than just an online presence—they need a strategic approach to digital marketing that drives real results.",
        sections: [
          {
            title: "Understanding Your Local Audience",
            content: "Digital marketing in Saudi Arabia requires a deep understanding of local culture, preferences, and behaviors. What works in global markets may not resonate with local audiences, making localization crucial for success."
          },
          {
            title: "Leveraging Social Media Platforms",
            content: "With high social media penetration rates, platforms like Twitter, Instagram, and Snapchat offer tremendous opportunities for local businesses to connect with their target audience and build brand loyalty."
          },
          {
            title: "Content Marketing Strategies",
            content: "Creating valuable, relevant content that addresses local needs and interests is key to establishing authority and driving engagement in the Saudi market."
          }
        ],
        conclusion: "By implementing these digital marketing strategies tailored to the local context, businesses in Saudi Arabia can effectively reach their target audience and achieve sustainable growth."
      },
      3: {
        introduction: "Responsive web design has become a fundamental requirement in today's multi-device world. Modern frameworks provide developers with powerful tools to create websites that work seamlessly across all platforms.",
        sections: [
          {
            title: "Why React and Next.js?",
            content: "React's component-based architecture and Next.js's server-side rendering capabilities make them ideal for building modern, responsive web applications that deliver exceptional user experiences."
          },
          {
            title: "Mobile-First Development",
            content: "Starting with mobile design ensures that your website works perfectly on the smallest screens first, then progressively enhances for larger displays—a crucial approach in mobile-dominated markets."
          },
          {
            title: "Performance Optimization",
            content: "Modern frameworks come with built-in optimization features that ensure fast loading times and smooth user interactions, critical for user retention and SEO."
          }
        ],
        conclusion: "Mastering responsive design with modern frameworks like React and Next.js is essential for creating digital experiences that meet the expectations of today's users."
      },
      4: {
        introduction: "Search Engine Optimization remains a cornerstone of digital marketing strategy. As search algorithms evolve, so must our approach to SEO.",
        sections: [
          {
            title: "Technical SEO Fundamentals",
            content: "Site speed, mobile-friendliness, and secure connections (HTTPS) are now baseline requirements for any website aiming to rank well in search results."
          },
          {
            title: "Content Quality and Relevance",
            content: "Creating high-quality, relevant content that answers user queries and provides value is more important than ever in today's search landscape."
          },
          {
            title: "Local SEO Strategies",
            content: "For businesses targeting local markets, optimizing for local search results through Google My Business and location-based keywords is crucial."
          }
        ],
        conclusion: "SEO is an ongoing process that requires constant adaptation and optimization. By staying current with best practices, businesses can maintain and improve their search visibility."
      },
      5: {
        introduction: "Social media has transformed from a communication tool to a powerful marketing platform that can drive significant business results.",
        sections: [
          {
            title: "Platform Selection and Strategy",
            content: "Different social media platforms serve different purposes. Understanding your audience and choosing the right platforms is the first step to success."
          },
          {
            title: "Content Creation and Curation",
            content: "Creating engaging content that resonates with your audience while maintaining brand consistency is key to building a loyal following."
          },
          {
            title: "Community Engagement",
            content: "Social media is about building relationships. Responding to comments, engaging with your community, and fostering conversations leads to stronger brand loyalty."
          }
        ],
        conclusion: "When executed well, social media marketing can be a powerful driver of brand awareness, customer engagement, and business growth."
      },
      6: {
        introduction: "The e-commerce landscape in Saudi Arabia is booming, with more businesses recognizing the immense potential of online selling.",
        sections: [
          {
            title: "Choosing the Right Platform",
            content: "From Shopify to WooCommerce, selecting the right e-commerce platform depends on your business needs, technical requirements, and scalability goals."
          },
          {
            title: "Payment Integration",
            content: "Seamless payment processing is crucial for e-commerce success. Integrating with local payment methods and ensuring security builds customer trust."
          },
          {
            title: "Logistics and Fulfillment",
            content: "Efficient order fulfillment and delivery services are essential for customer satisfaction and repeat business in the competitive e-commerce space."
          }
        ],
        conclusion: "E-commerce offers tremendous opportunities for small businesses to expand their reach and increase revenue through online sales channels."
      },
      7: {
        introduction: "Mobile app development continues to evolve rapidly, with new technologies and frameworks emerging regularly.",
        sections: [
          {
            title: "Cross-Platform Development",
            content: "Frameworks like React Native and Flutter allow developers to build apps for multiple platforms using a single codebase, reducing development time and costs."
          },
          {
            title: "Progressive Web Apps",
            content: "PWAs offer app-like experiences through web browsers, providing an alternative to native app development with broader reach."
          },
          {
            title: "Emerging Technologies",
            content: "Augmented Reality, Artificial Intelligence, and 5G connectivity are opening new possibilities for mobile app functionality and user experiences."
          }
        ],
        conclusion: "Staying ahead in mobile app development requires continuous learning and adaptation to new technologies and user expectations."
      },
      8: {
        introduction: "Data analytics has become essential for businesses looking to make informed decisions and drive growth.",
        sections: [
          {
            title: "Data Collection and Integration",
            content: "Implementing proper data collection systems and integrating data from multiple sources provides a comprehensive view of business performance."
          },
          {
            title: "Analytics Tools and Platforms",
            content: "From Google Analytics to advanced business intelligence platforms, choosing the right tools depends on your business size and analytical needs."
          },
          {
            title: "Actionable Insights",
            content: "The true value of data analytics lies in translating data into actionable insights that drive business decisions and improvements."
          }
        ],
        conclusion: "Data-driven decision making is no longer optional—it's essential for businesses that want to remain competitive and achieve sustainable growth."
      },
      9: {
        introduction: "In an increasingly digital world, cybersecurity has become a critical concern for all businesses, regardless of size.",
        sections: [
          {
            title: "Risk Assessment",
            content: "Understanding your digital assets and potential vulnerabilities is the first step in developing an effective cybersecurity strategy."
          },
          {
            title: "Security Best Practices",
            content: "Implementing multi-factor authentication, regular software updates, and employee training forms the foundation of good cybersecurity hygiene."
          },
          {
            title: "Compliance and Regulations",
            content: "Staying compliant with data protection regulations and industry standards helps protect both your business and your customers."
          }
        ],
        conclusion: "Cybersecurity is an ongoing process that requires vigilance, regular updates, and a proactive approach to protecting digital assets."
      }
    };
    return contents[id] || contents[1];
  };

  const content = getBlogContent(blog.id);

  return (
    <section className="py-20 max-w-7xl mx-auto bg-black relative z-30 px-8 md:px-12">
      {/* Article Content */}
      <ScrollBasedAnimation direction="up" offset={50}>
        <article className="prose prose-lg prose-invert max-w-none">
          {/* Introduction */}
          <p className="text-gray-300 text-lg leading-relaxed mb-8 first-letter:text-4xl first-letter:font-bold first-letter:text-accent first-letter:mr-2 first-letter:float-left">
            {content.introduction}
          </p>

          {/* Content Sections */}
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {section.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {section.content}
              </p>
            </div>
          ))}

          {/* Conclusion */}
          <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-accent">
            <p className="text-gray-300 leading-relaxed italic">
              {content.conclusion}
            </p>
          </div>
        </article>
      </ScrollBasedAnimation>

      {/* Navigation */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.3}>
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8">
            {prevBlog ? (
              <Link href={`/blogs/${prevBlog.id}`} className="group flex-1">
                <div className="bg-gray-900 hover:bg-gray-800 p-6 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-accent">
                  <div className="flex items-center text-accent group-hover:text-green-400 transition-colors duration-200 mb-3">
                    <span className="mr-2 text-xl">←</span>
                    <span className="text-sm font-medium">Previous Post</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-accent transition-colors duration-200">
                    {prevBlog.title}
                  </h3>
                  <div className="flex items-center mt-3 text-gray-400 text-sm">
                    <span>{prevBlog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{prevBlog.readTime}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            <div className="hidden md:block w-px h-16 bg-gray-700 mx-4"></div>

            {nextBlog ? (
              <Link href={`/blogs/${nextBlog.id}`} className="group flex-1">
                <div className="bg-gray-900 hover:bg-gray-800 p-6 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-accent">
                  <div className="flex items-center justify-end text-accent group-hover:text-green-400 transition-colors duration-200 mb-3">
                    <span className="text-sm font-medium">Next Post</span>
                    <span className="ml-2 text-xl">→</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-tight text-right group-hover:text-accent transition-colors duration-200">
                    {nextBlog.title}
                  </h3>
                  <div className="flex items-center justify-end mt-3 text-gray-400 text-sm">
                    <span>{nextBlog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{nextBlog.readTime}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </div>
      </ScrollBasedAnimation>

      {/* Back to Blogs */}
      <ScrollBasedAnimation direction="up" offset={50} delay={0.4}>
        <div className="text-center mt-16">
          <Link href="/blogs" className="inline-flex items-center bg-accent hover:bg-green-500 text-black font-semibold py-4 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="mr-2">←</span>
            Back to All Blogs
          </Link>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default BlogDetailsContent;