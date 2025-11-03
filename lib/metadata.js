export const defaultMetadata = {
  title: {
    default: "CreativeDigital - Digital Marketing & Creative Solutions",
    template: "%s | CreativeDigital"
  },
  description: "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies. Transform your business with our expert team.",
  keywords: [
    "digital marketing",
    "web development",
    "branding",
    "creative agency",
    "SEO",
    "social media marketing",
    "digital solutions",
    "web design",
    "marketing agency",
    "creative digital"
  ],
  authors: [{ name: "CreativeDigital Team" }],
  creator: "CreativeDigital",
  publisher: "CreativeDigital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://creativedigital.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    title: "CreativeDigital - Digital Marketing & Creative Solutions",
    description: "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies.",
    siteName: "CreativeDigital",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CreativeDigital - Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreativeDigital - Digital Marketing & Creative Solutions",
    description: "Leading digital marketing agency specializing in creative solutions, web development, branding, and digital strategies.",
    images: ['/twitter-image.jpg'],
    creator: '@CreativeDigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
};

export const getPageMetadata = (pageTitle, pageDescription, pageKeywords = [], pageImage = null) => {
  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultMetadata.keywords, ...pageKeywords],
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      images: pageImage ? [pageImage] : defaultMetadata.openGraph.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: pageImage ? [pageImage] : defaultMetadata.twitter.images,
    },
  };
};
