import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedContent {
  services: any[];
  projects: any[];
  blogs: any[];
}

export function HomepageHero() {
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background block color like homepage header */}
      <div className="absolute inset-0"         style={{
          background: 'linear-gradient(to bottom, #373E44 0%, #373E44 80%, #ffffff 80%, #ffffff 100%)'
        }} />

      {/* Rotated background blob like homepage asset */}
      <div 
        className="absolute pointer-events-none z-10" 
        aria-hidden
        style={{
          left: '500px',
          top: '-271.97px',
          width: '1000.09px',
          height: '1930.64px',
          transform: 'rotate(30.298deg) skewX(2.627deg)',
          opacity: 0.59,
          backgroundImage: "url('/background-blob-service-1.png.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 104.77%',
          backgroundPosition: 'left top',
          filter: 'saturate(105%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
          maskImage: 'radial-gradient(ellipse 60% 50% at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
          willChange: 'transform'
        }}
      />

      {/* Center ellipse 870x870 with inner vignette (raised slightly) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" aria-hidden>
        <div
          className="relative rounded-full bg-center-image"
          style={{
            width: '600px',
            height: '600px',
            transform: 'translateY(100px)',
            backgroundImage: "url('/image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
            WebkitMaskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 100%)',
            willChange: 'transform'
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 140px 60px rgba(55,62,68,0.5) inset' }}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(55,62,68,0) 70%, rgba(55,62,68,0.18) 88%, rgba(55,62,68,0.3) 100%)'
            }}
          />
        </div>
      </div>

      {/* Top logo (higher on mobile) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 top-10 sm:top-10 md:top-40" aria-hidden>
        <img src="/logo.png" alt="Logo" width={229} height={229} className="w-[229px] h-[229px] object-contain" />
      </div>

      {/* Headline and CTA centered like homepage (lowered) */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-80 sm:pt-[28rem] md:pt-[30rem] lg:pt-[40rem]">
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
        <button className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 shadow-lg">
          {t('getStarted')}
        </button>
      </div>

      {/* Bottom wave from homepage vector */}
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
    </section>
  );
}

export default HomepageHero;


