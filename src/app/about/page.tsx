import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'من نحن | سلينجز ارت - الاسقف الفرنسية والعزل الصوتي',
  description:
    'تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية. خبرة واسعة وجودة أوروبية.',
  keywords: [
    'من نحن سلينجز ارت',
    'شركة اسقف فرنسية',
    'خبراء العزل الصوتي',
    'Ceilings Art about us',
  ],
  alternates: {
    canonical: 'https://www.ceilingsart.sa/about',
  },
  openGraph: {
    title: 'من نحن | سلينجز ارت',
    description:
      'تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية.',
    url: 'https://www.ceilingsart.sa/about',
    siteName: 'Ceilings Art',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://www.ceilingsart.sa/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'سلينجز ارت'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'من نحن | سلينجز ارت',
    description:
      'تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية.',
    images: ['https://www.ceilingsart.sa/newlogo.png']
  },
};

export default function About() {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "سلينجز ارت",
    "description": "تعرف على شركة سلينجز ارت الرائدة في تصميم وتركيب الاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية.",
    "url": "https://www.ceilingsart.sa/about",
    "publisher": {
      "@type": "Organization",
      "name": "سلينجز ارت",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ceilingsart.sa/newlogo.png"
      }
    },
    "inLanguage": "ar-SA"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
