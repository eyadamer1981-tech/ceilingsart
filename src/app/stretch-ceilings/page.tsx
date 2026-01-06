import type { Metadata } from 'next';
import { StretchCeilingsPageClient } from './StretchCeilingsPageClient';

export const metadata: Metadata = {
  title: 'الاسقف الفرنسية المشدودة | سلينجز ارت بالسعودية',
  description:
    'اكتشف أنواع الاسقف الفرنسية المشدودة من سلينجز ارت: أسقف لامعة، مضيئة، مطبوعة، ثلاثية الأبعاد، سقف روز بالألياف الضوئية، وأسقف أكوستيك بخامات باريسول الأصلية.',
  keywords: [
    'اسقف فرنسية مشدودة',
    'السقف الفرنسي',
    'اسقف مضيئة',
    'stretch ceilings',
    'barrisol saudi',
    'سقف روز',
    'سقف لامع',
    'سقف مطبوع',
    'اسقف 3D',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/stretch-ceilings',
  },
  openGraph: {
    title: 'الاسقف الفرنسية المشدودة | سلينجز ارت',
    description:
      'اكتشف أنواع الاسقف الفرنسية المشدودة: لامعة، مضيئة، مطبوعة، ثلاثية الأبعاد، سقف روز بخامات باريسول.',
    url: 'https://www.ceilingsart.sa/stretch-ceilings',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function StretchCeilings() {
  return <StretchCeilingsPageClient />;
}
