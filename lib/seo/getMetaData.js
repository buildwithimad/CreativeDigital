export function getHomeMetadata({
  locale = 'en',
}) {
  const isArabic = locale === 'ar';

  const baseUrl = 'https://www.creativeedigital.com';

  const data = {
    en: {
      title: 'Creative Digital | Web Development & Digital Marketing in Riyadh',
      description:
        'Creative Digital is a professional web development and digital marketing agency in Riyadh offering SEO, UI/UX design, and e-commerce solutions.',
      canonical: `${baseUrl}/en`,
      locale: 'en_US',
      altLocale: 'ar_SA',
    },
    ar: {
      title: 'Creative Digital | تطوير مواقع وتسويق رقمي في الرياض',
      description:
        'شركة Creative Digital متخصصة في تطوير المواقع والتسويق الرقمي في الرياض، نقدم حلول SEO وتصميم واجهات المستخدم والمتاجر الإلكترونية.',
      canonical: `${baseUrl}/ar`,
      locale: 'ar_SA',
      altLocale: 'en_US',
    },
  };

  const seo = isArabic ? data.ar : data.en;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: seo.canonical,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: 'Creative Digital',
      type: 'website',
      locale: seo.locale,
      alternateLocale: seo.altLocale,
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}
