import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'خدماتنا | سلينجز ارت - الاسقف الفرنسية والعزل الصوتي بالسعودية',
  description:
    'اكتشف خدمات سلينجز ارت المتميزة في تركيب الاسقف الفرنسية المشدودة والمضيئة وألواح العزل الصوتي والأكوستيك للفلل والمنازل والفنادق بالسعودية.',
  keywords: [
    'خدمات الاسقف الفرنسية',
    'تركيب اسقف مشدودة',
    'خدمات العزل الصوتي',
    'تركيب ألواح أكوستيك',
    'stretch ceiling services',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/services',
  },
  openGraph: {
    title: 'خدماتنا | سلينجز ارت',
    description:
      'اكتشف خدمات سلينجز ارت المتميزة في تركيب الاسقف الفرنسية المشدودة والعزل الصوتي.',
    url: 'https://www.ceilingsart.sa/services',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function Services() {
  return <ServicesPageClient />;
}
