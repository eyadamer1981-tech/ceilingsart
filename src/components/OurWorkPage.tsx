import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GallerySkeleton } from './ui/GallerySkeleton';
import { ProductCardSlider, ProductCard } from './ProductCardSlider';
import { useLanguage } from '../contexts/LanguageContext';

export interface OurWorkItem { src: string; title: string; category: string; }

interface OurWorkPageProps {
  onSelect?: (item: OurWorkItem) => void;
  onStartProject?: () => void;
}

export function OurWorkPage({ onSelect, onStartProject }: OurWorkPageProps) {
  const { t, isRTL, language } = useLanguage();
  const [ourWorkImages, setOurWorkImages] = React.useState<OurWorkItem[]>([]);
  const [customSliders, setCustomSliders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<string[]>([]);
  const pageSize = 100; // Increased to get more images for sliders

  React.useEffect(() => {
    async function fetchOurWork() {
      setLoading(true);
      try {
        // Fetch regular our work images
        const res = await fetch(`/api/projects/light?page=1&pageSize=${pageSize}`);
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        setOurWorkImages(items.map((p: any) => ({ 
          src: p.image, 
          title: isRTL && p.titleAr ? p.titleAr : (p.titleEn || p.title), 
          titleAr: p.titleAr,
          category: p.category 
        })));

        // Fetch custom sliders
        const slidersRes = await fetch('/api/custom-sliders');
        const slidersData = await slidersRes.json();
        setCustomSliders(Array.isArray(slidersData) ? slidersData : []);
      } catch (e) {
        setOurWorkImages([]);
        setCustomSliders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOurWork();
  }, []);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/projects/categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {}
    }
    fetchCategories();
  }, []);

  // Group images by category
  const groupedImages = React.useMemo(() => {
    const groups: { [key: string]: ProductCard[] } = {};
    ourWorkImages.forEach(image => {
      const category = image.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push({
        src: image.src,
        title: isRTL && image.titleAr ? image.titleAr : image.title,
        titleAr: image.titleAr,
        category: image.category
      });
    });
    return groups;
  }, [ourWorkImages]);

  return (
    <section className="min-h-screen">
      {/* Header Section with Cover Image */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Cover Image Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwY2VpbGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1ODU5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our Work cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content over the cover */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-4">
            {t('ourWorkPageTitle')}
          </h1>
          <p className="text-xl text-white tracking-wide">
            {t('ourWorkPageSubtitle')}
          </p>
        </div>
      </div>

      {/* Our Work Sliders */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          {/* Our Work Content */}
          {loading && (
            <GallerySkeleton count={pageSize} />
          )}
          {!loading && ourWorkImages.length === 0 && (
            <div className="text-center text-black">No projects found. Use the admin ingestion to import from art_images.</div>
          )}
          {!loading && ourWorkImages.length > 0 && (
            <div className="space-y-16">
              {/* Custom Sliders */}
              {customSliders.map(slider => (
                <ProductCardSlider
                  key={`custom-${slider._id}`}
                  title={slider.title}
                  items={slider.projectIds.map((project: any) => ({
                    src: project.image,
                    title: isRTL && project.titleAr ? project.titleAr : (project.titleEn || project.title),
                    titleAr: project.titleAr,
                    category: project.category
                  }))}
                  onSelect={(item) => onSelect?.(item)}
                />
              ))}
              
              {/* Category Sliders */}
              {Object.entries(groupedImages).map(([category, items]) => (
                <ProductCardSlider
                  key={`category-${category}`}
                  title={category}
                  items={items}
                  onSelect={(item) => onSelect?.(item)}
                />
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
              {t('readyToTransform')}
            </h2>
            <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
              {t('transformDescription')}
            </p>
            <button onClick={() => onStartProject?.()} className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-medium tracking-wide">
              {t('startYourProject')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


