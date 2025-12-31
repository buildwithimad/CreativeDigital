import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../app/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleTagManager from "@/components/GoogleTagManager";
import ContactFab from "@/components/ContactFab";
import LenisProvider from "@/components/LenisProvider";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});



export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${spaceGrotesk.variable}
          bg-gray-50 dark:bg-gray-900
          antialiased
        `}
      >
        {/* ✅ Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />

        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ContactFab/>

        <Navbar />
        <LenisProvider>
          {children}  
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
