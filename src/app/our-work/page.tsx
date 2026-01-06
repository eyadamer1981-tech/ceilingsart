import type { Metadata } from 'next';
import { OurWorkPageClient } from './OurWorkPageClient';

export const metadata: Metadata = {
  title: 'أعمالنا | سلينجز ارت - مشاريع الاسقف الفرنسية والعزل الصوتي',
  description:
    'استعرض مشاريع سلينجز ارت الناجحة في تركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي للفلل والمنازل والفنادق والمعارض بالسعودية.',
  keywords: [
    'مشاريع اسقف فرنسية',
    'أعمال سلينجز ارت',
    'صور اسقف مشدودة',
    'مشاريع العزل الصوتي',
    'stretch ceiling projects',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/our-work',
  },
  openGraph: {
    title: 'أعمالنا | سلينجز ارت',
    description:
      'استعرض مشاريع سلينجز ارت الناجحة في تركيب الاسقف الفرنسية المشدودة والعزل الصوتي.',
    url: 'https://www.ceilingsart.sa/our-work',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function OurWork() {
  return <OurWorkPageClient />;
}
