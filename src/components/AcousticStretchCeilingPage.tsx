import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface AcousticStretchCeilingPageProps {
  onBack: () => void;
}

export function AcousticStretchCeilingPage({ onBack }: AcousticStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'acoustic',
    titleEn: 'Perforated and Acoustic Stretch Ceilings',
    titleAr: 'أسقف مشدودة مثقبة وعازلة للصوت',
    descriptionEn: 'Advanced acoustic stretch ceilings with perforated designs that provide excellent sound absorption and noise reduction for optimal acoustic performance.',
    descriptionAr: 'أسقف مشدودة صوتية متقدمة بتصاميم مثقبة توفر امتصاص صوت ممتاز وتقليل الضوضاء لأداء صوتي مثالي.',
    features: [
      'Perforated acoustic design',
      'Excellent sound absorption',
      'Noise reduction capabilities',
      'Fire-resistant material',
      'Easy maintenance',
      'Professional installation'
    ],
    benefits: [
      'Significantly reduces noise levels',
      'Improves acoustic comfort',
      'Perfect for noisy environments',
      'Enhances speech clarity',
      'Reduces echo and reverberation',
      'Creates comfortable acoustic environment'
    ],
    applications: [
      'Office buildings',
      'Conference rooms',
      'Educational institutions',
      'Healthcare facilities',
      'Restaurants and cafes',
      'Home theaters'
    ],
    specifications: {
      material: 'Acoustic PVC membrane with micro-perforations',
      thickness: '0.18mm - 0.25mm',
      colors: 'Wide range of colors with acoustic properties',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation with acoustic considerations'
    },
    images: {
      main: '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
      gallery: [
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-002.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-050.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-085.jpg',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
        '/art-images/stretch-ceiling/acoustic/Qantas-T1-Domestic-scaled.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
