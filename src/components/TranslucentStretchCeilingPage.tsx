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
    featuresAr: [
      'مادة ناقلة للضوء',
      'انتشار طبيعي للضوء',
      'الحفاظ على الخصوصية',
      'إضاءة موفرة للطاقة',
      'حماية من الأشعة فوق البنفسجية',
      'صيانة سهلة'
    ],
    benefits: [
      'Maximizes natural light',
      'Reduces energy consumption',
      'Creates soft, diffused lighting',
      'Maintains privacy',
      'Perfect for daylighting',
      'Enhances well-being'
    ],
    benefitsAr: [
      'تعظيم الاستفادة من الضوء الطبيعي',
      'تقليل استهلاك الطاقة',
      'يخلق إضاءة ناعمة ومنتشرة',
      'يحافظ على الخصوصية',
      'مثالي للإضاءة الطبيعية',
      'يعزز الشعور بالراحة'
    ],
    applications: [
      'Office buildings',
      'Educational institutions',
      'Healthcare facilities',
      'Shopping malls',
      'Residential spaces',
      'Green buildings'
    ],
    applicationsAr: [
      'المباني المكتبية',
      'المؤسسات التعليمية',
      'المرافق الصحية',
      'مراكز التسوق',
      'المساحات السكنية',
      'المباني الخضراء'
    ],
    specifications: {
      material: 'Translucent PVC membrane',
      thickness: '0.20mm - 0.30mm',
      colors: 'White, cream, and translucent options',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    specificationsAr: {
      material: 'غشاء PVC شفاف ناقل للضوء',
      thickness: '0.20 مم - 0.30 مم',
      colors: 'أبيض، كريمي، وخيارات شفافة',
      warranty: 'ضمان الشركة المصنعة لمدة 10 سنوات',
      installation: 'يتطلب تركيباً مهنياً'
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
