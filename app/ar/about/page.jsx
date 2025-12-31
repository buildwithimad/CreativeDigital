import AboutClient from './AboutClient';

export const dynamic = 'force-static';

// 🔹 Arabic SEO Metadata
export const metadata = {
  title: 'من نحن | قصة Creative Digital وفريقنا',
  description:
    'تعرّف على قصة Creative Digital، رؤيتنا، وفريقنا المتخصص من المصممين والمطورين وخبراء التسويق الرقمي في تقديم حلول رقمية احترافية.',

  keywords: [
    'من نحن Creative Digital',
    'فريق تطوير مواقع',
    'شركة تصميم مواقع',
    'خبراء التسويق الرقمي',
    'وكالة تسويق رقمي',
    'قصتنا',
    'Creative Digital',
  ],

  alternates: {
    canonical: 'https://www.creativeedigital.com/ar/about',
    languages: {
      ar: 'https://www.creativeedigital.com/ar/about',
      en: 'https://www.creativeedigital.com/en/about',
    },
  },

  openGraph: {
    title: 'من نحن | قصة Creative Digital وفريقنا',
    description:
      'تعرّف على رحلة Creative Digital وفريقنا المتخصص في تطوير المواقع والتسويق الرقمي وبناء الحلول الرقمية الحديثة.',
    url: 'https://www.creativeedigital.com/ar/about',
    siteName: 'Creative Digital',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'من نحن | Creative Digital',
    description:
      'تعرف على قصة Creative Digital وفريقنا المتخصص في الحلول الرقمية وتطوير الأعمال عبر الإنترنت.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
