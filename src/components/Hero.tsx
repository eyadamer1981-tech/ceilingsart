import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedContent {
  services: any[];
  projects: any[];
  blogs: any[];
}

export function Hero() {
  const { t, isRTL } = useLanguage();
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent>({
    services: [],
    projects: [],
    blogs: []
  });

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const response = await fetch('/api/featured');
      const data = await response.json();
      setFeaturedContent(data);
    } catch (error) {
      console.error('Error fetching featured content:', error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background split: top half gray, bottom half white */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #373E44 0%, #373E44 80%, #ffffff 80%, #ffffff 100%)'
        }}
      ></div>

      {/* Centered blob background aligned to start near the logo position */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" aria-hidden="true">
        <img
          src="/background-blob-service-1.png.png"
          alt=""
          className="w-[60vw] max-w-[900px]"
          style={{
            opacity: 0.35,
            transform: 'translateY(140px)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 45% at center, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0) 100%)',
            maskImage: 'radial-gradient(ellipse 65% 45% at center, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div> */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" aria-hidden="true">
        <div
          className="rounded-full"
          style={{
            width: '1000px',
            height: '1000px',
            transform: 'translateY(140px)',
            backgroundImage: "url('/background-blob-service-1.png.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 78%, rgba(0,0,0,0) 100%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 78%, rgba(0,0,0,0) 100%)'

          }}
        />
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
        <img
          src="/background-blob-service-1.png.png"
          alt=""
          className="w-[60vw] max-w-[900px]"
          style={{
            opacity: 0.3,
            transform: 'translateY(400px)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0) 85%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0) 85%)'
          }}
        />
      </div> */}

      {/* Centered 870x870 ellipse with feathered edges blending into background (from homepage first section) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true" style={{ zIndex: 5 }}>
        <div
          className="relative rounded-full"
          style={{
            width: '870px',
            height: '870px',
            backgroundImage: "url('/image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
            WebkitMaskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              boxShadow: '0 0 120px 40px rgba(55,62,68,0.55) inset'
            }}
          />
        </div>
      </div>

      {/* Top-centered logo (229x229) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 translate-y-1/2" aria-hidden="true">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-[229px] h-[229px] object-contain"
          width={229}
          height={229}
        />
      </div>
      
      {/* Bottom full-width vector image */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src="/Vector.png"
          alt="Section bottom decoration"
          className="w-full select-none pointer-events-none block"
          style={{
        
            height: '356.85px',
            width: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Featured Content Preview */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Featured Services */}
          {featuredContent.services.slice(0, 2).map((service, index) => (
            <div
              key={service._id}
              className={`absolute w-32 h-32 opacity-60 transform transition-all duration-500 hover:opacity-80 hover:scale-110 ${
                index === 0 ? 'top-1/4 left-1/4 rotate-12' : 'top-1/3 right-1/4 -rotate-6'
              }`}
            >
              <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={service.image.startsWith('http') ? service.image : service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <span className="text-white text-xs font-medium truncate">{service.title}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Featured Projects */}
          {featuredContent.projects.slice(0, 2).map((project, index) => (
            <div
              key={project._id}
              className={`absolute w-28 h-28 opacity-60 transform transition-all duration-500 hover:opacity-80 hover:scale-110 ${
                index === 0 ? 'bottom-1/3 left-1/3 rotate-45' : 'top-1/2 right-1/3 rotate-12'
              }`}
            >
              <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={project.image.startsWith('http') ? project.image : project.image}
                  alt={project.titleEn || project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <span className="text-white text-xs font-medium truncate">{project.titleEn || project.title}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Fallback geometric shapes removed per request */}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-wide leading-tight ${isRTL ? 'text-right' : 'text-center'}`}>
          {isRTL ? (
            <>
              حول مساحتك<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>بتصاميم أسقف مخصصة
            </>
          ) : (
            <>
              TRANSFORM YOUR SPACE<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>WITH BESPOKE CEILING ATR
            </>
          )}
        </h1>
        
        <button className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg font-medium tracking-wide">
          {t('getStarted')}
        </button>
      </div>
    </section>
  );
}