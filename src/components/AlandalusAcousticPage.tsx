'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function ColorSwatch({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-10 h-10 rounded-md border border-white/20 mr-3 mb-3"
      style={{ backgroundColor: color }}
    />
  );
}

export function AlandalusAcousticPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-8 text-center">
          {isRTL ? 'لوح العزل الصوتي - C.Arts' : 'Acoustic Panel - C.Arts'}
        </h1>

        {/* Intro bullets */}
        <div className="max-w-3xl mx-auto text-lg text-white/90 mb-12">
          <ul className="list-none space-y-2 text-center">
            <li>✓ {isRTL ? 'ضمان 5 سنوات على جميع التركيبات' : '5-Year Warranty on all installations'}</li>
            <li>✓ {isRTL ? 'مواد أوروبية بأسعار تنافسية' : 'European Materials at competitive prices'}</li>
            <li>✓ {isRTL ? 'فريق تركيب معتمد بخبرة عالية' : 'Certified Installation Team with expertise'}</li>
          </ul>
        </div>

        {/* Section 1: Wood wool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
          <div className="rounded-lg overflow-hidden bg-gray-700">
            <img
              src="/wood wool.webp"
              alt="Wood wool acoustic panels"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/Installed-Acoustic-Ceiling-1024x612.jpg'; }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{isRTL ? 'ألواح عزل الصوت من الصوف الخشبي' : 'DECIBEL Wood Wool Acoustic Panels'}</h2>
            <p className="text-sm leading-7 text-gray-300">
              {isRTL
                ? 'أعد تصميم مساحتك بأناقة مع ألواح الصوف الخشبي من DECIBEL، بنمط خطوط دائرية مميز. مصنوعة من مزيج من ألياف الخشب المعدنية وأسمنت بورتلاند الأبيض، توفر هذه الألواح عزلًا صوتيًا وحراريًا ممتازًا. تُجمع خيوط الصوف الخشبي بعرض 2 مم بدقة لإنتاج ألواح عالية الجودة ذات مظهر بصري جذاب.'
                : "Reimagine your space with the serene sophistication of DECIBEL's wood wool Acoustic Panels-B.Alandalus, featuring a unique circular lines pattern. Made from a composite of mineralised fir wood wool and white Portland cement, these panels provide superior acoustic and thermal insulation. The 2 mm wide wood wool strands are expertly assembled to form high-quality, visually striking boards."}
            </p>
            <div className="flex flex-wrap mt-4">
              {/* sample colors */}
              {['#D9D9D9','#F08C00','#2F6DBA','#8BC34A','#CDD6E0','#E3B31A'].map((c) => (
                <ColorSwatch key={c} color={c} />
              ))}
            </div>
            <a href="#wood-wool" className="inline-block mt-4 text-sky-300 underline">
              {isRTL ? 'عرض ألواح الصوف الخشبي' : 'View wood wool panels'}
            </a>
          </div>
        </div>

        {/* Section 2: Fabric wraps */}
        <div id="fabric-wraps" className="mb-20">
          <h3 className="text-lg font-semibold mb-3 text-center">
            {isRTL ? 'ألواح قماشية مغلّفة' : 'Fabric-Wrapped Acoustic Panels'}
          </h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-6 text-sm leading-7">
            {isRTL
              ? 'اكتشف ألواحنا القماشية المغلّفة المصنوعة من قلب رغوي بولي يوريثان لعزل صوتي فائق. مغلفة بقماش أنيق بنقش خيطي، تقلل الضوضاء مع إضافة لمسة جمالية لأي مساحة.'
              : 'Discover our fabric-wrapped acoustic panels crafted with a polyurethane acoustic foam core for superior sound absorption. Covered in stylish yarn-patterned fabric, they reduce echoes while adding elegance to any space.'}
          </p>
          <div className="flex flex-wrap justify-center mb-6">
            {['#8C9693','#4BB3B8','#B6A8CB','#ECECEC','#D94848','#A2AC88'].map((c) => (
              <ColorSwatch key={c} color={c} />
            ))}
          </div>
          <div className="rounded-lg overflow-hidden bg-gray-700 max-w-4xl mx-auto">
            <img
              src="/fabrice.webp"
              alt="Fabric-wrapped acoustic panels"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/acusticpanelinhomepage.png'; }}
            />
          </div>
          <div className="text-center mt-4">
            <a href="#fabric-wraps" className="text-sky-300 underline">
              {isRTL ? 'عرض الألواح القماشية' : 'View fabric-wrapped panels'}
            </a>
          </div>
        </div>

        {/* Section 3: PET felt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-lg overflow-hidden bg-gray-700">
            <img
              src="/polyeseter.webp"
              alt="PET felt acoustic panels"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/image.png'; }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">{isRTL ? 'ألواح PET اللبادية الصوتية' : 'PET Felt Acoustic Panels'}</h2>
            <p className="text-sm leading-7 text-gray-300">
              {isRTL
                ? 'احصل على أناقة وأداء مع ألواح PET اللبادية المصنوعة من لباد البوليستر القابل لإعادة التدوير. مصممة لتحسين جودة الصوت وإضفاء أسلوب حديث، وهي مثالية للمكاتب والمدارس والمنازل.'
                : 'Discover elegance and performance with our PET felt acoustic panels, made from recyclable polyester felt. Designed to improve sound quality and add modern style, these panels are ideal for offices, schools, and homes.'}
            </p>
            <div className="flex flex-wrap mt-4">
              {['#E76E6E','#69B3E7','#49A0D9','#B17A12','#5C5C5C','#B8C1C9'].map((c) => (
                <ColorSwatch key={c} color={c} />
              ))}
            </div>
            <a href="#pet-felt" className="inline-block mt-4 text-sky-300 underline">
              {isRTL ? 'عرض ألواح PET اللبادية' : 'View PET felt panels'}
            </a>
          </div>
        </div>

        {/* Divider showcase image */}
        <div className="my-16 max-w-5xl mx-auto rounded-lg overflow-hidden bg-gray-700">
          <img
            src="/Installed-Acoustic-Ceiling-1024x612.jpg"
            alt="Acoustic installation"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/acusticpanelinhomepage.png'; }}
          />
        </div>

        {/* Bottom descriptive sections */}
        <section className="max-w-5xl mx-auto text-center space-y-14">
          <div id="wood-wool">
            <h3 className="text-2xl font-semibold mb-4">
              {isRTL ? 'ألواح الصوف الخشبي العازلة للصوت - الأندلس' : 'Wood Wool Acoustic Panels-B.Alandalus'}
            </h3>
            <p className="text-gray-300 leading-8 text-sm md:text-base">
              {isRTL
                ? 'اكتشف ألواح امتصاص الصوت من الصوف الخشبي، المفتاح لتحويل المساحات المزعجة إلى واحات من الهدوء والإنتاجية. مصنوعة من صوف خشبي عالي الجودة بخصائص صوتية طبيعية وتصميم صديق للبيئة، وهي مثالية للأماكن التي تتطلب وضوح الاتصال والتركيز. معتمدة للحماية من الحرائق وتوفر انعكاسًا للضوء بنسبة تصل إلى 74%، مما يعزز الأمان والسطوع في أي بيئة.'
                : 'Discover our wood wool sound-absorbing panels, the key to transforming noisy spaces into havens of tranquility and productivity. Crafted from high-quality wood wool with natural acoustic properties and eco-friendly design, they are ideal for spaces needing clear communication and focus. Certified for fire protection and with up to 74% light reflection, they enhance safety and brightness in any environment.'}
            </p>
          </div>

          <div id="pet-felt">
            <h3 className="text-2xl font-semibold mb-4">{isRTL ? 'ألواح PET اللبادية الصوتية' : 'PET Felt Acoustic Panels'}</h3>
            <p className="text-gray-300 leading-8 text-sm md:text-base">
              {isRTL
                ? 'اكتشف المزيج المثالي بين الأناقة والأداء الصوتي مع ألواح PET اللبادية. مصنوعة من لباد بوليستر قابل لإعادة التدوير، تحسن جودة الصوت مع إضافة لمسة متطورة. متوفرة بألوان وأنماط تثقيب متعددة، مثالية للمكاتب والمدارس والمنازل والفنادق والمطاعم، وتوفر امتصاصًا للصوت صديقًا للبيئة ودائمًا.'
                : 'Discover the perfect blend of elegance and acoustic performance with our PET felt acoustic panels. Made from recyclable polyester felt, they improve sound quality while adding a sophisticated look. Available in various colours and perforation designs, they are perfect for offices, studios, hotels, restaurants, and homes, offering eco-friendly and durable sound absorption.'}
            </p>
          </div>

          <div id="fabric-wrapped">
            <h3 className="text-2xl font-semibold mb-4">{isRTL ? 'ألواح صوتية مغطاة بالقماش' : 'Fabric-Wrapped Acoustic Panels'}</h3>
            <p className="text-gray-300 leading-8 text-sm md:text-base">
              {isRTL
                ? 'استكشف ألواحنا القماشية المتميزة، المصنوعة من قلب رغوي بولي يوريثان لعزل صوتي فائق. مع نسيج خارجي أنيق بنمط خيوط، تقلل هذه الألواح من الصدى مع تعزيز التصميم الداخلي. متاحة بألوان وأحجام وتشطيبات متعددة، وهي مثالية للمكاتب والمتاجر والاستوديوهات والمطاعم والمنازل.'
                : 'Explore our premium fabric-wrapped acoustic panels, crafted with a polyurethane acoustic foam core for superior sound absorption. Featuring a stylish yarn-patterned textile cover, they reduce echoes while enhancing any interior design. Available in multiple colours, sizes, and finishes, these panels are perfect for offices, stores, studios, restaurants, and home cinemas.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AlandalusAcousticPage;


