import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  onPageChange: (page: string) => void;
}

export function MobileMenu({ isOpen, onClose, currentPage = 'HOME', onPageChange }: MobileMenuProps) {
  const { t, isRTL } = useLanguage();
  const showAdmin = typeof window !== 'undefined' && localStorage.getItem('hasAdminAccess') === 'true';
  const [isAcousticDropdownOpen, setIsAcousticDropdownOpen] = useState(false);
  const [isStretchDropdownOpen, setIsStretchDropdownOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Re-enable body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);
  
  const navItems = [
    { key: 'HOME', translation: t('home') },
    { key: 'ABOUT US', translation: t('about') },
    { 
      key: 'ACOUSTIC PANELS', 
      translation: t('acousticPanels'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'ACOUSTIC_PANELS_ALANDALUS', translation: t('acousticPanelsAlandalus') },
        { key: 'FLOOR_INSULATION', translation: t('floorInsulation') },
        { key: 'POLYESTER_ACOUSTIC', translation: t('polyesterAcousticPanels') },
        { key: 'ACOUSTIC_FABRIC_WRAPS', translation: t('acousticFabricWraps') }
      ]
    },
    { 
      key: 'STRETCH CEILINGS', 
      translation: t('stretchCeilings'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'STRETCH_GLOSSY', translation: t('stretchGlossy') },
        { key: 'STRETCH_HIDDEN_LIGHTING', translation: t('stretchHiddenLighting') },
        { key: 'STRETCH_PERFORATED_ACOUSTIC', translation: t('stretchPerforatedAcoustic') },
        { key: 'STRETCH_3D', translation: t('stretch3D') },
        { key: 'STRETCH_REFLECTIVE', translation: t('stretchReflective') },
        { key: 'STRETCH_MATTE', translation: t('stretchMatte') },
        { key: 'STRETCH_FIBER_OPTIC_ROSE', translation: t('stretchFiberOpticRose') },
        { key: 'STRETCH_PRINTED', translation: t('stretchPrinted') },
        { key: 'STRETCH_LIGHT_TRANSMITTING', translation: t('stretchLightTransmitting') },
        { key: 'STRETCH_PAPER', translation: t('stretchPaper') }
      ]
    },
    { key: 'OUR WORK', translation: t('ourWork') },
    { key: 'FAQS', translation: t('faqs') },
    { key: 'BLOG', translation: t('blog') },
    { key: 'CONTACT US', translation: t('contact') }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 lg:hidden overflow-hidden">
      {/* Background with custom color */}
      <div className="absolute inset-0" style={{ backgroundColor: '#383D43' }}></div>

      {/* Background image with design-specified transform */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/background-blob-service-1.png.png"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1000.09px',
            height: '1100.64px',
            maxWidth: 'none',
            transform: 'translate(-400px, -60px) rotate(10.3deg)',
            opacity: 1,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Menu Items */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          
          {navItems.map((item, index) => {
            if (item.hasDropdown) {
              const isAcoustic = item.key === 'ACOUSTIC PANELS';
              const isStretch = item.key === 'STRETCH CEILINGS';
              const isDropdownOpen = isAcoustic ? isAcousticDropdownOpen : isStretchDropdownOpen;
              const setDropdownOpen = isAcoustic ? setIsAcousticDropdownOpen : setIsStretchDropdownOpen;
              
              return (
                <div key={item.key} className="w-full flex flex-col items-center">
                  <div className="flex items-center justify-center w-full max-w-xs">
                    <button
                      onClick={() => {
                        onPageChange(item.key);
                        onClose();
                      }}
                      className={`text-2xl font-medium uppercase tracking-widest transition-colors hover:text-orange-400 text-center ${
                        currentPage === item.key ? 'text-orange-400' : 'text-white'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {item.translation}
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(!isDropdownOpen);
                      }}
                      className="text-white hover:text-orange-400 transition-colors p-2 ml-2"
                    >
                      <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {isDropdownOpen && (
                    <div className="mt-4 space-y-2 w-full max-w-xs">
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <button
                          key={dropdownItem.key}
                          onClick={() => {
                            onPageChange(dropdownItem.key);
                            onClose();
                          }}
                          className={`text-lg font-normal uppercase tracking-wide transition-colors hover:text-orange-400 w-full text-center ${
                            currentPage === dropdownItem.key ? 'text-orange-400' : 'text-gray-300'
                          }`}
                          style={{ animationDelay: `${(index + dropdownIndex + 1) * 0.1}s` }}
                        >
                          {dropdownItem.translation}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <button
                key={item.key}
                onClick={() => {
                  onPageChange(item.key);
                  onClose();
                }}
                className={`text-2xl font-medium uppercase tracking-widest transition-colors hover:text-orange-400 text-center ${
                  currentPage === item.key ? 'text-orange-400' : 'text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.translation}
              </button>
            );
          })}
          
          {/* Language Switcher */}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
          
          {/* Admin Link */}
          {showAdmin && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <a 
                href="/admin"
                className="text-lg text-gray-400 hover:text-orange-400 transition-colors px-4 py-2 border border-gray-600 rounded hover:border-orange-400"
              >
                {t('adminAccess')}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <div className="text-white mb-2">
            <div className="text-xs tracking-widest opacity-80">CEILINGS ART</div>
          </div>
          <div className="text-xs text-gray-400">
            {isRTL ? 'تحويل المساحات بتصاميم أسقف مخصصة' : 'TRANSFORMING SPACES WITH BESPOKE CEILING DESIGNS'}
          </div>
        </div>
      </div>
    </div>
  );
}