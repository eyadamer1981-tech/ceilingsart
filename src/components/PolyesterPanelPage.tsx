import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { PolyesterPanelContent } from './PolyesterPanelContent';

export function PolyesterPanelPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const titleEn = 'Polyester Acoustic Panels';
  const titleAr = 'الألواح العازلة البوليستر';
  const descriptionEn = 'Acoustic panels made from high-density polyester fibers for excellent sound absorption and moisture resistance. Ideal for humid environments and high-traffic areas.';
  const descriptionAr = 'ألواح عازلة مصنوعة من ألياف البوليستر عالية الكثافة لامتصاص الصوت الممتاز ومقاومة الرطوبة. مثالية للبيئات الرطبة والمناطق عالية الحركة.';

  const title = isRTL ? titleAr : titleEn;
  const description = isRTL ? descriptionAr : descriptionEn;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Banner Section with Photo */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <ImageWithFallback
          src="/2.jpg"
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-wide">
              {title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Display fetched description */}
          <div className="mb-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('productDescription')}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Polyester Panel Content */}
          <PolyesterPanelContent />

          {/* Image Gallery Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                {isRTL ? 'معرض الصور' : 'Image Gallery'}
              </h2>
              <p className="text-gray-300 text-lg">
                {isRTL 
                  ? 'استكشف مجموعة متنوعة من مشاريع ألواح البوليستر العازلة للصوت'
                  : 'Explore our diverse range of polyester acoustic panel projects'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.46_1a2e5647.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.46_885741ea.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.47_0e12d4fb.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.47_31a375ed.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.48_1d651bd4.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.48_26d71e8d.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.48_ea77f8c0.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.49_916786da.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.50_a328eb55.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.50_c601f562.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.51_07f3f5d1.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.51_7d9097fc.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.52_26732242.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.52_2d56db01.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.53_8f4e4320.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.53_a8357a71.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.15_392ef408.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.16_33bcce48.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.16_d3e721b8.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.17_a142dcd4.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.17_e05eb3ef.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.20_1f54b4ca.jpg',
                '/acustic gallery/WhatsApp Image 2025-10-12 at 20.17.20_9a2cd507.jpg',
                '/art-images/acoustic-panels/polyester-acoustic/3.Site-Photo-1024x580-1.jpg',
                '/art-images/acoustic-panels/polyester-acoustic/baffle-ceiling-system.webp',
                '/art-images/acoustic-panels/polyester-acoustic/baffles-in-ceiling.webp',
                '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
              ].map((imageSrc, index) => (
                <div 
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-700 group cursor-pointer"
                  onClick={() => {
                    window.open(imageSrc, '_blank');
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`Polyester Acoustic Panel Project ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-acoustic.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('wantToKnowMore')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('contactUsForConsultation')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              className="px-8 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {t('back')}
            </Button>
            <Button
              className="px-8 py-3 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        {/* Phone Button */}
        <button 
          onClick={() => window.open('tel:+966575474699', '_self')}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="Call Us"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </button>
        
        {/* WhatsApp Button */}
        <button 
          onClick={() => window.open('https://wa.me/966575474699', '_blank')}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="WhatsApp Us"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
