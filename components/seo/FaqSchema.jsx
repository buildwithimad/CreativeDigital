export default function FAQSchema({ locale = 'en' }) {
  const data = {
    en: [
      {
        '@type': 'Question',
        name: 'What services does Creative Digital offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Creative Digital offers web development, SEO, digital marketing, UI/UX design, and e-commerce solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Creative Digital located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Creative Digital is based in Riyadh, Saudi Arabia.',
        },
      },
    ],
    ar: [
      {
        '@type': 'Question',
        name: 'ما هي الخدمات التي تقدمها Creative Digital؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'تقدم Creative Digital خدمات تطوير المواقع، تحسين محركات البحث، التسويق الرقمي، وتصميم واجهات المستخدم.',
        },
      },
      {
        '@type': 'Question',
        name: 'أين تقع شركة Creative Digital؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'تقع شركة Creative Digital في مدينة الرياض بالمملكة العربية السعودية.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data[locale],
        }),
      }}
    />
  );
}
