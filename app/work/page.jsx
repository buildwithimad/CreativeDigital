import WorkClient from './WorkClient';
import { client } from '../../sanity/lib/client';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Our Portfolio - CreativeDigital Projects & Work',
  description:
    "Explore our portfolio of successful web development, UI/UX design, and digital marketing projects. See how we've helped businesses transform their online presence.",
  keywords: [
    'portfolio',
    'web development projects',
    'UI/UX design portfolio',
    'digital marketing case studies',
    'creative work',
    'معرض أعمال',
    'مشاريع تطوير مواقع',
    'معرض تصميم واجهات',
    'دراسات حالة تسويق رقمي',
    'أعمال إبداعية',
  ],
  openGraph: {
    title: 'Our Portfolio - CreativeDigital Projects & Work',
    description:
      'Explore our portfolio of successful web development, UI/UX design, and digital marketing projects.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Portfolio - CreativeDigital Projects & Work',
    description:
      'Explore our portfolio of successful web development, UI/UX design, and digital marketing projects.',
  },
  alternates: {
    canonical: '/work',
  },
  other: {
    'og:title:ar': 'معرض أعمالنا - مشاريع CreativeDigital',
    'og:description:ar':
      'استكشف معرض أعمالنا من المشاريع الناجحة في تطوير المواقع، تصميم واجهات المستخدم، والتسويق الرقمي.',
    'twitter:title:ar': 'معرض أعمالنا - مشاريع CreativeDigital',
    'twitter:description:ar':
      'استكشف معرض أعمالنا من المشاريع الناجحة في تطوير المواقع، تصميم واجهات المستخدم، والتسويق الرقمي.',
  },
};

async function getProjects() {
  return await client.fetch(`*[_type == "work"]{
    _id,
    title,
    titleAr,
    description,
    descriptionAr,
    "thumbnail": thumbnail.asset->url,
    "gallery": gallery[].asset->url
  }`);
}

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkClient projects={projects} />;
}
