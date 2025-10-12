import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface AcousticStretchCeilingPageProps {
  onBack: () => void;
}

export function AcousticStretchCeilingPage({ onBack }: AcousticStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'acoustic',
    titleEn: 'Perforated and Acoustic Stretch Ceilings',
    titleAr: 'أسقف مشدودة مثقبة',
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
    featuresAr: [
      'تصميم صوتي مثقّب',
      'امتصاص ممتاز للصوت',
      'قدرات تقليل الضوضاء',
      'مادة مقاومة للحريق',
      'صيانة سهلة',
      'تركيب احترافي'
    ],
    benefits: [
      'Significantly reduces noise levels',
      'Improves acoustic comfort',
      'Perfect for noisy environments',
      'Enhances speech clarity',
      'Reduces echo and reverberation',
      'Creates comfortable acoustic environment'
    ],
    benefitsAr: [
      'يقلل مستويات الضوضاء بشكل ملحوظ',
      'يحسّن الراحة الصوتية',
      'مثالي للبيئات المزدحمة',
      'يعزّز وضوح الكلام',
      'يقلّل الصدى والارتداد',
      'يوفر بيئة صوتية مريحة'
    ],
    applications: [
      'Office buildings',
      'Conference rooms',
      'Educational institutions',
      'Healthcare facilities',
      'Restaurants and cafes',
      'Home theaters'
    ],
    applicationsAr: [
      'المباني المكتبية',
      'غرف المؤتمرات',
      'المؤسسات التعليمية',
      'المرافق الصحية',
      'المطاعم والمقاهي',
      'غرف السينما المنزلية'
    ],
    specifications: {
      material: 'Acoustic PVC membrane with micro-perforations',
      thickness: '0.18mm - 0.25mm',
      colors: 'Wide range of colors with acoustic properties',
      warranty: '10-year manufacturer warranty',
      installation: 'Professional installation with acoustic considerations'
    },
    specificationsAr: {
      material: 'غشاء PVC صوتي بفتحات دقيقة',
      thickness: '0.18 مم - 0.25 مم',
      colors: 'مجموعة واسعة من الألوان بخصائص صوتية',
      warranty: 'ضمان الشركة المصنعة لمدة 10 سنوات',
      installation: 'تركيب مهني مع مراعاة المتطلبات الصوتية'
    },
    images: {
      main: '/8.jpg',
      gallery: [
        '/8.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-002.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-050.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-085.jpg',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-ceiling-mounted-lightbox-scaled.jpg',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
