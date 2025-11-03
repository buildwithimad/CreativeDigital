'use client';

import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function ClientLayout({ children }) {
  // Initialize with saved language preference
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  const [dir, setDir] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'en';
      return savedLang === 'ar' ? 'rtl' : 'ltr';
    }
    return 'ltr';
  });

  useEffect(() => {
    // Update document attributes when component mounts
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${montserrat.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
