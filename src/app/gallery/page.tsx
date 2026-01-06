import type { Metadata } from 'next';
import { GalleryPageClient } from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'معرض الصور | سلينجز ارت - صور الاسقف الفرنسية والعزل الصوتي',
  description:
    'تصفح معرض صور سلينجز ارت للاسقف الفرنسية المشدودة والمضيئة وألواح العزل الصوتي. أفكار وتصاميم ملهمة لمشروعك القادم.',
  keywords: [
    'صور اسقف فرنسية',
    'معرض صور العزل الصوتي',
    'تصاميم اسقف مشدودة',
    'gallery stretch ceiling',
    'صور أسقف مضيئة',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/gallery',
  },
  openGraph: {
    title: 'معرض الصور | سلينجز ارت',
    description:
      'تصفح معرض صور سلينجز ارت للاسقف الفرنسية المشدودة والعزل الصوتي.',
    url: 'https://www.ceilingsart.sa/gallery',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function Gallery() {
  return <GalleryPageClient />;
}
