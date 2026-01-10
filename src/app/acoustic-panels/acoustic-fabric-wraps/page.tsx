// app/acoustic-panels/acoustic-fabric-wraps/page.tsx
import PageLayout from '@/components/PageLayout';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// استيراد Client Components بشكل ديناميكي
const FabricWrapsPage = dynamic(() => import('@/components/FabricWrapsPage'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// Metadata للصفحة
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

// JSON-LD Schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'أغطية القماشية الصوتية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية.',
  image: ['https://www.ceilingsart.sa/newlogo.png'],
  brand: { '@type': 'Organization', name: 'سلينجز ارت', logo: 'https://www.ceilingsart.sa/newlogo.png' },
  offers: {
    '@type': 'Offer',
    url: 'https://www.ceilingsart.sa/acoustic-panels/acoustic-fabric-wraps',
    priceCurrency: 'SAR',
    availability: 'https://schema.org/InStock',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 24.7136, longitude: 46.6753 },
  areaServed: 'السعودية',
};

export default function AcousticFabricWraps() {
  return (
    <PageLayout>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Client Components */}
      <FabricWrapsPage />
      <Footer />
    </PageLayout>
  );
}
