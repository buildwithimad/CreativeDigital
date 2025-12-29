import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../app/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`
          ${spaceGrotesk.variable}
          bg-gray-50 dark:bg-gray-900
          antialiased
        `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
