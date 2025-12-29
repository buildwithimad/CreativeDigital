import HomeClient from './ClientHome';

export const dynamic = "force-static";

export const metadata = {
  title: "CreativeDigital - Home | Digital Marketing and Website Development",
  description: "Home - Professional digital marketing and website development in Riyadh. We provide comprehensive business services: UI/UX design, graphic design, e-commerce development, and SEO. Discover our outstanding work in blogs and contact us to transform your business.",
  keywords: ["home", "web development", "digital marketing", "services", "our work", "blogs", "contact", "UI design", "graphic design", "e-commerce", "SEO"],
  openGraph: {
    title: "CreativeDigital - Home | Digital Marketing and Website Development",
    description: "Home - Professional digital marketing and website development in Riyadh. We provide comprehensive business services.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreativeDigital - Home | Digital Marketing and Website Development",
    description: "Home - Professional digital marketing and website development in Riyadh. We provide comprehensive business services.",
  },
  alternates: {
    canonical: '/en',
  },
  other: {
    // English metadata
    'og:title:en': 'CreativeDigital - Home | Digital Marketing and Website Development',
    'og:description:en': 'Home - Professional digital marketing and website development in Riyadh. We provide comprehensive business services: UI/UX design, graphic design, e-commerce development, and SEO. Discover our outstanding work in blogs and contact us to transform your business.',
    'twitter:title:en': 'CreativeDigital - Home | Digital Marketing and Website Development',
    'twitter:description:en': 'Home - Professional digital marketing and website development in Riyadh. We provide comprehensive business services.',
  },
};

export default function Home() {
  return <HomeClient />;
}
