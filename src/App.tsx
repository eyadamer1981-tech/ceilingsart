import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { OurWorkPage } from './components/OurWorkPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { FAQsPage } from './components/FAQsPage';
import { AcousticPanelsPage } from './components/AcousticPanelsPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectDetailPage, DetailItem } from './components/ProjectDetailPage';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('HOME');
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [selectedIsService, setSelectedIsService] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAdmin(true);
    }
  }, []);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);
  };

  const handlePageChange = (page: string) => {
    console.log('Changing page to:', page);
    setCurrentPage(page);
    setSelectedItem(null);
    setIsMobileMenuOpen(false);
  };

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setIsAdmin(false);
  };

  // Check for admin route
  if (window.location.pathname === '/admin') {
    if (!isAdmin) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  const renderPage = () => {
    if (selectedItem) {
      return (
        <ProjectDetailPage
          item={selectedItem}
          isService={selectedIsService}
          onBackToProjects={() => {
            setSelectedItem(null);
            // Don't reset currentPage here
          }}
        />
      );
    }
    console.log('Current page:', currentPage);
    switch (currentPage) {
      case 'HOME':
        return (
          <>
            <Hero />
            <Gallery onSelect={(img) => {
              setSelectedItem({ title: img.alt, image: img.src, category: 'Gallery' });
              setSelectedIsService(false);
            }} />
            <Footer />
          </>
        );
      case 'ABOUT US':
        return (
          <>
            <AboutPage />
            <Footer />
          </>
        );
      case 'ACOUSTIC PANELS':
        console.log('Rendering ACOUSTIC PANELS case');
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
              pageTitle="Stretch Ceilings"
              pageSubtitle="French Ceiling Solutions"
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
      case 'OUR WORK':
        return (
          <>
            <OurWorkPage onSelect={(image) => {
              setSelectedItem({
                title: image.title,
                image: image.src,
                category: image.category,
              });
              setSelectedIsService(false);
            }} onStartProject={() => setCurrentPage('CONTACT US')} />
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
            }} onStartProject={() => setCurrentPage('CONTACT US')} />
            <Footer />
          </>
        );
      case 'FAQS':
        return (
          <>
            <FAQsPage onContactClick={() => setCurrentPage('CONTACT US')} />
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
      case 'BLOG':
        return (
          <>
            <BlogPage />
            <Footer />
          </>
        );
      // Acoustic Panels dropdown items
      case 'ACOUSTIC_PANELS_ALANDALUS':
      case 'FLOOR_INSULATION':
      case 'POLYESTER_ACOUSTIC':
      case 'ACOUSTIC_FABRIC_WRAPS':
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
              pageTitle="Stretch Ceilings"
              pageSubtitle="French Ceiling Solutions"
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
            <Hero />
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