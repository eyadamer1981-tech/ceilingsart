import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const MDiv = motion.div as any;
import { useLanguage } from '../contexts/LanguageContext';

interface PageCovers {
  home?: {
    hero?: string;
    about?: string;
    services?: string;
  };
}

export function AboutUsSection() {
  const { t, isRTL } = useLanguage();
  const [aboutImage, setAboutImage] = useState<string>('/aboutus in homepage.png'); // Fallback image

  useEffect(() => {
    fetchPageCovers();
  }, []);

  const fetchPageCovers = async () => {
    try {
      const response = await fetch('/api/page-covers/public?pageType=home');
      const data = await response.json();
      
      // Set about image from MongoDB or use fallback
      if (data.home?.about) {
        setAboutImage(data.home.about);
      }
    } catch (error) {
      console.error('Error fetching page covers:', error);
      // Keep fallback image if API fails
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <MDiv
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={aboutImage}
                alt="About Us"
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </MDiv>
          </div>

          {/* Content */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <MDiv
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className={`text-4xl font-light text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'من نحن' : 'About Us'}
              </h2>
              <div className={`space-y-4 text-lg text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                <p>
                  {isRTL ? (
                    'نحن متخصصون في تصميم وتركيب الأسقف المعلقة والحلول الصوتية المتقدمة. مع سنوات من الخبرة في الصناعة، نقدم خدمات عالية الجودة تلبي احتياجات العملاء في المملكة العربية السعودية.'
                  ) : (
                    'We specialize in designing and installing stretch ceilings and advanced acoustic solutions. With years of experience in the industry, we provide high-quality services that meet our clients\' needs across Saudi Arabia.'
                  )}
                </p>
                <p>
                  {isRTL ? (
                    'نلتزم بالجودة والدقة في كل مشروع نقوم به. هدفنا هو تقديم نتائج استثنائية ورفع مستوى المساحات الداخلية مع الحفاظ على أعلى معايير الحرفية.'
                  ) : (
                    'We are committed to quality and precision in every project we undertake. Our goal is to deliver exceptional results and elevate interior spaces while maintaining the highest standards of craftsmanship.'
                  )}
                </p>
              </div>

              {/* Pillars: Innovation / Excellence / Craftsmanship */}
              <div className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {[
                  { src: '/innovation.webp', labelEn: 'Innovation', labelAr: 'الابتكار' },
                  { src: '/excellence.webp', labelEn: 'Excellence', labelAr: 'التميّز' },
                  { src: '/craftsmanship.webp', labelEn: 'Craftsmanship', labelAr: 'الحرفية' }
                ].map((item, i) => (
                  <MDiv
                    key={item.src}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 * i }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={item.src} alt={(isRTL ? item.labelAr : item.labelEn) + ' icon'} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-900 font-medium">{isRTL ? item.labelAr : item.labelEn}</p>
                    </div>
                  </MDiv>
                ))}
              </div>
            </MDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
