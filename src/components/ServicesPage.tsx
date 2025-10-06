"use client";

import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Droplets, Building, Wine, Globe, Briefcase } from 'lucide-react';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;
const MH1 = motion.h1 as any;
const MP = motion.p as any;
import { GlossyStretchCeilingPage } from './GlossyStretchCeilingPage';
import { BacklitStretchCeilingPage } from './BacklitStretchCeilingPage';
import { AcousticStretchCeilingPage } from './AcousticStretchCeilingPage';
import { ThreeDStretchCeilingPage } from './ThreeDStretchCeilingPage';
import { ReflectiveStretchCeilingPage } from './ReflectiveStretchCeilingPage';
import { MatteStretchCeilingPage } from './MatteStretchCeilingPage';
import { FiberOpticStretchCeilingPage } from './FiberOpticStretchCeilingPage';
import { PrintedStretchCeilingPage } from './PrintedStretchCeilingPage';
import { TranslucentStretchCeilingPage } from './TranslucentStretchCeilingPage';
import { PaperStretchCeilingPage } from './PaperStretchCeilingPage';
import { StretchCeilingDetailPage } from './StretchCeilingDetailPage';

interface Service {
  _id: string;
  title?: string; // For backward compatibility
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  category?: string;
  image: string;
  detailImages?: string[];
  features?: string[];
  benefits?: string[];
  applications?: string[];
  specifications?: {
    material?: string;
    thickness?: string;
    colors?: string;
    warranty?: string;
    installation?: string;
  };
  featured: boolean;
  createdAt: string;
}

interface ServicesPageProps {
  onSelect?: (item: Service, isService: boolean) => void;
  category?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  initialSelectedCeilingType?: string;
}

export function ServicesPage({ onSelect, category, pageTitle, pageSubtitle, initialSelectedCeilingType }: ServicesPageProps) {
  const { t, language, isRTL } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCeilingType, setSelectedCeilingType] = useState<string | null>(initialSelectedCeilingType || null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (initialSelectedCeilingType) {
      setSelectedCeilingType(initialSelectedCeilingType);
    }
  }, [initialSelectedCeilingType]);

  const fetchServices = async () => {
    try {
      let response;
      
      // Use specific API endpoints based on category
      if (category === 'acoustic') {
        response = await fetch('/api/acoustic-panels');
      } else if (category === 'stretch') {
        response = await fetch('/api/stretch-ceilings');
      } else {
        // For other categories, return empty array since services API no longer exists
        setServices([]);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCeilingTypeSelect = (ceilingType: string) => {
    setSelectedCeilingType(ceilingType);
  };

  const handleBackToServices = () => {
    setSelectedCeilingType(null);
    setSelectedService(null);
  };

  // Render individual ceiling type pages or selected admin-added service detail
  if (selectedCeilingType) {
    switch (selectedCeilingType) {
      case 'glossy':
        return <GlossyStretchCeilingPage onBack={handleBackToServices} />;
      case 'backlit':
        return <BacklitStretchCeilingPage onBack={handleBackToServices} />;
      case 'acoustic':
        return <AcousticStretchCeilingPage onBack={handleBackToServices} />;
      case '3d':
        return <ThreeDStretchCeilingPage onBack={handleBackToServices} />;
      case 'reflective':
        return <ReflectiveStretchCeilingPage onBack={handleBackToServices} />;
      case 'matte':
        return <MatteStretchCeilingPage onBack={handleBackToServices} />;
      case 'fiber-optic':
        return <FiberOpticStretchCeilingPage onBack={handleBackToServices} />;
      case 'printed':
        return <PrintedStretchCeilingPage onBack={handleBackToServices} />;
      case 'translucent':
        return <TranslucentStretchCeilingPage onBack={handleBackToServices} />;
      case 'paper':
        return <PaperStretchCeilingPage onBack={handleBackToServices} />;
      default:
        return <div>Ceiling type not found</div>;
    }
  }

  if (selectedService) {
    const svc = selectedService;
    const titleEn = svc.titleEn || svc.title || '';
    const titleAr = svc.titleAr || svc.title || '';
    const descriptionEn = svc.descriptionEn || svc.description || '';
    const descriptionAr = svc.descriptionAr || svc.description || '';
    const images = {
      main: svc.image,
      gallery: Array.isArray(svc.detailImages) && svc.detailImages.length > 0 ? svc.detailImages : [svc.image],
    };
    const features = Array.isArray(svc.features) && svc.features.length > 0 ? svc.features : [
      'Seamless modern finish', 'Durable and long-lasting', 'Moisture and fire resistant'
    ];
    const benefits = Array.isArray(svc.benefits) && svc.benefits.length > 0 ? svc.benefits : [
      'Enhances lighting and ambiance', 'Fast installation with minimal disruption', 'Easy maintenance'
    ];
    const applications = Array.isArray(svc.applications) && svc.applications.length > 0 ? svc.applications : [
      'Residential interiors', 'Retail stores', 'Restaurants and cafes'
    ];
    const specifications = {
      material: svc.specifications?.material || 'PVC / Polyester membrane',
      thickness: svc.specifications?.thickness || '0.18mm (typical)',
      colors: svc.specifications?.colors || '100+ colors and finishes',
      warranty: svc.specifications?.warranty || '10-Year Warranty',
      installation: svc.specifications?.installation || 'Certified installation team',
    };

    return (
      <StretchCeilingDetailPage
        ceilingType={"custom"}
        titleEn={titleEn}
        titleAr={titleAr}
        descriptionEn={descriptionEn}
        descriptionAr={descriptionAr}
        features={features}
        benefits={benefits}
        applications={applications}
        specifications={specifications}
        images={images}
        onBack={handleBackToServices}
      />
    );
  }

  return (
    <section className="min-h-screen overflow-x-hidden">
      {/* Header Section with Cover Image */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Cover Image Background */}
        <div className="absolute inset-0">
          <img 
            src="/ourservices.webp"
            alt="Services cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content over the cover */}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-full overflow-x-hidden">
          <MH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
          >
            {pageTitle || t('servicesPageTitle')}
          </MH1>
          {pageSubtitle && (
            <MP 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mt-4 font-light"
            >
              {pageSubtitle}
            </MP>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="bg-gray-800 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          {/* Introduction Section */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {pageTitle || t('servicesPageTitle')}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              {pageSubtitle || t('stretchCeilingPageDescription')}
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <MDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">{t('warranty10Years')}</span>
              </MDiv>
              <MDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">{t('europeanMaterials')}</span>
              </MDiv>
              <MDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-lg">{t('certifiedInstallationTeam')}</span>
              </MDiv>
            </div>
          </MDiv>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full overflow-x-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`stretch-skel-${i}`} className="bg-gray-900 rounded-lg overflow-hidden">
                  {/* image skeleton */}
                  <div className="aspect-square w-full bg-gray-700 animate-pulse" />
                  {/* content skeleton */}
                  <div className="p-6 text-center">
                    <div className="h-5 w-3/4 mx-auto bg-gray-700 rounded animate-pulse mb-4" />
                    <div className="h-9 w-32 mx-auto bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full overflow-x-hidden">
              {services.map((service, index) => {
                // Map service titles to ceiling types for navigation
                const getCeilingType = (title: string) => {
                  const titleLower = title.toLowerCase();
                  if (titleLower.includes('glossy')) return 'glossy';
                  if (titleLower.includes('hidden lighting') || titleLower.includes('backlit')) return 'backlit';
                  if (titleLower.includes('perforated') || titleLower.includes('acoustic')) return 'acoustic';
                  if (titleLower.includes('3d')) return '3d';
                  if (titleLower.includes('reflective')) return 'reflective';
                  if (titleLower.includes('matte')) return 'matte';
                  if (titleLower.includes('fiber optic')) return 'fiber-optic';
                  if (titleLower.includes('printed')) return 'printed';
                  if (titleLower.includes('light transmitting') || titleLower.includes('translucent')) return 'translucent';
                  if (titleLower.includes('paper')) return 'paper';
                  return null;
                };

                const ceilingType = getCeilingType(service.titleEn || service.title || '');

                return (
                  <MDiv 
                    key={service._id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={service.image.startsWith('http') ? service.image : service.image}
                        alt={service.titleEn || service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        {(() => {
                          return language === 'ar' 
                            ? (service.titleAr || service.titleEn || service.title)
                            : (service.titleEn || service.title);
                        })()}
                      </h3>
                      {ceilingType ? (
                        <button 
                          onClick={() => handleCeilingTypeSelect(ceilingType)} 
                          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:from-orange-500 hover:to-yellow-600"
                        >
                          {t('viewDetails')}
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            // For stretch ceilings, render dedicated detail page instead of generic project/service detail
                            setSelectedService(service);
                            if (category !== 'stretch') {
                              onSelect?.(service, true);
                            }
                          }} 
                          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:from-orange-500 hover:to-yellow-600"
                        >
                          {t(category === 'stretch' ? 'viewDetails' : 'more')}
                        </button>
                      )}
                    </div>
                  </MDiv>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Stretch Ceilings Features Section */}
      <div className="bg-gray-800 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          {/* Header */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-center'}`}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
              {t('stretchCeilingsFeatures')}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              {t('stretchCeilingsFeaturesDescription')}
            </p>
          </MDiv>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-100 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <BookOpen className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingsMaterialsColors')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingsMaterialsColorsDescription')}
              </p>
            </MDiv>

            {/* Feature 2 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-50 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <Droplets className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingsProtectionLeakage')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingsProtectionLeakageDescription')}
              </p>
            </MDiv>

            {/* Feature 3 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-pink-50 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <Building className="w-12 h-12 text-pink-600 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('modernStretchCeilingsInstallation')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('modernStretchCeilingsInstallationDescription')}
              </p>
            </MDiv>

            {/* Feature 4 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-50 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <Wine className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('easyStretchCeilingsTransportSetup')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('easyStretchCeilingsTransportSetupDescription')}
              </p>
            </MDiv>

            {/* Feature 5 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-purple-50 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <Globe className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('fireMoistureProtection')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('fireMoistureProtectionDescription')}
              </p>
            </MDiv>

            {/* Feature 6 */}
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-green-50 rounded-lg p-8 hover:transform hover:scale-105 transition-all duration-300"
              style={{ overflow: 'hidden' }}
            >
              <Briefcase className="w-12 h-12 text-green-600 mb-6" />
              <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingSupportInfrastructureSystems')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('ceilingSupportInfrastructureSystemsDescription')}
              </p>
            </MDiv>
          </div>
        </div>
      </div>
    </section>
  );
}