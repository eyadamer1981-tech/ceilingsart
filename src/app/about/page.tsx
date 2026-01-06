import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'من نحن | سلينجز ارت - الاسقف الفرنسية والعزل الصوتي',
  description:
    'تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية. خبرة واسعة وجودة أوروبية.',
  keywords: [
    'من نحن سلينجز ارت',
    'شركة اسقف فرنسية',
    'خبراء العزل الصوتي',
    'Ceilings Art about us',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/about',
  },
  openGraph: {
    title: 'من نحن | سلينجز ارت',
    description:
      'تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية.',
    url: 'https://www.ceilingsart.sa/about',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function About() {
  return <AboutPageClient />;
}
