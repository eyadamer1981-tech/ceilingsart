// app/acoustic-panels/acoustic-fabric-wraps/page.tsx

import PageLayout from '@/components/PageLayout';
import { FabricWrapsPage } from '@/components/FabricWrapsPage';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية.',
  alternates: { canonical: 'https://www.ceilingsart.sa/acoustic-panels/acoustic-fabric-wraps' },
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
      <FabricWrapsPage /> {/* ممكن يكون Client Component داخلي */}
      <Footer />
    </PageLayout>
  );
}
