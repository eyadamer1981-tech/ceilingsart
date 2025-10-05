'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;

export function WoodWoolPanelContent() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-16">
      {/* Wood Wool Panels Main Content */}
      <MDiv 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'ألواح الصوف الخشبي الصوتية' : 'Acoustic Wood Wool Panels'}
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
          {isRTL 
            ? 'ألياف الصوف الخشبي هي نتيجة معالجة خاصة لألياف الخشب الطبيعية مجتمعة مع مادة رابطة لربطها معاً. تتميز هذه الألياف بقدرتها على امتصاص الموجات الصوتية، مما يقلل من الصدى في المساحات الداخلية، ويسيطر على الضوضاء، ويعزز الراحة الصوتية.'
            : 'Wood wool fibers are the result of special processing of natural wood fibers combined with a binder material to hold them together. These fibers are distinguished by their ability to absorb sound waves, which reduces echo in interior spaces, controls noise, and enhances acoustic comfort.'
          }
        </p>
        
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          {isRTL ? 'المميزات' : 'FEATURES'}
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Technical Specifications */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              {isRTL ? 'المواصفات التقنية' : 'Technical Specifications'}
            </h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• {isRTL ? 'السماكة: 15+25+35 مم' : 'Thickness: 15+25+35 mm'}</li>
              <li>• {isRTL ? 'تصنيف الحريق: G1 [B-s1-d0]' : 'Fire Rating: G1 [B-s1-d0]'}</li>
              <li>• {isRTL ? 'الكثافة: 400، 450، 570 كجم/م²' : 'Density: 400, 450, 570 kg/m²'}</li>
              <li>• {isRTL ? 'الصوف الخشبي الصوتي: 1.5 مم' : 'Acoustic Wood Wool: 1.5 mm'}</li>
              <li>• {isRTL ? 'لون الأسمنت: بيج ورمادي' : 'Cement Color: Beige and Gray'}</li>
            </ul>
          </MDiv>
          
          {/* Advantages */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              {isRTL ? 'المزايا' : 'Advantages'}
            </h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• {isRTL ? 'آمن بيئياً' : 'Environmentally safe'}</li>
              <li>• {isRTL ? 'مقاومة عالية للحريق' : 'High fire resistance'}</li>
              <li>• {isRTL ? 'نفاذية بخار عالية' : 'High vapor permeability'}</li>
              <li>• {isRTL ? 'سعة تخزين طاقة حرارية عالية' : 'High thermal energy storage capacity'}</li>
              <li>• {isRTL ? 'سعة امتصاص صوت عالية لتقليل الضوضاء' : 'High sound absorption capacity for noise reduction'}</li>
              <li>• {isRTL ? 'هيكل قابل للقطع الحر مناسب لجميع أنواع أدوات القطع' : 'Free-cut structure suitable for all types of cutting tools'}</li>
              <li>• {isRTL ? 'إنتاج آمن بيئياً' : 'Environmentally safe production'}</li>
              <li>• {isRTL ? 'مقاوم للصقيع' : 'Frost resistant'}</li>
              <li>• {isRTL ? 'متوافق مع مواد مختلفة' : 'Compatible with various materials'}</li>
              <li>• {isRTL ? 'مقاوم للنمل والقوارض' : 'Resistant to ants and rodents'}</li>
            </ul>
          </MDiv>
          
          {/* Applications */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              {isRTL ? 'التطبيقات' : 'Applications'}
            </h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• {isRTL ? 'الأرضيات (للعزل الحراري والصوتي)' : 'Floors (for thermal and sound insulation)'}</li>
              <li>• {isRTL ? 'أسقف صوتية معلقة' : 'Suspended acoustic ceilings'}</li>
              <li>• {isRTL ? 'قوالب غير قابلة للإزالة ألواح الصوف الخشبي الصوتية' : 'Non-removable molds Acoustic Wood Wool Panels'}</li>
              <li>• {isRTL ? 'الجدران المشتركة بين الغرف' : 'Shared walls between rooms'}</li>
              <li>• {isRTL ? 'التطبيقات الصوتية' : 'Acoustic applications'}</li>
              <li>• {isRTL ? 'الجدران' : 'Walls'}</li>
              <li>• {isRTL ? 'الأسقف' : 'Ceilings'}</li>
            </ul>
          </MDiv>
        </div>
      </MDiv>
    </div>
  );
}

