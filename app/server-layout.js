import { Montserrat } from "next/font/google";
import { defaultMetadata } from "@/lib/metadata";
import StructuredData from "@/components/StructuredData";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = defaultMetadata;

export default function ServerLayout({ children }) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
