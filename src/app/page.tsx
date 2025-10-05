'use client';

import { useState } from 'react';
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
import { WoodWoolPage } from '../components/WoodWoolPage';
import { PolyesterPanelPage } from '../components/PolyesterPanelPage';
import { FabricWrapsPage } from '../components/FabricWrapsPage';
import { OurWorkPage } from '../components/OurWorkPage';
import { FAQsPage } from '../components/FAQsPage';
import { BlogPage } from '../components/BlogPage';
import { ContactPage } from '../components/ContactPage';
import { SuccessPartnersSection } from '../components/SuccessPartnersSection';

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
                setSelectedItem({ title: img.alt, image: img.src, category: img.category || 'Gallery' });
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
                setSelectedItem({
                  title: image.title,
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
              setSelectedItem({
                title: image.title,
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
            <BlogPage />
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
      case 'STRETCH_PAPER':
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
      default:
        return (
          <>
            <HomepageHero onGetStarted={() => handlePageChange('CONTACT US')} />
            <AboutUsSection />
            <MainServicesSection onLearnMore={(serviceType) => handlePageChange(serviceType)} />
            <SuccessPartnersSection />
            <ImageCarousel 
              onSelect={(img) => {
                setSelectedItem({ title: img.alt, image: img.src, category: img.category || 'Gallery' });
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
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}
