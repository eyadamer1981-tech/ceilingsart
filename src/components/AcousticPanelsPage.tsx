'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AcousticPanelDetailPage } from './AcousticPanelDetailPage';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;
const MH1 = motion.h1 as any;
const MP = motion.p as any;

interface AcousticPanel {
  _id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  image: string;
  detailImages?: string[];
  featured: boolean;
  rightLeftSection?: boolean;
}

interface AcousticPanelsPageProps {
  onSelect?: (item: any, isService: boolean) => void;
  panelType?: string;
}

export function AcousticPanelsPage({ onSelect, panelType }: AcousticPanelsPageProps) {
  console.log('AcousticPanelsPage received props:', { panelType, onSelect: !!onSelect });
  const { t, isRTL } = useLanguage();
  const [acousticPanels, setAcousticPanels] = useState<AcousticPanel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState<AcousticPanel | null>(null);

  useEffect(() => {
    fetchAcousticPanels();
  }, []);

  // Auto-select panel based on panelType prop
  useEffect(() => {
    console.log('Auto-select effect triggered:', { panelType, acousticPanelsLength: acousticPanels.length });
    if (panelType) {
      let targetPanel: AcousticPanel | null = null;

      switch (panelType) {
        case 'fabric-wraps':
          targetPanel = {
            _id: 'fabric-wraps',
            titleEn: 'Acoustic Fabric Wraps',
            titleAr: 'أغلفة القماش الصوتية',
            descriptionEn: 'Elegant acoustic panels wrapped with high-quality fabric to improve acoustics while maintaining modern design. Perfect for offices, studios, and commercial spaces.',
            descriptionAr: 'ألواح صوتية أنيقة مغلفة بقماش عالي الجودة لتحسين الصوتيات مع الحفاظ على التصميم العصري. مثالية للمكاتب والاستوديوهات والمساحات التجارية.',
            category: 'Fabric Wrapped',
            image: '/fabrice.webp',
            featured: true,
            rightLeftSection: false
          };
          break;
        case 'polyester':
          targetPanel = {
            _id: 'polyester-panels',
            titleEn: 'Polyester Acoustic Panels',
            titleAr: 'الألواح الصوتية البوليستر',
            descriptionEn: 'Acoustic panels made from high-density polyester fibers for excellent sound absorption and moisture resistance. Ideal for humid environments and high-traffic areas.',
            descriptionAr: 'ألواح صوتية مصنوعة من ألياف البوليستر عالية الكثافة لامتصاص الصوت الممتاز ومقاومة الرطوبة. مثالية للبيئات الرطبة والمناطق عالية الحركة.',
            category: 'Polyester',
            image: '/polyeseter.webp',
            featured: true,
            rightLeftSection: false
          };
          break;
        case 'wood-wool':
          targetPanel = {
            _id: 'wood-wool-panels',
            titleEn: 'Wood Wool Panels',
            titleAr: 'ألواح الصوف الخشبي',
            descriptionEn: 'Natural acoustic panels made from treated wood fibers, providing excellent sound insulation and beautiful natural appearance. Perfect for eco-friendly and sustainable design projects.',
            descriptionAr: 'ألواح صوتية طبيعية مصنوعة من ألياف الخشب المعالجة، توفر عزل صوتي ممتاز ومظهر طبيعي جميل. مثالية لمشاريع التصميم الصديقة للبيئة والمستدامة.',
            category: 'Wood Wool',
            image: '/wood wool.webp',
            featured: true,
            rightLeftSection: false
          };
          break;
        case 'alandalus':
          // For Alandalus, we'll use the first available panel or create a default one
          targetPanel = acousticPanels.find(panel => panel.category === 'Alandalus') || acousticPanels[0];
          break;
      }

      if (targetPanel) {
        console.log('Setting selected panel:', targetPanel);
        setSelectedPanel(targetPanel);
      }
    }
  }, [panelType, acousticPanels]);

  const fetchAcousticPanels = async () => {
    try {
      console.log('Fetching acoustic panels...');
      const response = await fetch('/api/acoustic-panels');
      const data = await response.json();
      console.log('Received data:', data.length, 'acoustic panels');
      
      setAcousticPanels(data);
    } catch (error) {
      console.error('Error fetching acoustic panels:', error);
      // Fallback to empty array if API fails
      setAcousticPanels([]);
    } finally {
      setLoading(false);
    }
  };

  // Get featured panels for product categories
  const featuredPanels = acousticPanels.filter(panel => panel.featured);
  
  // Get panels for right-left alternating section
  const rightLeftPanels = acousticPanels.filter(panel => panel.rightLeftSection);
  
  // Get all other panels for general showcase
  const showcasePanels = acousticPanels.filter(panel => !panel.featured && !panel.rightLeftSection);

  const handlePanelSelect = (panel: AcousticPanel) => {
    setSelectedPanel(panel);
  };

  const handleBackToPanels = () => {
    setSelectedPanel(null);
  };

  // If a panel is selected, show the detail page
  if (selectedPanel) {
    return (
      <AcousticPanelDetailPage 
        panel={selectedPanel} 
        onBack={handleBackToPanels}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner/Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Cover Image Background */}
        <div className="absolute inset-0">
          <img 
            src="/acusticpanelinhomepage.png"
            alt="Acoustic Panels cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content over the cover */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <MH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
          >
            {t('acousticPanels')}
          </MH1>
          <MP 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mt-4 font-light"
          >
            {t('acousticPanelsDescription')}
          </MP>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-16">
        </div>

        {/* Main Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Acoustic Fabric Wraps */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center group"
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700">
              <img
                src="/fabrice.webp"
                alt={isRTL ? 'أغلفة القماش الصوتية' : 'Acoustic Fabric Wraps'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-acoustic.jpg';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              {isRTL ? 'أغلفة القماش الصوتية' : 'Acoustic Fabric Wraps'}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {isRTL 
                ? 'ألواح صوتية أنيقة مغلفة بقماش عالي الجودة لتحسين الصوتيات مع الحفاظ على التصميم العصري.'
                : 'Elegant acoustic panels wrapped with high-quality fabric to improve acoustics while maintaining modern design.'
              }
            </p>
            <button 
              onClick={() => handlePanelSelect({
                _id: 'fabric-wraps',
                titleEn: 'Acoustic Fabric Wraps',
                titleAr: 'أغلفة القماش الصوتية',
                descriptionEn: 'Elegant acoustic panels wrapped with high-quality fabric to improve acoustics while maintaining modern design. Perfect for offices, studios, and commercial spaces.',
                descriptionAr: 'ألواح صوتية أنيقة مغلفة بقماش عالي الجودة لتحسين الصوتيات مع الحفاظ على التصميم العصري. مثالية للمكاتب والاستوديوهات والمساحات التجارية.',
                category: 'Fabric Wrapped',
                image: '/fabrice.webp',
                featured: true,
                rightLeftSection: false
              })}
              className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded font-semibold transition-colors"
            >
              {t('viewDetails')}
            </button>
          </MDiv>

          {/* Polyester Acoustic Panels */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center group"
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700">
              <img
                src="/polyeseter.webp"
                alt={isRTL ? 'الألواح العازلة البوليستر' : 'Polyester Acoustic Panels'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-acoustic.jpg';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              {isRTL ? 'الألواح العازلة البوليستر' : 'Polyester Acoustic Panels'}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {isRTL 
                ? 'ألواح صوتية مصنوعة من ألياف البوليستر عالية الكثافة لامتصاص الصوت الممتاز ومقاومة الرطوبة.'
                : 'Acoustic panels made from high-density polyester fibers for excellent sound absorption and moisture resistance.'
              }
            </p>
            <button 
              onClick={() => handlePanelSelect({
                _id: 'polyester-panels',
                titleEn: 'Polyester Acoustic Panels',
                titleAr: 'الألواح العازلة البوليستر',
                descriptionEn: 'Acoustic panels made from high-density polyester fibers for excellent sound absorption and moisture resistance. Ideal for humid environments and high-traffic areas.',
                descriptionAr: 'ألواح صوتية مصنوعة من ألياف البوليستر عالية الكثافة لامتصاص الصوت الممتاز ومقاومة الرطوبة. مثالية للبيئات الرطبة والمناطق عالية الحركة.',
                category: 'Polyester',
                image: '/polyeseter.webp',
                featured: true,
                rightLeftSection: false
              })}
              className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded font-semibold transition-colors"
            >
              {t('viewDetails')}
            </button>
          </MDiv>

          {/* Wood Wool Panels */}
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center group"
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700">
              <img
                src="/wood wool.webp"
                alt={isRTL ? 'ألواح الصوف الخشبي' : 'Wood Wool Panels'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-acoustic.jpg';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              {isRTL ? 'ألواح الصوف الخشبي' : 'Wood Wool Panels'}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {isRTL 
                ? 'ألواح صوتية طبيعية مصنوعة من ألياف الخشب المعالجة، توفر عزل صوتي ممتاز ومظهر طبيعي جميل.'
                : 'Natural acoustic panels made from treated wood fibers, providing excellent sound insulation and beautiful natural appearance.'
              }
            </p>
            <button 
              onClick={() => handlePanelSelect({
                _id: 'wood-wool-panels',
                titleEn: 'Wood Wool Panels',
                titleAr: 'ألواح الصوف الخشبي',
                descriptionEn: 'Natural acoustic panels made from treated wood fibers, providing excellent sound insulation and beautiful natural appearance. Perfect for eco-friendly and sustainable design projects.',
                descriptionAr: 'ألواح صوتية طبيعية مصنوعة من ألياف الخشب المعالجة، توفر عزل صوتي ممتاز ومظهر طبيعي جميل. مثالية لمشاريع التصميم الصديقة للبيئة والمستدامة.',
                category: 'Wood Wool',
                image: '/wood wool.webp',
                featured: true,
                rightLeftSection: false
              })}
              className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded font-semibold transition-colors"
            >
              {t('viewDetails')}
            </button>
          </MDiv>
        </div>

        {/* Database Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`featured-acoustic-skel-${i}`} className="text-center group">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700 animate-pulse" />
                <div className="h-6 w-2/3 mx-auto bg-gray-700 rounded animate-pulse mb-3" />
                <div className="h-4 w-5/6 mx-auto bg-gray-700 rounded animate-pulse mb-6" />
                <div className="h-10 w-28 mx-auto bg-gray-700 rounded-full animate-pulse" />
              </div>
            ))
          ) : (
            featuredPanels.map((panel, index) => (
              <MDiv 
                key={panel._id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700">
                  <img
                    src={panel.image}
                    alt={isRTL ? panel.titleAr : panel.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-acoustic.jpg';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {isRTL ? panel.titleAr : panel.titleEn}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {isRTL ? panel.descriptionAr : panel.descriptionEn}
                </p>
                <button 
                  onClick={() => handlePanelSelect(panel)}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded font-semibold transition-colors"
                >
                  {t('viewDetails')}
                </button>
              </MDiv>
            ))
          )}
        </div>

        {/* Right-Left Alternating Section */}
        {rightLeftPanels.length > 0 && (
          <div className="mt-16">
            {rightLeftPanels.map((panel, index) => (
              <MDiv 
                key={panel._id} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <img
                    src={panel.image}
                    alt={isRTL ? panel.titleAr : panel.titleEn}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-acoustic.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {isRTL ? panel.titleAr : panel.titleEn}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {isRTL ? panel.descriptionAr : panel.descriptionEn}
                  </p>
                </div>
              </MDiv>
            ))}
          </div>
        )}

        {/* All Panels as Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`acoustic-card-skel-${i}`} className="text-center group max-w-sm mx-auto">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700 animate-pulse" />
                <div className="h-5 w-3/4 mx-auto bg-gray-700 rounded animate-pulse mb-4" />
                <div className="h-9 w-24 mx-auto bg-gray-700 rounded-md animate-pulse" />
              </div>
            ))
          ) : (
            acousticPanels.filter(panel => !panel.featured && !panel.rightLeftSection).map((panel, index) => (
              <MDiv 
                key={panel._id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group max-w-sm mx-auto"
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-700">
                  <img
                    src={panel.image}
                    alt={isRTL ? panel.titleAr : panel.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-acoustic.jpg';
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {isRTL ? panel.titleAr : panel.titleEn}
                </h3>
                <button 
                  onClick={() => handlePanelSelect(panel)}
                  className="px-4 py-2 bg-stone-700 text-white rounded-md hover:bg-stone-800 transition-colors duration-300 text-sm"
                >
                  {t('viewDetails')}
                </button>
              </MDiv>
            ))
          )}
        </div>

      </div>
    </div>
  );
}