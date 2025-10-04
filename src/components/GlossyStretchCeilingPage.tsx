import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface GlossyStretchCeilingPageProps {
  onBack: () => void;
}

export function GlossyStretchCeilingPage({ onBack }: GlossyStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'glossy',
    titleEn: 'Glossy Stretch Ceilings',
    titleAr: 'أسقف مشدودة لامعة',
    descriptionEn: 'Elegant, modern, and hassle-free glossy stretch ceilings that provide a sophisticated finish perfect for contemporary spaces.',
    descriptionAr: 'أسقف مشدودة لامعة أنيقة وعصرية وخالية من المتاعب توفر مظهراً راقياً مثالي للمساحات المعاصرة.',
    features: [
      'High-gloss reflective finish',
      'Easy maintenance and cleaning',
      'Seamless installation',
      'Lightweight PVC construction',
      'Fire-resistant material',
      '10-year warranty'
    ],
    benefits: [
      'Creates illusion of larger space through reflection',
      'Enhances natural and artificial lighting',
      'Easy to clean with standard household products',
      'Resistant to moisture and humidity',
      'Perfect for modern and contemporary designs',
      'Increases property value'
    ],
    applications: [
      'Residential living rooms',
      'Commercial offices',
      'Restaurants and cafes',
      'Hotels and hospitality',
      'Retail spaces',
      'Modern kitchens'
    ],
    specifications: {
      material: 'High-quality PVC membrane',
      thickness: '0.18mm - 0.25mm',
      colors: 'Wide range of colors available',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    images: {
      main: '/art-images/stretch-ceiling/glossy/luxury-condo-family-room-with-multilevel-red-stretch-ceiling-deutchland.jpg.webp',
      gallery: [
        '/art-images/stretch-ceiling/glossy/High-Gloss-Ceiling-Installation-In-The-Bathroom-1024x690.jpg.webp',
        '/art-images/stretch-ceiling/glossy/High-Gloss-Ceiling-Installation-On-the-Kitchen-1024x894.jpg.webp',
        '/art-images/stretch-ceiling/glossy/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
        '/art-images/stretch-ceiling/glossy/pool-spa1.jpg',
        '/art-images/stretch-ceiling/glossy/pool-spa3.jpg',
        '/art-images/stretch-ceiling/glossy/pool-spa6.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
