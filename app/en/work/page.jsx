// app/en/work/page.jsx

import WorkHero from '@/components/work/WorkHero';
import WorkContent from '@/components/work/Work';
import { client } from '@/sanity/lib/client';
import { WORK_QUERY } from '@/sanity/queries/work';

export const revalidate = 60; // ISR – refresh every 60 seconds

// 🔹 English SEO Metadata
export const metadata = {
  title: 'Our Work | Creative Digital Portfolio & Case Studies',
  description:
    'Explore Creative Digital’s portfolio featuring successful web development, design, and digital marketing projects that helped businesses grow online.',

  keywords: [
    'Creative Digital portfolio',
    'web development projects',
    'digital marketing case studies',
    'website design portfolio',
    'agency work samples',
    'Creative Digital work',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/en/work',
    languages: {
      en: 'https://www.creativeedigital.com/en/work',
      ar: 'https://www.creativeedigital.com/ar/work',
    },
  },

  openGraph: {
    title: 'Our Work | Creative Digital',
    description:
      'View our portfolio of web development, UI/UX design, and digital marketing projects delivered for modern businesses.',
    url: 'https://www.creativeedigital.com/en/work',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Creative Digital',
    description:
      'Discover Creative Digital’s work and case studies in web development and digital marketing.',
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
