'use client';

import { useState, useEffect } from 'react';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;
import { useLanguage } from '../contexts/LanguageContext';

interface PageCovers {
  home?: {
    hero?: string;
    about?: string;
    services?: string;
  };
}

export function MainServicesSection({ onLearnMore }: { onLearnMore?: (serviceType: string) => void }) {
  const { t, isRTL } = useLanguage();
  const [servicesImage, setServicesImage] = useState<string>('/stretchceilinginhomepage.png'); // Fallback image

  useEffect(() => {
    fetchPageCovers();
  }, []);

  const fetchPageCovers = async () => {
    try {
      const response = await fetch('/api/page-covers/public?pageType=home');
      const data = await response.json();
      
      // Set services image from MongoDB or use fallback
      if (data.home?.services) {
        setServicesImage(data.home.services);
      }
    } catch (error) {
      console.error('Error fetching page covers:', error);
      // Keep fallback image if API fails
    }
  };

  const services = [
    {
      type: 'STRETCH CEILINGS',
      title: isRTL ? 'الأسقف المعلقة' : 'Stretch Ceilings',
      titleAr: 'الأسقف المعلقة',
      titleEn: 'Stretch Ceilings',
      description: isRTL 
        ? 'تصاميم أسقف معلقة مبتكرة وأنيقة تناسب المساحات السكنية والتجارية. نقدم حلول متعددة تشمل الأسقف اللامعة والمطبوعة والشفافة.'
        : 'Innovative and elegant stretch ceiling designs suitable for residential and commercial spaces. We offer multiple solutions including glossy, printed, and translucent ceilings.',
      image: servicesImage,
      features: isRTL ? [
        'أسقف لامعة',
        'أسقف مطبوعة',
        'أسقف شفافة',
        'أسقف ثلاثية الأبعاد',
        'أسقف بألياف بصرية'
      ] : [
        'Glossy Ceilings',
        'Printed Ceilings', 
        'Translucent Ceilings',
        '3D Ceilings',
        'Fiber Optic Ceilings'
      ]
    },
    {
      type: 'ACOUSTIC PANELS',
      title: isRTL ? 'الألواح العازلة' : 'Acoustic Panels',
      titleAr: 'الألواح العازلة',
      titleEn: 'Acoustic Panels',
      description: isRTL
        ? 'حلول صوتية متقدمة لتحسين جودة الصوت والتحكم في الضوضاء. ألواح عازلة للصوت مصممة للمساحات السكنية والتجارية.'
        : 'Advanced acoustic solutions to improve sound quality and noise control. Soundproof panels designed for residential and commercial spaces.',
      image: servicesImage,
      features: isRTL ? [
        'ألواح من الألياف',
        'ألواح من البوليستر',
        'ألواح خشبية',
        'ألواح مبطنة بالقماش',
        'عزل صوتي متقدم'
      ] : [
        'Fabric Panels',
        'Polyester Panels',
        'Wood Wool Panels', 
        'Fabric Wrapped Panels',
        'Advanced Sound Insulation'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MDiv 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl font-light text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-center'}`}>
            {isRTL ? 'خدماتنا الرئيسية' : 'Our Main Services'}
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
            {isRTL 
              ? 'نقدم حلول شاملة للأسقف والصوتيات مصممة خصيصاً لاحتياجاتك'
              : 'We provide comprehensive ceiling and acoustic solutions tailored to your needs'
            }
          </p>
        </MDiv>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <MDiv
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.12 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className={`text-2xl font-medium text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <p className={`text-gray-600 mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className={`text-lg font-medium text-gray-900 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'تشمل خدماتنا:' : 'Our services include:'}
                  </h4>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        {!isRTL && (
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex-shrink-0"></div>
                        )}
                        <span className="text-gray-700">{feature}</span>
                        {isRTL && (
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className={`mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <button onClick={() => onLearnMore?.(service.type)} className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-md">
                    {isRTL ? 'اعرف المزيد' : 'Learn More'}
                  </button>
                </div>
              </div>
            </MDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
