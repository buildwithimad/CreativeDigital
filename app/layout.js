import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SocialLinkButton from "@/components/SocialLinkButton";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const GA_MEASUREMENT_ID = process.env.NEXT_GOOGLE_ANALYTICS_ID;

export const metadata = {
  title: {
    default: "CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب",
    template: "%s | CreativeDigital"
  },
  description: "الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال: تصميم واجهات المستخدم، تصميم جرافيك، تطوير التجارة الإلكترونية، وتحسين محركات البحث. اكتشف أعمالنا المتميزة في المدونات وتواصل معنا لتحويل أعمالك.",
  keywords: ["web development", "digital marketing", "UI/UX design", "graphic design", "e-commerce", "SEO", "تطوير مواقع", "تسويق رقمي", "تصميم واجهات", "تصميم جرافيك", "تجارة إلكترونية", "تحسين محركات البحث"],
  authors: [{ name: "CreativeDigital Team" }],
  creator: "CreativeDigital",
  publisher: "CreativeDigital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.creativeedigital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    title: "CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب",
    description: "الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال: تصميم واجهات المستخدم، تصميم جرافيك، تطوير التجارة الإلكترونية، وتحسين محركات البحث. اكتشف أعمالنا المتميزة في المدونات وتواصل معنا لتحويل أعمالك.",
    siteName: "CreativeDigital",
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب",
    description: "الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال: تصميم واجهات المستخدم، تصميم جرافيك، تطوير التجارة الإلكترونية، وتحسين محركات البحث. اكتشف أعمالنا المتميزة في المدونات وتواصل معنا لتحويل أعمالك.",
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
  other: {
    // Arabic metadata
    'og:title:ar': 'CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب',
    'og:description:ar': 'الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال: تصميم واجهات المستخدم، تصميم جرافيك، تطوير التجارة الإلكترونية، وتحسين محركات البحث. اكتشف أعمالنا المتميزة في المدونات وتواصل معنا لتحويل أعمالك.',
    'twitter:title:ar': 'CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب',
    'twitter:description:ar': 'الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Arabic SEO Meta Tags */}
        <meta name="keywords" content="الرئيسية, تطوير مواقع, تسويق رقمي, الخدمات, أعمالنا, المدونات, اتصل, تصميم واجهات, تصميم جرافيك, تجارة إلكترونية, تحسين محركات البحث" />

        {/* Arabic Open Graph */}
        <meta property="og:title" content="CreativeDigital - الرئيسية | تسويق رقمي وتطوير مواقع الويب" />
        <meta property="og:description" content="الرئيسية - تسويق رقمي احترافي وتطوير مواقع الويب في الرياض. نقدم الخدمات المتكاملة للأعمال: تصميم واجهات المستخدم، تصميم جرافيك، تطوير التجارة الإلكترونية، وتحسين محركات البحث. اكتشف أعمالنا المتميزة في المدونات وتواصل معنا لتحويل أعمالك." />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:locale:alternate" content="en_US" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
         {/* ✅ Google Analytics */}
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        <Navbar />
        <main>{children}</main>
        <SocialLinkButton />
        <Footer />
      </body>
    </html>
  );
}
