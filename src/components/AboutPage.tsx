'use client';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from './ui/MotionWrapper';
import { Map, Building2, Users, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useMotionValue } from 'framer-motion';
const MDiv = motion.div as any;
const MH1 = motion.h1 as any;
const MH2 = motion.h2 as any;
const MP = motion.p as any;
const MButton = motion.button as any;
import { useLanguage } from '../contexts/LanguageContext';
import { SuccessPartnersSection } from './SuccessPartnersSection';

export function AboutPage({ onContactClick }: { onContactClick?: () => void }) {
  const { language, t, isRTL } = useLanguage();

  const aboutHeading = language === 'ar' ? 'سيلينجز آرت' : 'Ceilings Art';
  const aboutTitle = language === 'ar' ? 'من نحن' : 'About Us';
  const sectionHeading = language === 'ar' ? 'تصميم أسقف متميّز مع حلول صوتية متقدمة' : 'Premium Stretch Ceilings & Advanced Acoustic Solutions';
  const p1 = language === 'ar'
    ? 'بخبرة تتجاوز 10 سنوات في الرياض، متخصّصون في الأسقف الفرنسية المشدودة والحلول الصوتية المتقدمة. نصنع ونركّب أنظمة أسقف تجمع بين الجمال والوظيفة وفق أعلى معايير الجودة.'
    : 'With over 10 years of expertise in Riyadh, we specialize in French stretch ceilings and advanced acoustic solutions. We craft and install ceiling systems that blend elegance with superior functionality.';
  const p2 = language === 'ar'
    ? 'نلتزم بالجودة والتنفيذ الدقيق، ونركز على الاستدامة وتنوع التصاميم – لامعة، مطفية، ناقلة للضوء، مطبوعة، وثلاثية الأبعاد – لتلبية الاحتياجات السكنية والتجارية على حد سواء.'
    : 'We are committed to quality, precise execution, and sustainability. From glossy and matte to translucent, printed, and 3D designs, our solutions suit both residential and commercial spaces.';

  const values = language === 'ar'
    ? [
        { 
          banner: '/excellence.webp', 
          title: 'التميّز', 
          desc: 'نسعى للكمال في كل مشروع، مع أعلى معايير الجودة والدقة.' 
        },
        { 
          banner: '/innovation.webp', 
          title: 'الابتكار', 
          desc: 'نستكشف باستمرار تقنيات ومواد جديدة لدفع حدود التصميم.' 
        },
        { 
          banner: '/craftsmanship.webp', 
          title: 'الحِرَفية', 
          desc: 'خبرتنا تصنع أعمالًا متقنة تدوم طويلاً وتُلهم المساحات.' 
        }
      ]
    : [
        { 
          banner: '/excellence.webp', 
          title: 'Excellence', 
          desc: 'We pursue perfection in every project with the highest quality standards.' 
        },
        { 
          banner: '/innovation.webp', 
          title: 'Innovation', 
          desc: 'We continuously explore new techniques and materials to push boundaries.' 
        },
        { 
          banner: '/craftsmanship.webp', 
          title: 'Craftsmanship', 
          desc: 'Our expertise delivers enduring work that elevates every space.' 
        }
      ];

  // Extended content about French stretch ceilings
  const extendedContent = language === 'ar'
    ? {
        title: 'كل ما تحتاج معرفته عن الأسقف الفرنسية المشدودة',
        paragraphs: [
          'الأسقف الفرنسية المشدودة تقنية حديثة تمنحك مظهرًا فخمًا بدون عيوب. يتم تركيب قماش خاص مشدود فوق إطار معدني، ما يخلق سقفًا مثاليًا وجذابًا.',
          'في بصمة الأندلس، نقدم تشكيلة متنوعة من الأسقف: لامعة، مطفية، ثلاثية الأبعاد، بإضاءة خفية أو برسومات مطبوعة، كلها مصممة لتناسب الذوق العصري.',
          'نستخدم خامات أوروبية مقاومة للرطوبة والعوامل البيئية، مع تقديم عزل حراري وصوتي ممتاز، وضمان تنفيذ احترافي.',
          'خدمتنا تشمل كافة مدن المملكة مثل الرياض، جدة، والخبر، مع التزام تام بسرعة التنفيذ والدقة في المواعيد.',
          'إذا كنت تبحث عن تجربة تصميم راقية، فخدماتنا هي الخيار الأمثل لمنزلك أو مشروعك التجاري.'
        ],
        cta: 'اطلب استشارتك المجانية الآن!',
        contactButton: 'اضغط للتواصل'
      }
    : {
        title: 'Everything You Need to Know About French Stretch Ceilings',
        paragraphs: [
          'French stretch ceilings are a modern technology that gives you a luxurious appearance without flaws. A special stretched fabric is installed over a metal frame, creating a perfect and attractive ceiling.',
          'At Andalusia\'s Touch, we offer a diverse range of ceilings: glossy, matte, 3D, with hidden lighting or printed designs, all designed to suit modern taste.',
          'We use European materials resistant to humidity and environmental factors, providing excellent thermal and acoustic insulation, with professional installation guarantee.',
          'Our services cover all cities of the Kingdom including Riyadh, Jeddah, and Al Khobar, with complete commitment to fast execution and punctuality.',
          'If you are looking for an elegant design experience, our services are the optimal choice for your home or commercial project.'
        ],
        cta: 'Request your free consultation now!',
        contactButton: 'Click to Contact'
      };
  return (
    <section className="min-h-screen">
      {/* Header Section with Cover Image */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Cover Image Background */}
        <div className="absolute inset-0">
          <img 
            src="/Gemini_Generated_Image_3b5nq03b5nq03b5n.png"
            alt="About us cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content over the cover */}
        <MDiv 
          className="relative z-10 container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MH1 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {t('aboutTitle')}
          </MH1>
        </MDiv>
      </div>

      {/* Content Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${isRTL ? 'text-right' : ''}`}>
              <MDiv 
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 tracking-wide">
                  {sectionHeading}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {p1}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {p2}
                </p>
              </MDiv>
              <MDiv 
                className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663082353116-73bdf70050be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZWlsaW5nJTIwZGVzaWduJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzU4NTg1OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our craftsmanship"
                  className="w-full h-full object-cover"
                />
              </MDiv>
            </div>

            {/* Values Section */}
            <MDiv 
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : ''}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {values.map(v => (
                <MDiv 
                  key={v.title} 
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={v.banner}
                      alt={v.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600">
                    {v.desc}
                  </p>
                </MDiv>
              ))}
            </MDiv>

            {/* Stats Section */}
            <StatsSection isRTL={isRTL} />
          </div>
        </div>
      </div>

      {/* Extended Content Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
              <MH2 
                className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-wide"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                {extendedContent.title}
              </MH2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                {extendedContent.paragraphs.map((paragraph, index) => (
                  <MP 
                    key={index} 
                    className={isRTL ? 'text-right' : 'text-left'}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    {paragraph}
                  </MP>
                ))}
              </div>

              <MDiv 
                className="mt-12"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-xl font-medium text-gray-900 mb-6">
                  {extendedContent.cta}
                </p>
                <MButton 
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full font-medium hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (onContactClick) {
                      onContactClick();
                    }
                  }}
                >
                  {extendedContent.contactButton}
                </MButton>
              </MDiv>
            </div>
          </div>
        </div>
      </div>

      {/* Success Partners Section */}
      <SuccessPartnersSection />
    </section>
  );
}

function AnimatedNumber({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<any>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      animate(0, to, {
        duration,
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v).toString();
        }
      });
    }
  }, [isInView, to, duration]);

  return (
    <div ref={inViewRef}>
      <span ref={ref}>0</span>
    </div>
  );
}

function StatsSection({ isRTL }: { isRTL: boolean }) {
  const items = [
    { icon: Map, labelEn: 'Locations', labelAr: 'الفروع', value: 2 },
    { icon: Users, labelEn: 'Our Team', labelAr: 'فريقنا', value: 10 },
    { icon: Clock, labelEn: 'Working Hours', labelAr: 'ساعات العمل', value: 2850 },
    { icon: Building2, labelEn: 'Business Hours', labelAr: 'ساعات الدوام', value: 1000 },
  ];

  return (
    <div className="mt-16 bg-gray-900 text-white rounded-2xl px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start text-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <item.icon className="w-10 h-10 text-gray-200" />
            <div className="text-lg text-gray-200">
              {isRTL ? item.labelAr : item.labelEn}
            </div>
            <div className="text-3xl md:text-4xl font-light">
              <AnimatedNumber to={item.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}