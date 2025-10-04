import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface TranslucentStretchCeilingPageProps {
  onBack: () => void;
}

export function TranslucentStretchCeilingPage({ onBack }: TranslucentStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'translucent',
    titleEn: 'Light Transmitting Stretch Ceilings',
    titleAr: 'أسقف مشدودة نافذة للضوء',
    descriptionEn: 'Innovative translucent stretch ceilings that allow natural light to pass through while maintaining privacy and creating beautiful diffused lighting effects.',
    descriptionAr: 'أسقف مشدودة شفافة مبتكرة تسمح للضوء الطبيعي بالمرور مع الحفاظ على الخصوصية وخلق تأثيرات إضاءة منتشرة جميلة.',
    features: [
      'Light-transmitting material',
      'Natural light diffusion',
      'Privacy maintenance',
      'Energy-efficient lighting',
      'UV protection',
      'Easy maintenance'
    ],
    benefits: [
      'Maximizes natural light',
      'Reduces energy consumption',
      'Creates soft, diffused lighting',
      'Maintains privacy',
      'Perfect for daylighting',
      'Enhances well-being'
    ],
    applications: [
      'Office buildings',
      'Educational institutions',
      'Healthcare facilities',
      'Shopping malls',
      'Residential spaces',
      'Green buildings'
    ],
    specifications: {
      material: 'Translucent PVC membrane',
      thickness: '0.20mm - 0.30mm',
      colors: 'White, cream, and translucent options',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    images: {
      main: '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
      gallery: [
        '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-03.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-05.jpg',
        '/art-images/stretch-ceiling/translucent/lightboxes-08.jpg',
        '/art-images/stretch-ceiling/translucent/LED-1536x1152-1.jpg',
        '/art-images/stretch-ceiling/translucent/NEWMAT-suspended-panels-museum-scaled.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
