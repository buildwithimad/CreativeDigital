'use client';

import React from 'react';
import ScrollBasedAnimation from '../ScrollBasedAnimation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CTAViewWork = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <section
      className="bg-black/80 relative py-20 w-full"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <ScrollBasedAnimation direction="up" offset={50}>
        <div className="max-w-6xl mx-auto text-center px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isArabic ? 'هل أنت مستعد لرؤية أعمالنا؟' : 'Ready to See Our Work?'}
          </h2>

          <p className="text-gray-300 text-lg md:text-xl mb-8">
            {isArabic
              ? 'اكتشف مشاريعنا الإبداعية وكيف نساعد العلامات التجارية على التميز.'
              : 'Explore our creative projects and see how we help brands stand out.'}
          </p>

          <Link href={isArabic ? '/ar/work' : '/work'}>
            <button className="bg-accent hover:bg-accent/90 text-black font-semibold py-3 px-8 transition-all duration-300 transform hover:scale-105">
              {isArabic ? 'عرض أعمالنا' : 'View Our Work'}
            </button>
          </Link>
        </div>
      </ScrollBasedAnimation>
    </section>
  );
};

export default CTAViewWork;
