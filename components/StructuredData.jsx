import Head from 'next/head';

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CreativeDigital",
    "url": "https://creativedigital.com",
    "logo": "https://creativedigital.com/logo.png",
    "description": "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966-XX-XXXXXXX", // Replace with actual phone
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh",
      "addressLocality": "Riyadh"
    },
    "sameAs": [
      "https://www.facebook.com/creativedigital",
      "https://www.instagram.com/creativedigital",
      "https://www.linkedin.com/company/creativedigital",
      "https://twitter.com/creativedigital"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CreativeDigital",
    "url": "https://creativedigital.com",
    "description": "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies.",
    "publisher": {
      "@type": "Organization",
      "name": "CreativeDigital"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://creativedigital.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CreativeDigital",
    "description": "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies.",
    "url": "https://creativedigital.com",
    "telephone": "+966-XX-XXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh",
      "postalCode": "12345",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "image": "https://creativedigital.com/logo.png"
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </Head>
  );
};

export default StructuredData;
