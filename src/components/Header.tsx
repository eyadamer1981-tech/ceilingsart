import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onMenuToggle: (isOpen: boolean) => void;
  currentPage?: string;
  onPageChange: (page: string) => void;
}

export function Header({ onMenuToggle, currentPage = 'HOME', onPageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAcousticDropdownOpen, setIsAcousticDropdownOpen] = useState(false);
  const [isStretchDropdownOpen, setIsStretchDropdownOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const flag = localStorage.getItem('hasAdminAccess');
      setShowAdmin(flag === 'true');
    } catch {}
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAcousticDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.acoustic-dropdown')) {
          setIsAcousticDropdownOpen(false);
        }
      }
      if (isStretchDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.stretch-dropdown')) {
          setIsStretchDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAcousticDropdownOpen, isStretchDropdownOpen]);

  const handleMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuToggle(newState);
  };

  const navItems = [
    { key: 'HOME', translation: t('home') },
    { key: 'ABOUT US', translation: t('about') },
    { 
      key: 'ACOUSTIC PANELS', 
      translation: t('acousticPanels'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'ACOUSTIC_PANELS_ALANDALUS', translation: 'Acoustic Panels-B.Alandalus' },
        { key: 'FLOOR_INSULATION', translation: 'Floor insulation' },
        { key: 'POLYESTER_ACOUSTIC', translation: 'Polyester Acoustic Panels' },
        { key: 'ACOUSTIC_FABRIC_WRAPS', translation: 'Acoustic Fabric Wraps' }
      ]
    },
    { 
      key: 'STRETCH CEILINGS', 
      translation: t('stretchCeilings'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'STRETCH_GLOSSY', translation: 'Stretch ceilings - Glossy' },
        { key: 'STRETCH_HIDDEN_LIGHTING', translation: 'Stretch ceilings with hidden lighting' },
        { key: 'STRETCH_PERFORATED_ACOUSTIC', translation: 'Stretch ceilings - Perforated and acoustic' },
        { key: 'STRETCH_3D', translation: 'Stretch ceilings - 3D' },
        { key: 'STRETCH_REFLECTIVE', translation: 'Stretch ceilings - Reflective' },
        { key: 'STRETCH_MATTE', translation: 'Stretch ceilings - Matte' },
        { key: 'STRETCH_FIBER_OPTIC_ROSE', translation: 'Stretch ceilings - Fiber optic ceilings (Rose)' },
        { key: 'STRETCH_PRINTED', translation: 'Stretch Ceilings printed' },
        { key: 'STRETCH_LIGHT_TRANSMITTING', translation: 'Stretch ceilings - Light transmitting' },
        { key: 'STRETCH_PAPER', translation: 'Stretch ceilings - Paper' }
      ]
    },
    { key: 'OUR WORK', translation: t('ourWork') },
    { key: 'FAQS', translation: t('faqs') },
    { key: 'BLOG', translation: t('blog') },
    { key: 'CONTACT US', translation: t('contact') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className={`flex items-center justify-between`}>
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white">
              {/* <div className="text-2xl font-bold tracking-wider">CA</div>
              <div className="text-sm tracking-widest opacity-80">CEILINGS ATR</div> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isAcoustic = item.key === 'ACOUSTIC PANELS';
                const isStretch = item.key === 'STRETCH CEILINGS';
                const dropdownClass = isAcoustic ? 'acoustic-dropdown' : 'stretch-dropdown';
                const isDropdownOpen = isAcoustic ? isAcousticDropdownOpen : isStretchDropdownOpen;
                const setDropdownOpen = isAcoustic ? setIsAcousticDropdownOpen : setIsStretchDropdownOpen;
                
                return (
                  <div key={item.key} className={`relative group ${dropdownClass}`}>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          onPageChange(item.key);
                        }}
                        className={`text-sm font-semibold tracking-wider transition-colors hover:text-orange-400 ${
                          currentPage === item.key ? 'text-orange-400' : 'text-white'
                        }`}
                      >
                        {item.translation}
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(!isDropdownOpen);
                        }}
                        className="ml-1 text-white hover:text-orange-400 transition-colors"
                      >
                        <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                        <div className="py-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <button
                              key={dropdownItem.key}
                              onClick={() => {
                                onPageChange(dropdownItem.key);
                                setDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-colors"
                            >
                              {dropdownItem.translation}
                            </button>
                          ))}
                        </div>
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
                  }}
                  className={`text-sm font-semibold tracking-wider transition-colors hover:text-orange-400 ${
                    currentPage === item.key ? 'text-orange-400' : 'text-white'
                  }`}
                >
                  {item.translation}
                </button>
              );
            })}
          </nav>

          {/* Contact Info, Language Switcher & Admin */}
          <div className={`hidden lg:flex items-center space-x-4`}>
            <div className="flex items-center space-x-2 text-orange-400">
              <Phone size={16} />
              <span className="text-sm" dir="ltr">+966 575474699</span>
            </div>
            <LanguageSwitcher />
            {showAdmin && (
              <a 
                href="/admin" 
                className="text-xs text-gray-400 hover:text-orange-400 transition-colors px-2 py-1 border border-gray-600 rounded hover:border-orange-400"
              >
                {t('admin')}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="lg:hidden text-white hover:text-orange-400 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}