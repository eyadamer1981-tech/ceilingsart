import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  _id: string;
  title: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  image: string;
  detailImages?: string[];
  featured: boolean;
  createdAt: string;
}

export function ServicesPage({ onSelect }: { onSelect?: (item: Service, isService: boolean) => void }) {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to default services if backend is not available
      setServices([
        {
          _id: '1',
          title: "Luxury Ceiling Design",
          description: "Transform your space with our bespoke luxury ceiling designs. From coffered ceilings to modern geometric patterns, we create stunning architectural features that elevate any interior.",
          image: "/ourservices.webp",
          featured: false,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
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
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            {t('servicesPageTitle')}
          </h1>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-xl text-gray-600">{t('loadingServices')}</div>
            </div>
          ) : (
            <div className="space-y-16">
              {services.map((service, index) => (
              <div key={service._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                  <div className="aspect-[4/3] lg:aspect-auto cursor-pointer" onClick={() => onSelect?.(service, true)}>
                      <ImageWithFallback
                        src={service.image.startsWith('http') ? service.image : service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6 tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {(() => {
                          // Use language-specific description from backend, fallback to generic description
                          const description = language === 'ar' 
                            ? (service.descriptionAr || service.description)
                            : (service.descriptionEn || service.description);
                          return description;
                        })()}
                      </p>
                      <button onClick={() => onSelect?.(service, true)} className="mt-8 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium tracking-wide self-start">
                        {t('learnMore')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}