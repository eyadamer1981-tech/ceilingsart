import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
const MDiv = motion.div as any;
const MH1 = motion.h1 as any;
const MButton = motion.button as any;

interface FeaturedContent {
  services: any[];
  projects: any[];
  blogs: any[];
}

interface PageCovers {
  home?: {
    hero?: string;
    about?: string;
    services?: string;
  };
}

export function HomepageHero({ onGetStarted }: { onGetStarted?: () => void }) {
  const { t, isRTL } = useLanguage();
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent>({
    services: [],
    projects: [],
    blogs: []
  });
  const [pageCovers, setPageCovers] = useState<PageCovers>({});
  const [heroImage, setHeroImage] = useState<string>('/image.png'); // Fallback image
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null!);
  const { scrollYProgress } = useScroll({ target: sectionRef as any, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    fetchFeaturedContent();
    fetchPageCovers();
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

  const fetchPageCovers = async () => {
    try {
      const response = await fetch('/api/page-covers/public?pageType=home');
      const data = await response.json();
      setPageCovers(data);
      
      // Set hero image from MongoDB or use fallback
      if (data.home?.hero) {
        setHeroImage(data.home.hero);
      }
      // Always set imageLoaded to true after API call completes
      setImageLoaded(true);
    } catch (error) {
      console.error('Error fetching page covers:', error);
      // Keep fallback image if API fails, but still show it
      setImageLoaded(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background block color like homepage header */}
      <div className="absolute inset-0"         style={{
          background: 'linear-gradient(to bottom, #373E44 0%, #373E44 80%, #ffffff 80%, #ffffff 100%)'
        }} />

      {/* Rotated background blob like homepage asset */}
      <MDiv 
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
          willChange: 'transform',
          y: blobY
        }}
        animate={{}}
      />

      {/* Center ellipse 870x870 with inner vignette (raised slightly) */}
      {imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" aria-hidden>
          <MDiv
            className="relative rounded-full bg-center-image"
            style={{
              width: '600px',
              height: '600px',
              transform: 'translateY(100px)',
              backgroundImage: `url('${heroImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.9,
              WebkitMaskImage:
                'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0) 100%)',
              willChange: 'transform',
              scale: heroScale, 
              y: heroY
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
        </MDiv>
      </div>
      )}

      {/* Top logo (positioned on the left) */}
      <div className="absolute z-20 top-10 sm:top-10 md:top-40 left-8" aria-hidden>
        <img src="/newlogo.png" alt="Logo" width={400} height={400} className="w-[400px] h-[400px] object-contain" />
      </div>

      {/* Headline and CTA centered like homepage (lowered) */}
      <MDiv 
        className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-80 sm:pt-[28rem] md:pt-[30rem] lg:pt-[40rem]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      >
        <MH1 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-wide leading-tight ${isRTL ? 'text-right' : 'text-center'}`}
          variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } } }}
        >
          {t('heroTitle')}
        </MH1>
        <MDiv 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.1 } } }}
        >
          <MButton 
            onClick={() => onGetStarted?.()}
            className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg"
            whileHover={{
              scaleX: 1.08,
              scaleY: 1.0,
              filter: 'drop-shadow(0 16px 44px rgba(255,200,80,0.5))'
            }}
            animate={{
              // Pulsing glow using drop-shadows to emulate soft aura
              filter: [
                'drop-shadow(0 10px 28px rgba(255,180,60,0.18))',
                'drop-shadow(0 14px 36px rgba(255,200,80,0.42))',
                'drop-shadow(0 10px 28px rgba(255,180,60,0.18))'
              ]
            }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            whileTap={{ scale: 0.98 }}
          >
            {isRTL ? 'اطلب عرض سعر' : 'Get Instant Quote'}
          </MButton>
          <MButton 
            onClick={() => window.open('https://wa.me/966575474699', '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg"
            whileHover={{
              scaleX: 1.08,
              scaleY: 1.0,
              filter: 'drop-shadow(0 16px 44px rgba(16,185,129,0.5))'
            }}
            animate={{
              // Similar glow to quote button but in WhatsApp green
              filter: [
                'drop-shadow(0 10px 28px rgba(16,185,129,0.18))',
                'drop-shadow(0 14px 36px rgba(16,185,129,0.44))',
                'drop-shadow(0 10px 28px rgba(16,185,129,0.18))'
              ]
            }}
            transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRTL ? 'واتساب' : 'WhatsApp'}
          </MButton>
        </MDiv>

        <div className={`mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/90 ${isRTL ? 'text-right' : 'text-center'}`}>
          <span className="text-sm sm:text-base">{isRTL ? 'ضمان 10 سنوات' : '10-year warranty'}</span>
          <span className="hidden sm:inline text-white/40">.</span>
          <span className="text-sm sm:text-base">{isRTL ? 'خامات أوروبية' : 'European materials'}</span>
          <span className="hidden sm:inline text-white/40">.</span>
          <span className="text-sm sm:text-base">{isRTL ? 'تركيب إحترافي' : 'Professional installation'}</span>
        </div>
      </MDiv>

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


