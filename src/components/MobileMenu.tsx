import React from 'react';
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
  
  const navItems = [
    { key: 'HOME', translation: t('home') },
    { key: 'ABOUT US', translation: t('about') },
    { key: 'OUR SERVICES', translation: t('services') },
    { key: 'GALLERY', translation: t('gallery') },
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
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light text-white tracking-wider mb-8">
              {isRTL ? 'القائمة' : 'MENU'}
            </h2>
          </div>
          
          {navItems.map((item, index) => (
            <button
              key={item.key}
              onClick={() => {
                onPageChange(item.key);
                onClose();
              }}
              className={`text-xl tracking-wider transition-colors hover:text-orange-400 ${
                currentPage === item.key ? 'text-orange-400' : 'text-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.translation}
            </button>
          ))}
          
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
            <div className="text-lg font-bold tracking-wider">CA</div>
            <div className="text-xs tracking-widest opacity-80">CEILINGS ATR</div>
          </div>
          <div className="text-xs text-gray-400">
            {isRTL ? 'تحويل المساحات بتصاميم أسقف مخصصة' : 'TRANSFORMING SPACES WITH BESPOKE CEILING DESIGNS'}
          </div>
        </div>
      </div>
    </div>
  );
}