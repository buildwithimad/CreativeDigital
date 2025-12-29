import AboutClient from './AboutClient';

export const dynamic = "force-static";

export const metadata = {
  title: "About Us - CreativeDigital Team & Story",
  description: "Learn about CreativeDigital's journey, our expert team of designers and developers, and our commitment to delivering exceptional digital solutions.",
  keywords: ["about CreativeDigital", "web development team", "digital marketing experts", "creative agency", "our story", "عن CreativeDigital", "فريق تطوير مواقع", "خبراء التسويق الرقمي", "وكالة إبداعية", "قصتنا"],
  openGraph: {
    title: "About Us - CreativeDigital Team & Story",
    description: "Learn about CreativeDigital's journey, our expert team of designers and developers, and our commitment to delivering exceptional digital solutions.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Us - CreativeDigital Team & Story",
    description: "Learn about CreativeDigital's journey, our expert team of designers and developers, and our commitment to delivering exceptional digital solutions.",
  },
  alternates: {
    canonical: '/about',
  },
  other: {
    // Arabic metadata
    'og:title:ar': 'من نحن - فريق CreativeDigital وقصتنا',
    'og:description:ar': 'تعرف على رحلة CreativeDigital، فريقنا المتخصص من المصممين والمطورين، وتزامنا في تقديم حلول رقمية استثنائية.',
    'twitter:title:ar': 'من نحن - فريق CreativeDigital وقصتنا',
    'twitter:description:ar': 'تعرف على رحلة CreativeDigital، فريقنا المتخصص من المصممين والمطورين، وتزامنا في تقديم حلول رقمية استثنائية.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
