import React from 'react';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface PaperStretchCeilingPageProps {
  onBack: () => void;
}

export function PaperStretchCeilingPage({ onBack }: PaperStretchCeilingPageProps) {
  const ceilingData = {
    ceilingType: 'paper',
    titleEn: 'Paper Stretch Ceilings',
    titleAr: 'ورق السقف الفرنسي',
    descriptionEn: 'Eco-friendly paper stretch ceilings that combine natural aesthetics with modern functionality, perfect for sustainable and environmentally conscious designs.',
    descriptionAr: 'أسقف مشدودة ورقية صديقة للبيئة تجمع بين الجماليات الطبيعية والوظائف الحديثة، مثالية للتصاميم المستدامة والواعية بيئياً.',
    features: [
      'Eco-friendly paper material',
      'Natural aesthetic appeal',
      'Sustainable construction',
      'Easy maintenance',
      'Lightweight design',
      'Professional installation'
    ],
    featuresAr: [
      'مادة ورقية صديقة للبيئة',
      'جاذبية جمالية طبيعية',
      'بناء مستدام',
      'صيانة سهلة',
      'تصميم خفيف الوزن',
      'تركيب احترافي'
    ],
    benefits: [
      'Environmentally friendly',
      'Natural and organic appearance',
      'Sustainable material choice',
      'Easy to maintain',
      'Perfect for eco-designs',
      'Biodegradable material'
    ],
    benefitsAr: [
      'صديق للبيئة',
      'مظهر طبيعي وعضوي',
      'اختيار مادة مستدامة',
      'سهل الصيانة',
      'مثالي للتصاميم البيئية',
      'مادة قابلة للتحلل'
    ],
    applications: [
      'Eco-friendly offices',
      'Sustainable homes',
      'Green buildings',
      'Natural design spaces',
      'Wellness centers',
      'Educational institutions'
    ],
    applicationsAr: [
      'مكاتب صديقة للبيئة',
      'منازل مستدامة',
      'مبانٍ خضراء',
      'مساحات بتصميم طبيعي',
      'مراكز العافية',
      'المؤسسات التعليمية'
    ],
    specifications: {
      material: 'High-quality paper membrane',
      thickness: '0.15mm - 0.20mm',
      colors: 'Natural paper colors and textures',
      warranty: '5-year manufacturer warranty',
      installation: 'Professional installation required'
    },
    specificationsAr: {
      material: 'غشاء ورقي عالي الجودة',
      thickness: '0.15 مم - 0.20 مم',
      colors: 'ألوان وقوام الورق الطبيعية',
      warranty: 'ضمان الشركة المصنعة لمدة 5 سنوات',
      installation: 'يتطلب تركيباً مهنياً'
    },
    images: {
      main: '/art-images/stretch-ceiling/paper/20_96cc8cef-3998-4a91-b05b-4c0cdf9b57c1.webp',
      gallery: [
        '/art-images/stretch-ceiling/paper/20_96cc8cef-3998-4a91-b05b-4c0cdf9b57c1.webp',
        '/art-images/stretch-ceiling/paper/H0c358de409424c30b4b61f00ab0c7464k.png',
        '/art-images/stretch-ceiling/paper/H8674afce5d3d49e5b9b8e28e5522485co.png',
        '/art-images/stretch-ceiling/acoustic/NEWMAT-suspended-panels-museum-scaled.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-002.jpg',
        '/art-images/stretch-ceiling/acoustic/AJC-Syd-Grammar-Library-050.jpg'
      ]
    }
  };

  return <StretchCeilingDetailPage {...ceilingData} onBack={onBack} />;
}
