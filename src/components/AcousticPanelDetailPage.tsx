import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { WoodWoolPanelContent } from './WoodWoolPanelContent';
import { PolyesterPanelContent } from './PolyesterPanelContent';
import { AcousticFabricContent } from './AcousticFabricContent';

interface AcousticPanel {
  _id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  image: string;
  detailImages?: string[];
  featured: boolean;
  rightLeftSection?: boolean;
}

interface AcousticPanelDetailPageProps {
  panel: AcousticPanel;
  onBack: () => void;
}

export function AcousticPanelDetailPage({ panel, onBack }: AcousticPanelDetailPageProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const title = isRTL ? panel.titleAr : panel.titleEn;
  const description = isRTL ? panel.descriptionAr : panel.descriptionEn;

  // Check if this is the polyester panel
  const isPolyesterPanel = panel._id === 'polyester-panels' || panel.category === 'Polyester';
  
  // Check if this is the wood wool panel
  const isWoodWoolPanel = panel._id === 'wood-wool-panels' || panel.category === 'Wood Wool';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Banner Section with Photo */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <ImageWithFallback
          src={panel.image}
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
                {isRTL ? 'وصف المنتج' : 'Product Description'}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Conditional content based on panel type */}
          {isWoodWoolPanel ? (
            <WoodWoolPanelContent />
          ) : isPolyesterPanel ? (
            <PolyesterPanelContent />
          ) : (
            <AcousticFabricContent />
          )}

          {/* Image Gallery Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                {isRTL ? 'معرض الصور' : 'Image Gallery'}
              </h2>
              <p className="text-gray-300 text-lg">
                {isRTL 
                  ? isWoodWoolPanel 
                    ? 'استكشف مجموعة متنوعة من مشاريع ألواح الصوف الخشبي'
                    : isPolyesterPanel
                    ? 'استكشف مجموعة متنوعة من مشاريع ألواح البوليستر العازلة للصوت'
                    : 'استكشف مجموعة متنوعة من مشاريع أغلفة القماش الصوتية'
                  : isWoodWoolPanel
                  ? 'Explore our diverse range of wood wool panel projects'
                  : isPolyesterPanel
                  ? 'Explore our diverse range of polyester acoustic panel projects'
                  : 'Explore our diverse range of acoustic fabric wrap projects'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(isWoodWoolPanel ? [
                '/art-images/acoustic-panels/wood-wool/AS_EnvirocousticWoodWool_InUse_WallPanel_Beveled-1024x768.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Baffles_office_7666_small-1024x683.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_CeilingPanel_office_15-1024x683.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_CeilingTile_school_7594_small-1024x683.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Designs_Custom_15_1000px.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Designs_Custom_16_1000px.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Shapes_Diamond_office_10-1024x683.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Shapes_Hex_office_6549_small-1024x684.jpg',
                '/art-images/acoustic-panels/wood-wool/Baux-wood-wool-panels-ona634-9.jpg'
              ] : isPolyesterPanel ? [
                '/art-images/acoustic-panels/polyester-acoustic/3.Site-Photo-1024x580-1.jpg',
                '/art-images/acoustic-panels/polyester-acoustic/baffle-ceiling-system.webp',
                '/art-images/acoustic-panels/polyester-acoustic/baffles-in-ceiling.webp',
                '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
              ] : [
                '/art-images/acoustic-panels/fabric-wrapped-acoustic/1A-studio-panel-1024x683-1.jpg',
                '/art-images/acoustic-panels/fabric-wrapped-acoustic/AS_Fabrisorb_Fabric-Wrapped-Panels-4-1-1024x768-1.jpg'
              ]).map((imageSrc, index) => (
                <div 
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-700 group cursor-pointer"
                  onClick={() => {
                    window.open(imageSrc, '_blank');
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`${isWoodWoolPanel ? 'Wood Wool' : isPolyesterPanel ? 'Polyester Acoustic' : 'Acoustic Fabric Wrap'} Panel Project ${index + 1}`}
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
            {isRTL ? 'هل تريد معرفة المزيد؟' : 'Want to Know More?'}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {isRTL 
              ? 'تواصل معنا للحصول على استشارة مجانية حول حلول الألواح العازلة المناسبة لمساحتك.'
              : 'Contact us for a free consultation about acoustic panel solutions suitable for your space.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBack}
              className="px-8 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {isRTL ? 'العودة' : 'Back'}
            </Button>
            <Button
              className="px-8 py-3 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
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
