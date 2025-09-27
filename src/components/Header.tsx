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
  const { t, isRTL } = useLanguage();
  const [serviceCategories, setServiceCategories] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [galleryCategories, setGalleryCategories] = useState<string[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryCategoriesLoading, setGalleryCategoriesLoading] = useState(true);

  // Hover intent timers to give users time to move the cursor into the panel
  const servicesHoverTimer = React.useRef<number | null>(null);
  const galleryHoverTimer = React.useRef<number | null>(null);

  const openServices = () => {
    if (servicesHoverTimer.current) {
      window.clearTimeout(servicesHoverTimer.current);
      servicesHoverTimer.current = null;
    }
    setIsServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    if (servicesHoverTimer.current) window.clearTimeout(servicesHoverTimer.current);
    servicesHoverTimer.current = window.setTimeout(() => setIsServicesOpen(false), 250);
  };
  const openGallery = () => {
    if (galleryHoverTimer.current) {
      window.clearTimeout(galleryHoverTimer.current);
      galleryHoverTimer.current = null;
    }
    setIsGalleryOpen(true);
  };
  const closeGalleryDelayed = () => {
    if (galleryHoverTimer.current) window.clearTimeout(galleryHoverTimer.current);
    galleryHoverTimer.current = window.setTimeout(() => setIsGalleryOpen(false), 250);
  };

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
    // fetch service categories for dropdown
    fetch('/api/services/categories')
      .then((r) => r.json())
      .then((cats) => setServiceCategories(Array.isArray(cats) ? cats : []))
      .catch(() => setServiceCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

  useEffect(() => {
    // fetch project categories for gallery dropdown
    fetch('/api/projects/categories')
      .then((r) => r.json())
      .then((cats) => setGalleryCategories(Array.isArray(cats) ? cats : []))
      .catch(() => setGalleryCategories([]))
      .finally(() => setGalleryCategoriesLoading(false));
  }, []);

  const handleMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuToggle(newState);
  };

  const navItems = [
    { key: 'HOME', translation: t('home') },
    { key: 'ABOUT US', translation: t('about') },
    { key: 'OUR SERVICES', translation: t('services') },
    { key: 'GALLERY', translation: t('gallery') },
    { key: 'BLOG', translation: t('blog') },
    { key: 'CONTACT US', translation: t('contact') }
  ];

  return (
    <header className={`relative z-50 w-full transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-black/20' : ''
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
              if (item.key === 'OUR SERVICES') {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesDelayed}
                  >
                    <button
                      onClick={() => onPageChange('OUR SERVICES')}
                      // hover-only dropdown; click navigates without filter
                      className={`group inline-flex items-center text-sm font-semibold tracking-wider transition-colors hover:text-orange-400 ${
                        currentPage === item.key ? 'text-orange-400' : 'text-white'
                      }`}
                    >
                      <span>{item.translation}</span>
                      <ChevronDown size={16} className={`${isRTL ? 'mr-1' : 'ml-1'} transition-transform group-hover:rotate-180`} />
                    </button>
                    {isServicesOpen && (
                      <div
                        onMouseEnter={openServices}
                        onMouseLeave={closeServicesDelayed}
                        className="absolute left-0 mt-3 w-[560px] rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-2xl p-6 grid grid-cols-2 gap-4"
                      >
                        {categoriesLoading && (
                          <div className="col-span-2 text-sm text-gray-500">Loading...</div>
                        )}
                        {!categoriesLoading && serviceCategories.length === 0 && (
                          <div className="col-span-2 text-sm text-gray-500">No categories found</div>
                        )}
                        {!categoriesLoading && serviceCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setIsServicesOpen(false);
                              onPageChange('OUR SERVICES');
                              // Optionally could route/filter by category via global state
                            }}
                            className="text-left rounded-xl p-4 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-200"
                          >
                            <div className="text-sm font-semibold text-gray-900">{cat}</div>
                            <div className="text-xs text-gray-500 mt-1">Explore {cat} offerings</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (item.key === 'GALLERY') {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={openGallery}
                    onMouseLeave={closeGalleryDelayed}
                  >
                    <button
                      onClick={() => {
                        try { localStorage.removeItem('selectedGalleryCategory'); } catch {}
                        onPageChange('GALLERY');
                      }}
                      // hover-only dropdown; click navigates without filter
                      className={`group inline-flex items-center text-sm font-semibold tracking-wider transition-colors hover:text-orange-400 ${
                        currentPage === item.key ? 'text-orange-400' : 'text-white'
                      }`}
                    >
                      <span>{item.translation}</span>
                      <ChevronDown size={16} className={`${isRTL ? 'mr-1' : 'ml-1'} transition-transform group-hover:rotate-180`} />
                    </button>
                    {isGalleryOpen && (
                      <div
                        onMouseEnter={openGallery}
                        onMouseLeave={closeGalleryDelayed}
                        className="absolute left-0 mt-3 w-[560px] rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-2xl p-6 grid grid-cols-2 gap-4"
                      >
                        {galleryCategoriesLoading && (
                          <div className="col-span-2 text-sm text-gray-500">Loading...</div>
                        )}
                        {!galleryCategoriesLoading && galleryCategories.length === 0 && (
                          <div className="col-span-2 text-sm text-gray-500">No categories found</div>
                        )}
                        {!galleryCategoriesLoading && galleryCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setIsGalleryOpen(false);
                              try { localStorage.setItem('selectedGalleryCategory', cat); } catch {}
                              onPageChange('GALLERY');
                            }}
                            className="text-left rounded-xl p-4 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-200"
                          >
                            <div className="text-sm font-semibold text-gray-900">{cat}</div>
                            <div className="text-xs text-gray-500 mt-1">Explore {cat} gallery</div>
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
                  onClick={() => onPageChange(item.key)}
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
              <span className="text-sm">+966 575474699</span>
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