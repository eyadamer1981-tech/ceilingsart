'use client';

import Head from 'next/head';
import { FabricWrapsPage } from '../../../components/FabricWrapsPage';
import { Footer } from '../../../components/Footer';
import PageLayout from '../../../components/PageLayout';

export default function AcousticFabricWraps() {
  const pageTitle = 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية';
  const pageDescription =
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.';
  const canonicalUrl = 'https://www.ceilingsart.sa/fabric-wraps';
  const ogImage = 'https://www.ceilingsart.sa/newlogo.png';

  return (
    <PageLayout>
      <Head>
        {/* Title and Meta */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Ceilings Art" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <FabricWrapsPage />
      <Footer />
    </PageLayout>
  );
}
