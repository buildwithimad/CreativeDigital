export default function LocalBusinessSchema({ locale = 'en' }) {
  const isArabic = locale === 'ar';

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Creative Digital',
          url: 'https://www.creativeedigital.com',
          logo: 'https://www.creativeedigital.com/CreativedigitalLogo.png',
          image: 'https://www.creativeedigital.com/cover.jpg',
          description: isArabic
            ? 'شركة Creative Digital متخصصة في تطوير المواقع والتسويق الرقمي في الرياض.'
            : 'Creative Digital is a web development and digital marketing agency in Riyadh.',

          /** ✅ CORRECT PROPERTY */
          availableLanguage: ['en', 'ar'],

          telephone: '+966511267458',

          address: {
            '@type': 'PostalAddress',
            addressLocality: isArabic ? 'الرياض' : 'Riyadh',
            addressCountry: 'SA',
          },

          areaServed: {
            '@type': 'Country',
            name: isArabic ? 'المملكة العربية السعودية' : 'Saudi Arabia',
          },

          sameAs: [
            'https://www.instagram.com/creativeedigital',
            'https://www.linkedin.com/company/creativeedigital',
          ],
        }),
      }}
    />
  );
}
