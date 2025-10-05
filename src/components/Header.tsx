"use client";

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
  const [acousticDropdownPos, setAcousticDropdownPos] = useState({ top: 0, left: 0 });
  const [stretchDropdownPos, setStretchDropdownPos] = useState({ top: 0, left: 0 });
  const { t, isRTL, language, setLanguage } = useLanguage();
  const acousticRef = React.useRef<HTMLDivElement>(null);
  const stretchRef = React.useRef<HTMLDivElement>(null);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const closeTimeoutRef = React.useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenMenuKey(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  const openMenu = (key: string) => {
    cancelClose();
    setOpenMenuKey(key);
  };

  const updateDropdownPositions = () => {
    if (acousticRef.current) {
      const rect = acousticRef.current.getBoundingClientRect();
      setAcousticDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
    if (stretchRef.current) {
      const rect = stretchRef.current.getBoundingClientRect();
      setStretchDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
  };

  useEffect(() => {
    updateDropdownPositions();
    window.addEventListener('resize', updateDropdownPositions);
    window.addEventListener('scroll', updateDropdownPositions);
    return () => {
      window.removeEventListener('resize', updateDropdownPositions);
      window.removeEventListener('scroll', updateDropdownPositions);
    };
  }, []);

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
    }`} style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4 py-6" style={{ overflow: 'visible' }}>
        <div className={`flex items-center justify-between`} style={{ overflow: 'visible' }}>
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" onClick={() => onPageChange('HOME')} className="flex items-center">
              <img src="/logo.png" alt="Ceilings Art" className="h-8 w-auto" />
            </a>
          </div>

          {/* Mobile: language toggle + menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-600 text-white/90 hover:text-white hover:border-orange-400 transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
              <span className="text-xs opacity-80">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
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

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`} style={{ overflow: 'visible' }}>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isAcoustic = item.key === 'ACOUSTIC PANELS';
                const ref = isAcoustic ? acousticRef : stretchRef;
                const dropdownPos = isAcoustic ? acousticDropdownPos : stretchDropdownPos;

                return (
                  <div
                    key={item.key}
                    ref={ref}
                    className="relative group"
                    onMouseEnter={() => {
                      updateDropdownPositions();
                      openMenu(item.key);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="flex items-center cursor-pointer">
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
                      <span className="ml-1 text-white group-hover:text-orange-400 transition-all duration-300 group-hover:rotate-180">
                        <ChevronDown size={14} />
                      </span>
                    </div>

                    {/* Dropdown Menu */}
                    {(() => {
                      const isOpen = openMenuKey === item.key;
                      return (
                        <div
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                          className={`${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'} transition-all duration-200`}
                          style={{
                            position: 'fixed',
                            top: `${dropdownPos.top}px`,
                            left: `${dropdownPos.left}px`,
                            width: '280px',
                            zIndex: 999999
                          }}
                        >
                          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <button
                                key={dropdownItem.key}
                                onClick={() => {
                                  onPageChange(dropdownItem.key);
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-colors block"
                              >
                                {dropdownItem.translation}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
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
        </div>
      </div>
    </header>
  );
}