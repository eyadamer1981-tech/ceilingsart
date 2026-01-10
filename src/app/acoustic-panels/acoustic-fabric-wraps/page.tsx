// app/fabric-wraps/page.tsx
import PageLayout from '../../components/PageLayout';
import { FabricWrapsPage } from '../../components/FabricWrapsPage';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أغطية القماشية الصوتية | سلينجز ارت - الرياض، السعودية',
  description:
    'اكتشف أغطية القماشية العازلة للصوت من سلينجز ارت في الرياض، السعودية، لتجربة صوتية محسّنة مع تصميم أنيق وجودة أوروبية. خدماتنا متاحة في جميع أنحاء السعودية.',
  alternates: { canonical: 'https://www.ceilingsart.sa/fabric-wraps' },
};

export default function AcousticFabricWraps() {
  return (
    <PageLayout>
      <FabricWrapsPage /> {/* Client Component داخل Server Component */}
      <Footer />
    </PageLayout>
  );
}
