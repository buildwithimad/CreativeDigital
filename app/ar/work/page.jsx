// app/ar/work/page.jsx

import WorkHero from '@/components/work/WorkHero';
import WorkContent from '@/components/work/Work';
import { client } from '@/sanity/lib/client';
import { WORK_QUERY } from '@/sanity/queries/work';

export const revalidate = 60; // ISR – refresh every 60 seconds

// 🔹 Arabic SEO Metadata
export const metadata = {
  title: 'أعمالنا | مشاريع Creative Digital وتجاربنا الناجحة',
  description:
    'اطّلع على أعمال Creative Digital ومشاريعنا المميزة في تطوير المواقع، التصميم، والتسويق الرقمي التي ساعدت الشركات على النمو وتحقيق نتائج حقيقية.',

  keywords: [
    'أعمال Creative Digital',
    'معرض الأعمال',
    'مشاريع تطوير مواقع',
    'نماذج أعمال',
    'تصميم مواقع احترافي',
    'مشاريع تسويق رقمي',
    'بورتفوليو شركة',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/ar/work',
    languages: {
      ar: 'https://www.creativeedigital.com/ar/work',
      en: 'https://www.creativeedigital.com/en/work',
    },
  },

  openGraph: {
    title: 'أعمالنا | Creative Digital',
    description:
      'تعرّف على مشاريع Creative Digital في تطوير المواقع والتسويق الرقمي وبناء التجارب الرقمية الحديثة.',
    url: 'https://www.creativeedigital.com/ar/work',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'أعمالنا | Creative Digital',
    description:
      'استعرض نماذج من أعمال Creative Digital في تطوير المواقع والتسويق الرقمي.',
  },
};

const PortfolioPage = async () => {
  const projects = await client.fetch(WORK_QUERY);

  return (
    <>
      <WorkHero />
      <WorkContent projects={projects} />
    </>
  );
};

export default PortfolioPage;
