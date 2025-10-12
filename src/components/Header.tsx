"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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
  const [isClient, setIsClient] = useState(false);

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
    setIsClient(true);
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

  return (
    <header className={`fixed ${isScrolled ? 'top-0' : 'top-0 md:top-[32px]'} left-0 right-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-black/80 shadow-lg' : 'bg-transparent'
    }`} style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4 h-[68px] lg:h-[80px] flex items-center" style={{ overflow: 'visible' }}>
        <div className={`flex items-center justify-between relative w-full`} style={{ overflow: 'visible' }}>
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" onClick={() => onPageChange('HOME')} className="flex items-center">
              <img src="/newlogo.png" alt="Ceilings Art" className="h-[50px] w-auto" />
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

          {/* Desktop Navigation - centered */}
          <div className="hidden lg:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center" style={{ overflow: 'visible' }}>
            <nav className={`flex items-center space-x-5 ${isRTL ? 'space-x-reverse' : ''}`} style={{ overflow: 'visible' }}>
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
                        className={`text-sm leading-none font-semibold tracking-wider transition-colors hover:text-orange-400 text-center ${
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
                      const dropdownNode = (
                        <div
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                          onWheel={(e) => { if (isOpen) { e.preventDefault(); e.stopPropagation(); } }}
                          onTouchMove={(e) => { if (isOpen) { e.preventDefault(); e.stopPropagation(); } }}
                          className={`${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'} transition-all duration-200`}
                          style={{
                            position: 'fixed',
                            top: `${dropdownPos.top}px`,
                            left: `${dropdownPos.left}px`,
                            width: '280px',
                            zIndex: 2147483647,
                            overflow: 'hidden',
                            maxHeight: 'none',
                            WebkitOverflowScrolling: 'auto'
                          }}
                        >
                          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <button
                                key={dropdownItem.key}
                                onClick={() => {
                                  onPageChange(dropdownItem.key);
                                }}
                                className="w-full text-center px-4 py-3 text-sm text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-colors block"
                              >
                                {dropdownItem.translation}
                              </button>
                            ))}
                          </div>
                        </div>
                      );

                      return isClient ? createPortal(dropdownNode, document.body) : dropdownNode;
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
                  className={`text-sm leading-none font-semibold tracking-wider transition-colors hover:text-orange-400 text-center ${
                    currentPage === item.key ? 'text-orange-400' : 'text-white'
                  }`}
                >
                  {item.translation}
                </button>
              );
            })}
            </nav>
          </div>

          {/* Right side (desktop) intentionally empty; moved items to TopTextBar */}
          <div className={`hidden lg:flex items-center space-x-4`}></div>
        </div>
      </div>
    </header>
  );
}