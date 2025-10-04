import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface BacklitStretchCeilingPageProps {
  onBack: () => void;
}

export function BacklitStretchCeilingPage({ onBack }: BacklitStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'backlit',
    titleEn: 'Stretch Ceilings with Hidden Lighting',
    titleAr: 'أسقف مشدودة مع إضاءة مخفية',
    descriptionEn: 'Innovative stretch ceilings with integrated hidden lighting systems that create stunning ambient illumination and dramatic visual effects.',
    descriptionAr: 'أسقف مشدودة مبتكرة مع أنظمة إضاءة مخفية متكاملة تخلق إضاءة محيطة مذهلة وتأثيرات بصرية درامية.',
    features: [
      'Integrated LED lighting system',
      'Even light distribution',
      'Energy-efficient LED technology',
      'Dimmable lighting controls',
      'Seamless installation',
      'Customizable light patterns'
    ],
    featuresAr: [
      'نظام إضاءة LED متكامل',
      'توزيع ضوئي متساوي',
      'تقنية LED موفرة للطاقة',
      'تحكم في الإضاءة قابل للتعتيم',
      'تركيب سلس',
      'أنماط إضاءة قابلة للتخصيص'
    ],
    benefits: [
      'Creates dramatic ambient lighting',
      'Reduces need for additional light fixtures',
      'Energy-efficient LED technology',
      'Customizable lighting patterns',
      'Perfect for mood lighting',
      'Modern and sophisticated appearance'
    ],
    benefitsAr: [
      'يخلق إضاءة محيطة درامية',
      'يقلل الحاجة إلى تركيبات إضاءة إضافية',
      'تقنية LED موفرة للطاقة',
      'أنماط إضاءة قابلة للتخصيص',
      'مثالي للإضاءة المزاجية',
      'مظهر حديث وراقي'
    ],
    applications: [
      'Luxury hotels',
      'High-end restaurants',
      'Spa and wellness centers',
      'Cinema and entertainment venues',
      'Modern offices',
      'Residential master bedrooms'
    ],
    applicationsAr: [
      'الفنادق الفاخرة',
      'المطاعم الراقية',
      'مراكز السبا والعافية',
      'دور السينما ومراكز الترفيه',
      'المكاتب الحديثة',
      'غرف النوم الرئيسية السكنية'
    ],
    specifications: {
      material: 'Translucent PVC membrane with LED integration',
      thickness: '0.20mm - 0.30mm',
      colors: 'White, cream, and translucent options',
      warranty: '10-year warranty on ceiling, 5-year on LED system',
      installation: 'Professional installation with electrical integration'
    },
    specificationsAr: {
      material: 'غشاء PVC شفاف مع تكامل LED',
      thickness: '0.20 مم - 0.30 مم',
      colors: 'أبيض، كريمي، وخيارات شفافة',
      warranty: 'ضمان 10 سنوات على السقف، 5 سنوات على نظام LED',
      installation: 'تركيب مهني مع تكامل كهربائي'
    },
    images: {
      main: '/art-images/stretch-ceiling/backlit/pool-spa1.jpg',
      gallery: [
        '/art-images/stretch-ceiling/backlit/pool-spa1.jpg',
        '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-03.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-05.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-08.jpg',
        '/art-images/stretch-ceiling/translucent/LED-1536x1152-1.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
