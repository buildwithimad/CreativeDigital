import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    default: "CreativeDigital — حلول رقمية وتطوير الويب",
    template: "%s | CreativeDigital"
  },
  description: "تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية. حوّل أعمالك مع فريقنا المتخصص من المصممين والمطورين.",
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
    title: "CreativeDigital - حلول رقمية وتطوير مواقع",
    description: "تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية. حوّل أعمالك مع فريقنا المتخصص من المصممين والمطورين.",
    siteName: "CreativeDigital",
  },
  twitter: {
    card: 'summary_large_image',
    title: "CreativeDigital - حلول رقمية وتطوير مواقع",
    description: "تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية. حوّل أعمالك مع فريقنا المتخصص من المصممين والمطورين.",
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
    'og:title:ar': 'CreativeDigital - حلول رقمية وتطوير مواقع',
    'og:description:ar': 'تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية. حوّل أعمالك مع فريقنا المتخصص من المصممين والمطورين.',
    'twitter:title:ar': 'CreativeDigital - حلول رقمية وتطوير مواقع',
    'twitter:description:ar': 'تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Arabic SEO Meta Tags */}
        <meta name="description" content="تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية. حوّل أعمالك مع فريقنا المتخصص من المصممين والمطورين." />
        <meta name="keywords" content="تطوير مواقع, تسويق رقمي, تصميم واجهات, تصميم جرافيك, تجارة إلكترونية, تحسين محركات البحث" />



        {/* Arabic Open Graph */}
        <meta property="og:title" content="CreativeDigital - حلول رقمية وتطوير مواقع" />
        <meta property="og:description" content="تسويق رقمي احترافي، تطوير مواقع، وحلول إبداعية." />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:locale:alternate" content="en_US" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
