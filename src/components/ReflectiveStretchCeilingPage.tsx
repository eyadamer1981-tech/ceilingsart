import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface ReflectiveStretchCeilingPageProps {
  onBack: () => void;
}

export function ReflectiveStretchCeilingPage({ onBack }: ReflectiveStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'reflective',
    titleEn: 'Reflective Stretch Ceilings',
    titleAr: 'أسقف مشدودة عاكسة',
    descriptionEn: 'Mirror-like reflective stretch ceilings that create stunning visual effects and dramatically enhance lighting throughout any space.',
    descriptionAr: 'أسقف مشدودة عاكسة تشبه المرآة تخلق تأثيرات بصرية مذهلة وتعزز الإضاءة بشكل درامي في أي مساحة.',
    features: [
      'Mirror-like reflective surface',
      'High-gloss finish',
      'Light amplification',
      'Space-enhancing effects',
      'Easy maintenance',
      'Durable construction'
    ],
    featuresAr: [
      'سطح عاكس شبيه بالمرآة',
      'لمسة نهائية عالية اللمعان',
      'تعزيز الإضاءة',
      'تأثيرات تعزّز اتساع المساحة',
      'صيانة سهلة',
      'تصميم متين'
    ],
    benefits: [
      'Creates illusion of larger space',
      'Amplifies natural and artificial light',
      'Adds luxury and sophistication',
      'Perfect for dramatic lighting effects',
      'Easy to clean and maintain',
      'Increases perceived ceiling height'
    ],
    benefitsAr: [
      'يخلق وهم مساحة أكبر',
      'يعزز الإضاءة الطبيعية والاصطناعية',
      'يضيف لمسة فاخرة وراقية',
      'مثالي لتأثيرات إضاءة درامية',
      'سهل التنظيف والصيانة',
      'يزيد من الإحساس بارتفاع السقف'
    ],
    applications: [
      'Luxury hotels',
      'High-end restaurants',
      'Spas and wellness centers',
      'Modern offices',
      'Residential master bedrooms',
      'Retail spaces'
    ],
    applicationsAr: [
      'الفنادق الفاخرة',
      'المطاعم الراقية',
      'مراكز السبا والعافية',
      'المكاتب الحديثة',
      'غرف النوم الرئيسية السكنية',
      'المساحات التجارية'
    ],
    specifications: {
      material: 'Reflective PVC membrane with mirror finish',
      thickness: '0.18mm - 0.25mm',
      colors: 'Silver, gold, and metallic finishes',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    specificationsAr: {
      material: 'غشاء PVC عاكس بلمسة نهائية مرآتية',
      thickness: '0.18 مم - 0.25 مم',
      colors: 'تشطيبات فضية وذهبية ومعدنية',
      warranty: 'ضمان الشركة المصنعة لمدة 10 سنوات',
      installation: 'يتطلب تركيباً مهنياً'
    },
    images: {
      main: '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-museum-1.jpg',
      gallery: [
        '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-museum-1.jpg',
        '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-museum-2.jpg',
        '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-restaurant.jpg',
        '/art-images/stretch-ceiling/reflective/NEWMAT-mirror-spa-.jpg',
        '/art-images/stretch-ceiling/reflective/NEWMAT-silver-mirror.jpg',
        '/art-images/stretch-ceiling/reflective/Merchandise-Mart.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
