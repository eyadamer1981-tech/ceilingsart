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

  const renderPage = () => {
    if (selectedItem) {
      return (
        <ProjectDetailPage
          item={selectedItem}
          isService={selectedIsService}
          onBackToProjects={() => setSelectedItem(null)}
          onSelectRelated={(rel) => {
            setSelectedItem(rel);
            setSelectedIsService(false);
          }}
        />
      );
    }
    console.log('Current page:', currentPage);
    switch (currentPage) {
      case 'HOME':
        return (
          <>
            <HomepageHero onGetStarted={() => handlePageChange('CONTACT US')} />
            <AboutUsSection />
            <MainServicesSection onLearnMore={(serviceType) => handlePageChange(serviceType)} />
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
          </>
        );
      case 'ABOUT US':
        return (
          <>
            <AboutPage onContactClick={() => handlePageChange('CONTACT US')} />
            <Footer />
          </>
        );
      case 'OUR SERVICES':
        return (
          <>
            <ServicesPage onSelect={(service, isService) => {
              setSelectedItem({
                title: service.title || service.titleEn || 'Untitled',
                image: service.image,
                description: service.description,
                descriptionEn: service.descriptionEn || service.description || '',
                descriptionAr: service.descriptionAr || service.description || '',
                detailImages: service.detailImages || [],
                category: 'Service',
              });
              setSelectedIsService(isService);
            }} />
            <Footer />
          </>
        );
      case 'ACOUSTIC PANELS':
        return (
          <>
            <AcousticPanelsPage
              onSelect={(panel, isService) => {
                setSelectedItem({
                  title: panel.title,
                  image: panel.image,
                  description: panel.description,
                  descriptionEn: panel.descriptionEn,
                  descriptionAr: panel.descriptionAr,
                  detailImages: panel.detailImages,
                  category: 'Acoustic Panel',
                });
                setSelectedIsService(isService);
              }}
            />
            <Footer />
          </>
        );
      case 'STRETCH CEILINGS':
        return (
          <>
            <ServicesPage
              category="stretch"
              pageTitle={t('stretchCeilingPageTitle')}
              pageSubtitle={t('stretchCeilingPageSubtitle')}
              onSelect={(service, isService) => {
                setSelectedItem({
                  title: service.title || service.titleEn || 'Untitled',
                  image: service.image,
                  description: service.description,
                  descriptionEn: service.descriptionEn || service.description || '',
                  descriptionAr: service.descriptionAr || service.description || '',
                  detailImages: service.detailImages || [],
                  category: 'Stretch Ceiling',
                });
                setSelectedIsService(isService);
              }}
            />
            <Footer />
          </>
        );
      case 'OUR WORK':
        return (
          <>
            <OurWorkPage
              onSelect={(image) => {
                const titleStr = image.title || image.titleEn || '';
                setSelectedItem({
                  title: titleStr,
                  titleEn: image.titleEn || titleStr,
                  titleAr: image.titleAr,
                  image: image.src,
                  category: image.category,
                });
                setSelectedIsService(false);
              }}
              onStartProject={() => handlePageChange('CONTACT US')}
            />
            <Footer />
          </>
        );
      case 'FAQS':
        return (
          <>
            <FAQsPage onContactClick={() => handlePageChange('CONTACT US')} />
            <Footer />
          </>
        );
      case 'GALLERY':
        return (
          <>
            <OurWorkPage onSelect={(image) => {
              const titleStr = image.title || image.titleEn || '';
              setSelectedItem({
                title: titleStr,
                titleEn: image.titleEn || titleStr,
                titleAr: image.titleAr,
                image: image.src,
                category: image.category,
              });
              setSelectedIsService(false);
            }} onStartProject={() => handlePageChange('CONTACT US')} />
            <Footer />
          </>
        );
      case 'BLOG':
        return (
          <>
            <BlogPage onBlogSelect={(slug) => {
              // Navigate to blog detail page using window.location
              window.location.href = `/blog/${slug}`;
            }} />
            <Footer />
          </>
        );
      case 'CONTACT US':
        return (
          <>
            <ContactPage />
            <Footer />
          </>
        );
      // Acoustic Panels dropdown items
      case 'ACOUSTIC_PANELS_ALANDALUS':
        return (
          <>
            <AlandalusAcousticPage />
            <Footer />
          </>
        );
      case 'FLOOR_INSULATION':
        return (
          <>
            <WoodWoolPage />
            <Footer />
          </>
        );
      case 'POLYESTER_ACOUSTIC':
        return (
          <>
            <PolyesterPanelPage />
            <Footer />
          </>
        );
      case 'ACOUSTIC_FABRIC_WRAPS':
        return (
          <>
            <FabricWrapsPage />
            <Footer />
          </>
        );
      // Stretch Ceilings dropdown items
      case 'STRETCH_GLOSSY':
      case 'STRETCH_HIDDEN_LIGHTING':
      case 'STRETCH_PERFORATED_ACOUSTIC':
      case 'STRETCH_3D':
      case 'STRETCH_REFLECTIVE':
      case 'STRETCH_MATTE':
      case 'STRETCH_FIBER_OPTIC_ROSE':
      case 'STRETCH_PRINTED':
      case 'STRETCH_LIGHT_TRANSMITTING':
      case 'STRETCH_PAPER': {
        const mapToType = (key: string) => {
          switch (key) {
            case 'STRETCH_GLOSSY': return 'glossy';
            case 'STRETCH_HIDDEN_LIGHTING': return 'backlit';
            case 'STRETCH_PERFORATED_ACOUSTIC': return 'acoustic';
            case 'STRETCH_3D': return '3d';
            case 'STRETCH_REFLECTIVE': return 'reflective';
            case 'STRETCH_MATTE': return 'matte';
            case 'STRETCH_FIBER_OPTIC_ROSE': return 'fiber-optic';
            case 'STRETCH_PRINTED': return 'printed';
            case 'STRETCH_LIGHT_TRANSMITTING': return 'translucent';
            case 'STRETCH_PAPER': return 'paper';
            default: return null;
          }
        };
        const initialType = mapToType(currentPage);
        return (
          <>
            <ServicesPage
              category="stretch"
              pageTitle={t('stretchCeilingPageTitle')}
              pageSubtitle={t('stretchCeilingPageSubtitle')}
              initialSelectedCeilingType={initialType || undefined}
              onSelect={(service, isService) => {
                setSelectedItem({
                  title: service.title || service.titleEn || 'Untitled',
                  image: service.image,
                  description: service.description,
                  descriptionEn: service.descriptionEn || service.description || '',
                  descriptionAr: service.descriptionAr || service.description || '',
                  detailImages: service.detailImages || [],
                  category: 'Stretch Ceiling',
                });
                setSelectedIsService(isService);
              }}
            />
            <Footer />
          </>
        );
      }
      default:
        return (
          <>
            <HomepageHero onGetStarted={() => handlePageChange('CONTACT US')} />
            <AboutUsSection />
            <MainServicesSection onLearnMore={(serviceType) => handlePageChange(serviceType)} />
            <SuccessPartnersSection />
            <ImageCarousel 
              onSelect={(img) => {
                setSelectedItem({ 
                  title: img.alt, 
                  titleEn: img.titleEn || img.alt,
                  titleAr: img.titleAr,
                  image: img.src, 
                  category: img.category || 'Gallery' 
                });
                setSelectedIsService(img.category === 'Services');
              }} 
            />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Main Content */}
      <main className="pt-[68px]">
        {renderPage()}
      </main>

      {/* Sticky Floating CTA: WhatsApp Call */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button
          onClick={() => window.open('whatsapp://call?number=966575474699', '_blank')}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition"
          title="WhatsApp Call"
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
