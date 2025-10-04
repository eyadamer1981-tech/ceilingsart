import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { GalleryPage } from './components/GalleryPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
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
          onBackToProjects={() => setSelectedItem(null)}
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
                descriptionEn: service.descriptionEn,
                descriptionAr: service.descriptionAr,
                detailImages: service.detailImages,
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
            }} onStartProject={() => setCurrentPage('CONTACT US')} />
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
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <main className="pt-0">
        {renderPage()}
      </main>
    </div>
  );
}