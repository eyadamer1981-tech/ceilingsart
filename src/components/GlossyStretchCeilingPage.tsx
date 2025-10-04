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
    featuresAr: [
      'لمسة نهائية عاكسة عالية اللمعان',
      'سهولة الصيانة والتنظيف',
      'تركيب سلس',
      'بناء PVC خفيف الوزن',
      'مادة مقاومة للحريق',
      'ضمان 10 سنوات'
    ],
    benefits: [
      'Creates illusion of larger space through reflection',
      'Enhances natural and artificial lighting',
      'Easy to clean with standard household products',
      'Resistant to moisture and humidity',
      'Perfect for modern and contemporary designs',
      'Increases property value'
    ],
    benefitsAr: [
      'يخلق وهم مساحة أكبر من خلال الانعكاس',
      'يعزز الإضاءة الطبيعية والاصطناعية',
      'سهل التنظيف بمنتجات منزلية عادية',
      'مقاوم للرطوبة والرطوبة',
      'مثالي للتصاميم الحديثة والمعاصرة',
      'يزيد من قيمة العقار'
    ],
    applications: [
      'Residential living rooms',
      'Commercial offices',
      'Restaurants and cafes',
      'Hotels and hospitality',
      'Retail spaces',
      'Modern kitchens'
    ],
    applicationsAr: [
      'غرف المعيشة السكنية',
      'المكاتب التجارية',
      'المطاعم والمقاهي',
      'الفنادق والضيافة',
      'المساحات التجارية',
      'المطابخ الحديثة'
    ],
    specifications: {
      material: 'High-quality PVC membrane',
      thickness: '0.18mm - 0.25mm',
      colors: 'Wide range of colors available',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    specificationsAr: {
      material: 'غشاء PVC عالي الجودة',
      thickness: '0.18 مم - 0.25 مم',
      colors: 'مجموعة واسعة من الألوان المتاحة',
      warranty: 'ضمان الشركة المصنعة لمدة 10 سنوات',
      installation: 'يتطلب تركيب مهني'
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
