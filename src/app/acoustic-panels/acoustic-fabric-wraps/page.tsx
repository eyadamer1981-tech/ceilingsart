// app/acoustic-panels/acoustic-fabric-wraps/page.tsx
import dynamic from 'next/dynamic';
import PageLayout from '@/components/PageLayout';
import type { Metadata } from 'next';

// استدعاء Client Components بدون SSR
const FabricWrapsPage = dynamic(() => import('@/components/FabricWrapsPage'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export const metadata: Metadata = {
  title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
  keywords: [
    'أغطية قماشية عازلة للصوت الرياض',
    'سلينجز ارت الرياض',
    'عزل الصوت بالرياض',
    'اسقف فرنسية السعودية',
    'Ceilings Art Saudi Arabia',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/acoustic-panels/acoustic-fabric-wraps',
  },
  openGraph: {
    title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
    description:
      'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية.',
    url: 'https://www.ceilingsart.sa/acoustic-panels/acoustic-fabric-wraps',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'product',
    images: [
      {
        url: 'https://www.ceilingsart.sa/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'أغطية قماشية صوتية - سلينجز ارت - الرياض',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أغطية القماشية الصوتية | سلينجز ارت',
    description:
      'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض - السعودية.',
    images: ['https://www.ceilingsart.sa/newlogo.png'],
  },
};

export default function AcousticFabricWraps() {
  return (
    <PageLayout>
      <FabricWrapsPage />
      <Footer />
    </PageLayout>
  );
}
