import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface FiberOpticStretchCeilingPageProps {
  onBack: () => void;
}

export function FiberOpticStretchCeilingPage({ onBack }: FiberOpticStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'fiber-optic',
    titleEn: 'Fiber Optic Ceilings (Rose)',
    titleAr: 'أسقف الألياف البصرية (الوردة)',
    descriptionEn: 'Magical fiber optic stretch ceilings that create stunning starry night effects and customizable lighting patterns for truly enchanting spaces.',
    descriptionAr: 'أسقف مشدودة بألياف بصرية سحرية تخلق تأثيرات ليلة نجمية مذهلة وأنماط إضاءة قابلة للتخصيص لمساحات ساحرة حقاً.',
    features: [
      'Fiber optic star effects',
      'Customizable star patterns',
      'Energy-efficient LED technology',
      'Twinkling light effects',
      'Remote control operation',
      'Dimmable lighting'
    ],
    benefits: [
      'Creates magical starry atmosphere',
      'Perfect for relaxation spaces',
      'Customizable lighting patterns',
      'Energy-efficient technology',
      'Remote control convenience',
      'Creates unique ambiance'
    ],
    applications: [
      'Bedrooms and nurseries',
      'Spas and wellness centers',
      'Cinema rooms',
      'Restaurants and cafes',
      'Hotels and resorts',
      'Meditation and yoga spaces'
    ],
    specifications: {
      material: 'PVC membrane with integrated fiber optics',
      thickness: '0.20mm - 0.30mm',
      colors: 'White, cream, and translucent options',
      warranty: '10-year warranty on ceiling, 5-year on fiber optics',
      installation: 'Professional installation with fiber optic integration'
    },
    images: {
      main: '/art-images/stretch-ceiling/fiber-optic/star-ceiling2.jpg',
      gallery: [
        '/art-images/stretch-ceiling/fiber-optic/star-ceiling2.jpg',
        '/art-images/stretch-ceiling/fiber-optic/star-ceiling3.jpg',
        '/art-images/stretch-ceiling/fiber-optic/star-ceiling5.jpg',
        '/art-images/stretch-ceiling/fiber-optic/star-ceiling7.jpg',
        '/art-images/stretch-ceiling/fiber-optic/star-ceiling8.jpg',
        '/art-images/stretch-ceiling/fiber-optic/starceiling6.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
