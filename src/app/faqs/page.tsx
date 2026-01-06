import type { Metadata } from 'next';
import { FAQsPageClient } from './FAQsPageClient';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | سلينجز ارت - اسقف فرنسية وعزل صوتي',
  description:
    'إجابات على أكثر الأسئلة شيوعاً حول الاسقف الفرنسية المشدودة وألواح العزل الصوتي والأكوستيك. تعرف على أنواع الأسقف والمزايا والأسعار.',
  keywords: [
    'أسئلة عن الاسقف الفرنسية',
    'أسئلة شائعة العزل الصوتي',
    'ما هي الاسقف المشدودة',
    'أسعار الاسقف الفرنسية',
    'FAQ stretch ceilings',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/faqs',
  },
  openGraph: {
    title: 'الأسئلة الشائعة | سلينجز ارت',
    description:
      'إجابات على أكثر الأسئلة شيوعاً حول الاسقف الفرنسية المشدودة وألواح العزل الصوتي.',
    url: 'https://www.ceilingsart.sa/faqs',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
  },
};

// FAQPage Schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ما هي الاسقف الفرنسية المشدودة؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'الأسقف الفرنسية المشدودة هي نظام أسقف حديث مصنوع من مادة PVC أو القماش المشدود على إطار محيطي، توفر تصميمات عصرية وإضاءة مميزة.',
      },
    },
    {
      '@type': 'Question',
      name: 'كم تكلفة تركيب الاسقف الفرنسية؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'تختلف التكلفة حسب نوع السقف والمساحة والتصميم المطلوب. تواصل معنا للحصول على عرض سعر مجاني ومخصص لمشروعك.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي فوائد العزل الصوتي؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'العزل الصوتي يوفر راحة وهدوء داخل المنزل، يقلل الضوضاء الخارجية، ويحسن جودة الصوت في غرف السينما والاستوديوهات.',
      },
    },
  ],
};

export default function FAQs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQsPageClient />
    </>
  );
}
