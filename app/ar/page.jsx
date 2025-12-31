import HomeClient from './ClientHome';
import { getHomeMetadata } from '@/lib/seo/getMetaData';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import FAQSchema from '@/components/seo/FaqSchema';

export const dynamic = 'force-static';

export const metadata = getHomeMetadata({ locale: 'ar' });

export default function Home() {
  return (
    <>
      <LocalBusinessSchema locale="ar" />
      <FAQSchema locale="ar" />
      <HomeClient />
    </>
  );
}
