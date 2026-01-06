import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'تواصل معنا | سلينجز ارت - اطلب عرض سعر مجاني',
  description:
    'تواصل مع سلينجز ارت للحصول على استشارة مجانية وعرض سعر لتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي. نخدم جميع مناطق السعودية.',
  keywords: [
    'تواصل سلينجز ارت',
    'عرض سعر اسقف فرنسية',
    'استشارة عزل صوتي',
    'رقم سلينجز ارت',
    'contact ceilings art',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/contact',
  },
  openGraph: {
    title: 'تواصل معنا | سلينجز ارت',
    description:
      'تواصل مع سلينجز ارت للحصول على استشارة مجانية وعرض سعر لتركيب الاسقف الفرنسية.',
    url: 'https://www.ceilingsart.sa/contact',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPageClient />;
}
