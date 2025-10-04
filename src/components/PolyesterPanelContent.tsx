import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from './ui/MotionWrapper';

export function PolyesterPanelContent() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="space-y-16">
      {/* Polyester Acoustic Panels Felt Acoustic Wall Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'ألواح الجدار الصوتية المصنوعة من اللباد' : 'Polyester Acoustic Panels Felt Acoustic Wall Panel'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'ألواح الجدار الصوتية المصنوعة من اللباد توفر حلاً مثالياً للمساحات التجارية والعامة مع أحجام مختلفة متاحة. توفر هذه المجموعة مساحة عمل مخصصة ومتوازنة صوتياً. يمكن تعديلها ونقلها لتناسب هيكل بيئات المكتب الحديثة والسريعة والديناميكية.'
            : 'Acoustic wall panels made from felt offer an ideal solution for commercial and public spaces with various sizes available. This collection provides a dedicated and acoustically balanced workspace. They can be adjusted and moved to suit the structure of modern, fast-paced, and dynamic office environments.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'المواصفات:' : 'Specifications:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% بولي إيثيلين تيريفثاليت معاد تدويره (PET)' : 'Raw Material: 65% Recycled Polyethylene Terephthalate (PET)'}</li>
          <li>• {isRTL ? 'حجم اللوحة: 72×72 سم، 144×72 سم، شكل مخصص' : 'Panel Size: 72×72 cm, 144×72 cm, Custom Shape'}</li>
          <li>• {isRTL ? 'السماكة: (6 مم، 9 مم، 12 مم)' : 'Thickness: (6 mm, 9 mm, 12 mm)'}</li>
          <li>• {isRTL ? 'تفاصيل الحافة: نصف قطر، مائل، قطع مستقيم، قطع مستوى' : 'Edge Details: Radius, bevel, straight cut, level cut'}</li>
          <li>• {isRTL ? 'الأداء الصوتي: NRC 0.85 (±)' : 'Acoustic Performance: NRC 0.85 (±)'}</li>
          <li>• {isRTL ? 'تصنيف مقاومة الحريق: 1G (مكافئ لـ 0D1-S-B)' : 'Fire Resistance Rating: 1G (Equivalent to 0D1-S-B)'}</li>
          <li>• {isRTL ? 'أداء تدفق الهواء بسماكة 20 مم: 0.70 NRC (±)' : 'Airflow Performance at 20 mm Thickness: 0.70 NRC (±)'}</li>
          <li>• {isRTL ? 'اللون الأساسي: أبيض، رمادي فاتح، رمادي داكن. خيارات الصباغة أو تغطية القماش الصوتي متاحة.' : 'Primary Color: White, Light Gray, Dark Gray. Dyeing or acoustic fabric covering options available.'}</li>
          <li>• {isRTL ? 'طرق التركيب: التركيب بالغراء ونظام التثبيت Clips-Z' : 'Installation Methods: Adhesive installation and Clips-Z mounting system.'}</li>
        </ul>
      </motion.div>

      {/* 3D Acoustic Felt Panels */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'ألواح اللباد الصوتية ثلاثية الأبعاد' : '3D Acoustic Felt Panels'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'تضيف هذه الألواح عمقاً وميزة لمسية للجدران، مما يقلل من انعكاسات الصوت في المساحة ويساعد على سماع الصوت بوضوح وتميز أكبر. بفضل تصميمها ثلاثي الأبعاد، تعزز الغرف بالعمق والجاذبية البصرية مع توفير امتصاص الصوت أيضاً، مما يخلق بيئة مريحة وسلمية.'
            : 'These panels add depth and a tactile feature to walls, reducing sound reflections within the space and helping to hear sound more clearly and distinctly. Thanks to their 3D design, they enhance rooms with depth and visual appeal while also providing sound absorption, creating a comfortable and peaceful environment.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'المواصفات:' : 'Specifications:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% بولي إيثيلين تيريفثاليت معاد تدويره (PET)' : 'Raw Material: 65% recycled polyethylene terephthalate (PET)'}</li>
          <li>• {isRTL ? 'الأبعاد: أبعاد قالب مخصص متاحة' : 'Dimensions: Custom mold dimensions available'}</li>
          <li>• {isRTL ? 'السماكة: بين 20 مم و 200 مم (±)' : 'Thickness: Between 20 mm and 200 mm (±)'}</li>
          <li>• {isRTL ? 'أداء الألواح الصوتية البوليستر: 0.50 NRC (±)' : 'Polyester Acoustic Panels Performance: 0.50 NRC (±)'}</li>
          <li>• {isRTL ? 'تصنيف مقاومة الحريق: 1G (مكافئ لـ 0D1-S-B)' : 'Fire Resistance Rating: 1G (equivalent to 0D1-S-B)'}</li>
          <li>• {isRTL ? 'أداء فجوة الهواء بسماكة 20 مم: 0.70 NRC (±)' : 'Air Gap Performance with 20 mm thickness: 0.70 NRC (±)'}</li>
          <li>• {isRTL ? 'اللون الأساسي: أبيض، رمادي فاتح، رمادي داكن. خيار التلوين متاح.' : 'Base Color: White, Light Grey, Dark Grey. Coloring option available.'}</li>
          <li>• {isRTL ? 'طرق التركيب: التطبيق بالغراء ونظام التثبيت clips-Z' : 'Installation Methods: Adhesive application and clips-Z mounting system.'}</li>
        </ul>
      </motion.div>

      {/* Acoustic Table Divider Panels */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'ألواح تقسيم الطاولة الصوتية' : 'Acoustic Table Divider Panels'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'تضيف هذه الألواح الصوتية البوليستر عمقاً وميزات لمسية للجدران، مما يقلل من انعكاسات الصوت في المساحة ويساعد على سماع الصوت بوضوح ونقاء أكبر. بفضل تصميمها ثلاثي الأبعاد، تعطي الغرف عمقاً وجاذبية بصرية، مع التفوق في امتصاص الصوت، مما يخلق بيئة مريحة وهادئة. يمكنك تركيب هذه الألواح الصوتية التقسيمية الزخرفية على طاولتك في أي اتجاه مرغوب، سواء في الجانب الأمامي أو الخلفي. مصممة لامتصاص الصوت بفعالية، مما يساهم في جو سلمي وممتع في المساحة.'
            : 'These Polyester Acoustic Panels add depth and tactile features to the walls, reducing sound reflections in the space and helping to hear the sound more clearly and cleanly. Thanks to their three-dimensional design, they give rooms depth and visual appeal, while excelling at sound absorption, creating a comfortable and calm environment. You can install these decorative acoustic divider panels on your table in any desired orientation, whether on the front or back side. These panels are designed to absorb sound effectively, contributing to a peaceful and pleasant atmosphere in the space.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'المواصفات:' : 'Specifications:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% بولي إيثيلين تيريفثاليت معاد تدويره (PET)' : 'Raw Material: 65% recycled polyethylene terephthalate (PET)'}</li>
          <li>• {isRTL ? 'الكثافة: 3300 جم/م² لـ 18 مم، 4400 جم/م² لـ 24 مم ±' : 'Density: 3300 g/m² for 18 mm, 4400 g/m² for 24 mm ±'}</li>
          <li>• {isRTL ? 'حجم اللوحة: 140×40 سم، 70×40 سم ±' : 'Panel Size: 140×40 cm, 70×40 cm ±'}</li>
          <li>• {isRTL ? 'السماكة: 18 مم، 21 مم، 24 مم ±' : 'Thickness: 18 mm, 21 mm, 24 mm ±'}</li>
          <li>• {isRTL ? 'تفاصيل الحافة: شكل منحني وقطع مستقيم ±' : 'Edge Details: Curved shape and straight cut ±'}</li>
          <li>• {isRTL ? 'اللون الأساسي: محدود بالأبيض والرمادي الفاتح والرمادي الداكن. خيار متاح لتغطية السطح: تغطية القماش الصوتي.' : 'Primary Color: Limited to white, light gray, and dark gray. Available option for surface coverage: Acoustic fabric covering.'}</li>
          <li>• {isRTL ? 'أداء الألواح الصوتية البوليستر: (±) 0.85 NRC' : 'Polyester Acoustic Panels Performance: (±) 0.85 NRC'}</li>
          <li>• {isRTL ? 'مقاومة الحريق: 1G مكافئ لـ 0D1-S-B' : 'Fire Resistance: 1G equivalent to 0D1-S-B'}</li>
          <li>• {isRTL ? 'التطبيق: قدم التقسيم، التركيب بالمسامير.' : 'Application: Divider foot, installation with screws.'}</li>
        </ul>
      </motion.div>

      {/* Acoustic Felt Cassette Ceiling Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'لوح السقف المعلق من اللباد الصوتي' : 'Acoustic Felt Cassette Ceiling Panel'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'يوفر نظام لوح السقف المعلق من اللباد هياكل مرنة لتحقيق أداء صوتي متقدم وتأثيرات تصميم بسهولة. مثالي للمساحات التجارية والعامة، متاح بأحجام مختلفة.'
            : 'The floating felt ceiling panel system provides flexible structures to achieve advanced acoustic performance and design effects with ease. It is ideal for commercial and public spaces, available in various sizes.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'مواصفات الألواح الصوتية البوليستر:' : 'Specifications Polyester Acoustic Panels:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% PET معاد تدويره (بولي إيثيلين تيريفثاليت)' : 'Raw Material: 65% recycled PET (Polyethylene Terephthalate)'}</li>
          <li>• {isRTL ? 'الكثافة: 2200 جم/م² ±' : 'Density: 2200 g/m² ±'}</li>
          <li>• {isRTL ? 'السماكة: 6 مم، 9 مم، 12 مم ±' : 'Thickness: 6 mm, 9 mm, 12 mm ±'}</li>
          <li>• {isRTL ? 'الحجم: 750×750 مم ±' : 'Size: 750×750 mm ±'}</li>
          <li>• {isRTL ? 'تصنيف الحريق: 1G، مكافئ لـ 0D1-S-B' : 'Fire Rating: 1G, equivalent to 0D1-S-B'}</li>
          <li>• {isRTL ? 'اللون الأساسي: محدود بالأبيض والرمادي الفاتح والرمادي الداكن. تغطية القماش الصوتي اختيارية.' : 'Base Color: Limited to white, light gray, and dark gray. Acoustic fabric covering is optional.'}</li>
          <li>• {isRTL ? 'التطبيق: تعليق لوح السقف باستخدام الملحقات' : 'Application: Ceiling panel suspension using accessories'}</li>
        </ul>
      </motion.div>

      {/* Acoustic Ceiling Panel Made of Felt */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'لوح السقف الصوتي المصنوع من اللباد' : 'Acoustic Ceiling Panel Made of Felt'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'لوح السقف المزود بإضاءة LED يوفر هياكل مرنة للأداء الصوتي المتقدم وتأثيرات التصميم بسهولة. مثالي للمساحات التجارية والعامة، يوفر خيارات أحجام مختلفة.'
            : 'The ceiling panel equipped with LED lighting provides flexible structures for advanced acoustic performance and design effects with ease. It is ideal for commercial and public spaces, offering various size options.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'المواصفات:' : 'Specifications:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% PET معاد تدويره (بولي إيثيلين تيريفثاليت)' : 'Raw Material: 65% recycled PET (Polyethylene Terephthalate)'}</li>
          <li>• {isRTL ? 'الكثافة: 2200 جم/م² ±' : 'Density: 2200 g/m² ±'}</li>
          <li>• {isRTL ? 'السماكة: 12 مم ±' : 'Thickness: 12 mm ±'}</li>
          <li>• {isRTL ? 'حجم اللوحة: 3000×150 مم ±' : 'Panel Size: 3000×150 mm ±'}</li>
          <li>• {isRTL ? 'أداء الألواح الصوتية البوليستر: 0.75 NRC ±' : 'Polyester Acoustic Panels Performance: 0.75 NRC ±'}</li>
          <li>• {isRTL ? 'مقاومة الحريق: 1G مكافئ لـ 0D1-S-B' : 'Fire Resistance: 1G equivalent to 0D1-S-B'}</li>
          <li>• {isRTL ? 'اللون الأساسي: محدود بالأبيض والرمادي الفاتح والرمادي الداكن. تغطية القماش الصوتي اختيارية.' : 'Primary Color: Limited to white, light gray, and dark gray. Acoustic fabric covering optional.'}</li>
          <li>• {isRTL ? 'التطبيق: الألواح معلقة من السقف باستخدام الملحقات.' : 'Application: Panels are suspended from the ceiling using accessories.'}</li>
        </ul>
      </motion.div>

      {/* Acoustic Floating Ceiling Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isRTL ? 'لوح السقف المعلق الصوتي' : 'Acoustic Floating Ceiling Panel'}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {isRTL 
            ? 'ألواح السقف المعلقة المغطاة باللباد الصوتي لها تصميم معاصر للغاية يناسب تماماً المنتجات الأخرى في البيئة.'
            : 'The floating ceiling panels covered with acoustic felt have a highly contemporary design that fits perfectly with other products in the environment.'
          }
        </p>
        <h3 className="text-lg font-semibold text-white mb-4">
          {isRTL ? 'مواصفات الألواح الصوتية البوليستر:' : 'Specifications Polyester Acoustic Panels:'}
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• {isRTL ? 'المادة الخام: 65% PET معاد تدويره (بولي إيثيلين تيريفثاليت)' : 'Raw Material: 65% recycled PET (Polyethylene Terephthalate)'}</li>
          <li>• {isRTL ? 'الكثافة: 2200 جم/م² ±' : 'Density: 2200 g/m² ±'}</li>
          <li>• {isRTL ? 'السماكة: 9 مم، 12 مم ±' : 'Thickness: 9 mm, 12 mm ±'}</li>
          <li>• {isRTL ? 'الأبعاد: 600×600 مم ±' : 'Dimensions: 600×600 mm ±'}</li>
          <li>• {isRTL ? 'الأداء الصوتي: 0.75 NRC ±' : 'Acoustic Performance: 0.75 NRC ±'}</li>
          <li>• {isRTL ? 'تصنيف الحريق: 1G (مكافئ لـ 0D1-S-B)' : 'Fire Rating: 1G (Equivalent to 0D1-S-B)'}</li>
          <li>• {isRTL ? 'اللون الأساسي: محدود بالأبيض والرمادي الفاتح والرمادي الداكن. تغطية القماش الصوتي اختيارية.' : 'Primary Color: Limited to white, light gray, and dark gray. Acoustic fabric covering is optional.'}</li>
          <li>• {isRTL ? 'التطبيق: ألواح السقف معلقة باستخدام الملحقات.' : 'Application: Ceiling panels suspended using accessories.'}</li>
        </ul>
      </motion.div>
    </div>
  );
}

