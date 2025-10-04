import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface MatteStretchCeilingPageProps {
  onBack: () => void;
}

export function MatteStretchCeilingPage({ onBack }: MatteStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'matte',
    titleEn: 'Matte Stretch Ceiling Designs',
    titleAr: 'تصاميم أسقف مشدودة غير لامعة',
    descriptionEn: 'Elegant matte finish stretch ceilings that provide a sophisticated, non-reflective surface perfect for contemporary and minimalist designs.',
    descriptionAr: 'أسقف مشدودة بلمسة نهائية غير لامعة أنيقة توفر سطحاً راقياً غير عاكس مثالي للتصاميم المعاصرة والحديثة.',
    features: [
      'Non-reflective matte finish',
      'Sophisticated appearance',
      'Minimalist design compatibility',
      'Easy maintenance',
      'Lightweight construction',
      'Professional installation'
    ],
    benefits: [
      'Perfect for minimalist designs',
      'Reduces glare and reflections',
      'Creates calm atmosphere',
      'Easy to maintain',
      'Complements modern furniture',
      'Versatile color options'
    ],
    applications: [
      'Modern offices',
      'Contemporary homes',
      'Minimalist restaurants',
      'Healthcare facilities',
      'Educational institutions',
      'Art galleries'
    ],
    specifications: {
      material: 'Matte finish PVC membrane',
      thickness: '0.18mm - 0.25mm',
      colors: 'Wide range of matte colors',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    images: {
      main: '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
      gallery: [
        '/art-images/stretch-ceiling/matte/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-002.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-050.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-085.jpg',
        '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
