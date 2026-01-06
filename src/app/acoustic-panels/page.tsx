import type { Metadata } from 'next';
import { AcousticPanelsPageClient } from './AcousticPanelsPageClient';

export const metadata: Metadata = {
  title: 'ألواح العزل الصوتي والأكوستيك | سلينجز ارت بالسعودية',
  description:
    'اكتشف حلول العزل الصوتي المتكاملة من سلينجز ارت. ألواح أكوستيك، عزل صوتي للغرف والجدران، ألواح فوم وبوليستر بأعلى جودة للمنازل والمباني التجارية.',
  keywords: [
    'ألواح عزل صوتي',
    'ألواح أكوستيك السعودية',
    'عزل صوتي للغرف',
    'عزل صوتي للجدران',
    'acoustic panels saudi',
    'soundproof panels',
    'ألواح بوليستر عازلة',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/acoustic-panels',
  },
  openGraph: {
    title: 'ألواح العزل الصوتي والأكوستيك | سلينجز ارت',
    description:
      'اكتشف حلول العزل الصوتي المتكاملة من سلينجز ارت. ألواح أكوستيك للمنازل والمباني التجارية.',
    url: 'https://www.ceilingsart.sa/acoustic-panels',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function AcousticPanels() {
  return <AcousticPanelsPageClient />;
}
