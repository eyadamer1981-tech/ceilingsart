'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;

export function AcousticFabricContent() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Left Column */}
      <MDiv 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        {/* What Are Acoustic Panels */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'ما هي الألواح العازلة؟' : 'What Are Acoustic Panels?'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'الألواح العازلة مصممة لامتصاص الصوت وتقليل الضوضاء وتحسين الراحة وإثراء التصميم الداخلي.'
                : 'Acoustic panels are designed to absorb sound, minimize noise, boost comfort, and enrich interior design.'
              }
            </p>
          </div>
        </div>

        {/* How They Absorb Sound */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'كيف تمتص الصوت' : 'How They Absorb Sound'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'عندما تصل الموجات الصوتية إلى سطح القماش، يتم امتصاصها وتحويلها إلى حرارة، مما يخلق جودة صوت مثلى.'
                : 'When sound waves reach the fabric surface, they are absorbed and converted into heat, creating optimal sound quality.'
              }
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'المواصفات والتركيب' : 'Specs & Installation'}
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• {isRTL ? 'السماكة: 20 مم / 40 مم' : 'Thickness: 20 mm / 40 mm'}</li>
              <li>• {isRTL ? 'المادة: صوف زجاجي (95 كجم/م³)' : 'Material: Glass wool (95 kg/m³)'}</li>
              <li>• {isRTL ? 'NRC: 0.95 – 1.00' : 'NRC: 0.95 – 1.00'}</li>
              <li>• {isRTL ? 'تصنيف الحريق: EN 13501-1:2018' : 'Fire Classification: EN 13501-1:2018'}</li>
              <li>• {isRTL ? 'حجم اللوحة: حتى 120 × 240 سم' : 'Panel Size: Up to 120 x 240 cm'}</li>
              <li>• {isRTL ? 'التركيب: لاصق أو مثبتات ميكانيكية' : 'Installation: Adhesive or mechanical fasteners'}</li>
              <li>• {isRTL ? 'خيارات الألوان: مخطط ألوان واسع' : 'Color options: Wide fabric chart'}</li>
            </ul>
          </div>
        </div>

        {/* Acoustic Barriers */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'الحواجز الصوتية وألواح المكتب' : 'Acoustic Barriers & Desk Panels'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'توفر الحواجز الصوتية وألواح المكتب الخصوصية وتقليل إضافي للضوضاء.'
                : 'Noise barriers and desk panels provide privacy and additional noise reduction.'
              }
            </p>
          </div>
        </div>
      </MDiv>

      {/* Right Column */}
      <MDiv 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        
        {/* Acoustic Performance */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'الأداء الصوتي وفوائد التصميم' : 'Acoustic Performance & Design Benefits'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'تزيل الضوضاء الخلفية المزعجة، وتعزز الاستقرار الصوتي طويل المدى، وتندمج بشكل جميل مع الديكورات الداخلية.'
                : 'Eliminate disruptive background noise, enhance long-term acoustic stability, and blend beautifully with interiors.'
              }
            </p>
          </div>
        </div>

        {/* Where to Use */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'أين تستخدم الألواح العازلة' : 'Where to Use Acoustic Panels'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'المكاتب، الفنادق، المباني العامة، أماكن التعلم، دور السينما المنزلية، والمطاعم.'
                : 'Offices, hotels, public buildings, learning spaces, home theaters, and restaurants.'
              }
            </p>
          </div>
        </div>

        {/* 3D Panel Options */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'خيارات الألواح ثلاثية الأبعاد' : '3D Panel Options'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              {isRTL 
                ? 'تستخدم المتغيرات ثلاثية الأبعاد البناء متعدد الطبقات لامتصاص صوت أكبر واهتمام بصري أكبر.'
                : '3D variants use multilayer construction for greater sound absorption and visual interest.'
              }
            </p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• {isRTL ? 'السماكة: 20-200 مم' : 'Thickness: 20-200 mm'}</li>
              <li>• {isRTL ? 'حجم اللوحة: 60 سم - 120 × 240 سم' : 'Panel Size: 60 cm - 120 x 240 cm'}</li>
              <li>• {isRTL ? 'اللب: صوف زجاجي (95 كجم/م²)' : 'Core: Glass wool (95 kg/m²)'}</li>
              <li>• {isRTL ? 'NRC: 0.95 – 1.00' : 'NRC: 0.95 – 1.00'}</li>
            </ul>
          </div>
        </div>

        {/* Suspended Panels */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {isRTL ? 'الألواح المعلقة' : 'Suspended Acoustic Panels'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isRTL 
                ? 'الألواح المعلقة مثبتة من السقف لامتصاص الصوت.'
                : 'Suspended panels are mounted from the ceiling to absorb sound.'
              }
            </p>
          </div>
        </div>
      </MDiv>
    </div>
  );
}
