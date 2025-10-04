import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface PrintedStretchCeilingPageProps {
  onBack: () => void;
}

export function PrintedStretchCeilingPage({ onBack }: PrintedStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'printed',
    titleEn: 'Printed Stretch Ceilings',
    titleAr: 'أسقف مشدودة مطبوعة',
    descriptionEn: 'Custom printed stretch ceilings that allow you to create unique designs, patterns, and images directly on the ceiling surface for personalized spaces.',
    descriptionAr: 'أسقف مشدودة مطبوعة مخصصة تسمح لك بإنشاء تصاميم وأنماط وصور فريدة مباشرة على سطح السقف لمساحات شخصية.',
    features: [
      'Custom digital printing',
      'High-resolution image quality',
      'Unlimited design possibilities',
      'Durable print technology',
      'Fade-resistant colors',
      'Professional installation'
    ],
    benefits: [
      'Unlimited design creativity',
      'Perfect for branding',
      'Creates unique spaces',
      'High-quality print resolution',
      'Durable and long-lasting',
      'Easy to customize'
    ],
    applications: [
      'Corporate offices',
      'Restaurants and cafes',
      'Retail spaces',
      'Educational institutions',
      'Healthcare facilities',
      'Residential custom spaces'
    ],
    specifications: {
      material: 'Print-ready PVC membrane',
      thickness: '0.18mm - 0.25mm',
      colors: 'Full color spectrum printing',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    images: {
      main: '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling.jpg',
      gallery: [
        '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling.jpg',
        '/art-images/stretch-ceiling/printed/Imperial-Printed-Stretch-Ceiling-Sekkoya-1.jpg',
        '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling-2.jpg',
        '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling-3.jpg',
        '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling-4.jpg',
        '/art-images/stretch-ceiling/printed/NEWMAT-residential-printed-ceiling-5.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
