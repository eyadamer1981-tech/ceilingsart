'use client';

import { FabricWrapsPage } from '../../../components/FabricWrapsPage';
import { Footer } from '../../../components/Footer';
import PageLayout from '../../../components/PageLayout';
import { Metadata } from 'next';

/* =======================
   SEO Metadata
======================= */
export const metadata: Metadata = {
  title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
  alternates: {
    canonical: 'https://www.ceilingsart.sa/fabric-wraps',
  },
  openGraph: {
    title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
    description:
      'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
    url: 'https://www.ceilingsart.sa/fabric-wraps',
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
    title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
    description:
      'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
    images: [
      {
        url: 'https://www.ceilingsart.sa/newlogo.png',
        alt: 'أغطية قماشية صوتية - سلينجز ارت - الرياض',
      },
    ],
  },
};

/* =======================
   Structured Data (JSON-LD)
======================= */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'أغطية القماشية الصوتية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
  image: ['https://www.ceilingsart.sa/newlogo.png'],
  brand: {
    '@type': 'Organization',
    name: 'سلينجز ارت',
    logo: 'https://www.ceilingsart.sa/newlogo.png',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.ceilingsart.sa/fabric-wraps',
    priceCurrency: 'SAR',
    availability: 'https://schema.org/InStock',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.7136, // الرياض
    longitude: 46.6753,
  },
  areaServed: 'السعودية',
};

export default function AcousticFabricWraps() {
  return (
    <PageLayout>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Content */}
      <FabricWrapsPage />
      <Footer />
    </PageLayout>
  );
}
