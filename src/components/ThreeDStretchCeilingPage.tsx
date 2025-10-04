import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface ThreeDStretchCeilingPageProps {
  onBack: () => void;
}

export function ThreeDStretchCeilingPage({ onBack }: ThreeDStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: '3d',
    titleEn: '3D Stretch Ceiling Designs',
    titleAr: 'تصاميم أسقف مشدودة ثلاثية الأبعاد',
    descriptionEn: 'Revolutionary 3D stretch ceiling designs that create stunning three-dimensional effects and architectural depth for truly unique spaces.',
    descriptionAr: 'تصاميم أسقف مشدودة ثلاثية الأبعاد ثورية تخلق تأثيرات ثلاثية الأبعاد مذهلة وعمق معماري لمساحات فريدة حقاً.',
    features: [
      'Three-dimensional design effects',
      'Architectural depth creation',
      'Custom geometric patterns',
      'Lightweight construction',
      'Seamless installation',
      'Modern aesthetic appeal'
    ],
    benefits: [
      'Creates stunning visual impact',
      'Adds architectural interest',
      'Enhances space perception',
      'Perfect for modern interiors',
      'Customizable design patterns',
      'Increases property value'
    ],
    applications: [
      'Luxury hotels',
      'High-end restaurants',
      'Modern offices',
      'Shopping malls',
      'Residential living spaces',
      'Art galleries and museums'
    ],
    specifications: {
      material: 'High-quality PVC membrane with 3D forming',
      thickness: '0.20mm - 0.30mm',
      colors: 'Full color spectrum available',
      warranty: '10-year manufacturer warranty',
      installation: 'Specialized 3D installation techniques'
    },
    images: {
      main: '/art-images/stretch-ceiling/3d/1c8af3ff-4658-4377-920c-1d283e4ba06c.jpg',
      gallery: [
        '/art-images/stretch-ceiling/3d/1c8af3ff-4658-4377-920c-1d283e4ba06c.jpg',
        '/art-images/stretch-ceiling/glossy/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
        '/art-images/stretch-ceiling/glossy/luxury-condo-family-room-with-multilevel-red-stretch-ceiling-deutchland.jpg.webp',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
        '/art-images/stretch-ceiling/translucent/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-museum-1.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
