'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { MobileMenu } from '../components/MobileMenu';
import HomepageHero from '../components/HomepageHero';
import { AboutUsSection } from '../components/AboutUsSection';
import { MainServicesSection } from '../components/MainServicesSection';
import { ImageCarousel } from '../components/ImageCarousel';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import TopTextBar from '../components/TopTextBar';
import { AboutPage } from '../components/AboutPage';
import { ServicesPage } from '../components/ServicesPage';
import { AcousticPanelsPage } from '../components/AcousticPanelsPage';
import { AlandalusAcousticPage } from '../components/AlandalusAcousticPage';
import { WoodWoolPage } from '../components/WoodWoolPage';
import { PolyesterPanelPage } from '../components/PolyesterPanelPage';
import { FabricWrapsPage } from '../components/FabricWrapsPage';
import { OurWorkPage } from '../components/OurWorkPage';
import { FAQsPage } from '../components/FAQsPage';
import { BlogPage } from '../components/BlogPage';
import { ContactPage } from '../components/ContactPage';
import { SuccessPartnersSection } from '../components/SuccessPartnersSection';
import { DetailItem, ProjectDetailPage } from '../components/ProjectDetailPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [selectedIsService, setSelectedIsService] = useState(false);
  const { t } = useLanguage();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page: string) => {
    console.log('Changing page to:', page);
    setSelectedItem(null);
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const onNavigate = (e: any) => {
      if (e && e.detail && e.detail.page) {
        handlePageChange(e.detail.page);
      }
    };
    window.addEventListener('navigate', onNavigate as EventListener);
    return () => window.removeEventListener('navigate', onNavigate as EventListener);
  }, []);

    if (selectedItem) {
      return (
      <div className="min-h-screen">
        {/* Top Text Bar */}
        <TopTextBar />
        
        {/* Header */}
        <Header 
          onMenuToggle={handleMenuToggle} 
          currentPage=""
          onPageChange={handlePageChange}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
          currentPage=""
          onPageChange={handlePageChange}
        />

        {/* Main Content */}
        <main className="pt-[68px]">
        <ProjectDetailPage
          item={selectedItem}
          isService={selectedIsService}
          onBackToProjects={() => setSelectedItem(null)}
          onSelectRelated={(rel) => {
            setSelectedItem(rel);
            setSelectedIsService(false);
          }}
        />
        </main>

        {/* Sticky Floating CTA: Phone & WhatsApp */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
          {/* Phone Button */}
          <button
            onClick={() => window.open('tel:+966575474699', '_self')}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
            title="Call Us"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </button>
          
          {/* WhatsApp Button */}
          <button
            onClick={() => window.open('https://wa.me/966575474699', '_blank')}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
            title="WhatsApp Us"
          >
            {/* WhatsApp icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="currentColor" aria-hidden>
              <path d="M19.11 17.28c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.17.19-.33.22-.62.08-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.48-.16 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
              <path d="M26.64 5.36C23.74 2.47 20.04 1 16.13 1 8.39 1 2.09 7.3 2.09 15.04c0 2.31.61 4.56 1.77 6.56L1 31l9.63-2.52c1.93 1.05 4.12 1.6 6.36 1.6 7.73 0 14.04-6.3 14.04-14.04 0-3.9-1.52-7.6-4.39-10.68zM16 27.54c-2.04 0-4.03-.55-5.78-1.6l-.41-.24-5.72 1.5 1.53-5.58-.26-.43c-1.11-1.81-1.7-3.9-1.7-6.02 0-6.45 5.25-11.7 11.7-11.7 3.13 0 6.06 1.22 8.27 3.43 2.21 2.21 3.43 5.14 3.43 8.27-.01 6.45-5.26 11.7-11.71 11.7z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Text Bar */}
      <TopTextBar />
      
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle} 
        currentPage=""
        onPageChange={handlePageChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage=""
        onPageChange={handlePageChange}
      />

      {/* Main Content */}
      <main className="pt-[68px]">
        <HomepageHero onGetStarted={() => window.location.href = '/contact'} />
        <AboutUsSection />
        <MainServicesSection onLearnMore={(serviceType) => {
          const routeMap: { [key: string]: string } = {
            'ACOUSTIC PANELS': '/acoustic-panels',
            'STRETCH CEILINGS': '/stretch-ceilings',
            'OUR SERVICES': '/services',
            'CONTACT US': '/contact'
          };
          const route = routeMap[serviceType];
          if (route) {
            window.location.href = route;
          }
        }} />
        <SuccessPartnersSection />
        <ImageCarousel
          onSelect={(img) => {
            setSelectedItem({ 
              title: img.titleEn || img.title || img.alt, 
              titleEn: img.titleEn || img.alt || img.title,
              titleAr: img.titleAr,
              image: img.src, 
              category: img.category || 'Gallery' 
            });
            setSelectedIsService(img.category === 'Services');
          }}
        />
        <Footer />
      </main>

      {/* Sticky Floating CTA: Phone & WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        {/* Phone Button */}
        <button
          onClick={() => window.open('tel:+966575474699', '_self')}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="Call Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </button>
        
        {/* WhatsApp Button */}
        <button
          onClick={() => window.open('https://wa.me/966575474699', '_blank')}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="WhatsApp Us"
        >
          {/* WhatsApp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="currentColor" aria-hidden>
            <path d="M19.11 17.28c-.29-.14-1.7-.83-1.96-.92-.26-.1-.45-.14-.64.14-.19.29-.73.92-.9 1.11-.17.19-.33.22-.62.08-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.48-.16 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z"/>
            <path d="M26.64 5.36C23.74 2.47 20.04 1 16.13 1 8.39 1 2.09 7.3 2.09 15.04c0 2.31.61 4.56 1.77 6.56L1 31l9.63-2.52c1.93 1.05 4.12 1.6 6.36 1.6 7.73 0 14.04-6.3 14.04-14.04 0-3.9-1.52-7.6-4.39-10.68zM16 27.54c-2.04 0-4.03-.55-5.78-1.6l-.41-.24-5.72 1.5 1.53-5.58-.26-.43c-1.11-1.81-1.7-3.9-1.7-6.02 0-6.45 5.25-11.7 11.7-11.7 3.13 0 6.06 1.22 8.27 3.43 2.21 2.21 3.43 5.14 3.43 8.27-.01 6.45-5.26 11.7-11.71 11.7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
