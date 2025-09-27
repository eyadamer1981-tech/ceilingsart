'use client';

import { useState } from 'react';
import { Header } from '../components/Header';
import { MobileMenu } from '../components/MobileMenu';
import HomepageHero from '../components/HomepageHero';
import { AboutUsSection } from '../components/AboutUsSection';
import { MainServicesSection } from '../components/MainServicesSection';
import { Gallery } from '../components/Gallery';
import { Footer } from '../components/Footer';
import { AboutPage } from '../components/AboutPage';
import { ServicesPage } from '../components/ServicesPage';
import { GalleryPage } from '../components/GalleryPage';
import { BlogPage } from '../components/BlogPage';
import { ContactPage } from '../components/ContactPage';
import { ProjectDetailPage, DetailItem } from '../components/ProjectDetailPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [selectedIsService, setSelectedIsService] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page: string) => {
    setSelectedItem(null);
    setCurrentPage(page);
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
    switch (currentPage) {
      case 'ABOUT US':
        return (
          <>
            <AboutPage />
            <Footer />
          </>
        );
      case 'OUR SERVICES':
        return (
          <>
            <ServicesPage onSelect={(service, isService) => {
              setSelectedItem({
                title: service.title,
                image: service.image,
                description: service.description,
                category: 'Service',
              });
              setSelectedIsService(isService);
            }} />
            <Footer />
          </>
        );
      case 'GALLERY':
        return (
          <>
            <GalleryPage onSelect={(image) => {
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
      default:
        return (
          <>
            <HomepageHero />
            <AboutUsSection />
            <MainServicesSection />
            <Gallery onSelect={(img) => {
              setSelectedItem({ title: img.alt, image: img.src, category: 'Gallery' });
              setSelectedIsService(false);
            }} />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          onMenuToggle={handleMenuToggle} 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Main Content */}
      <main className="pt-0">
        {renderPage()}
      </main>
    </div>
  );
}
