// app/fabric-wraps/page.tsx
import { FabricWrapsPage } from '../../../components/FabricWrapsPage';
import { Footer } from '../../../components/Footer';
import PageLayout from '../../../components/PageLayout';
import type { Metadata } from 'next';

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
    canonical: 'https://www.ceilingsart.sa/fabric-wraps',
  },
};

export default function AcousticFabricWraps() {
  return (
    <PageLayout>
      <FabricWrapsPage /> {/* client component داخلي */}
      <Footer />
    </PageLayout>
  );
}
