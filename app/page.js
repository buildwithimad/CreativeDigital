import { getPageMetadata } from "@/lib/metadata";
import HomeClient from "./home-client";

export const metadata = getPageMetadata(
  "CreativeDigital - Leading Digital Marketing Agency",
  "Transform your business with CreativeDigital's expert digital marketing, web development, and creative solutions. We deliver innovative strategies that drive results.",
  ["digital marketing agency", "web development", "branding", "SEO services", "creative digital solutions"],
  {
    url: '/og-home.jpg',
    width: 1200,
    height: 630,
    alt: 'CreativeDigital - Digital Marketing Agency Home Page',
  }
);

export default function Home() {
  return <HomeClient />;
}
