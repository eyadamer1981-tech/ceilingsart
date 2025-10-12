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
  const [pageCover, setPageCover] = useState<string>('/uploads/home-cover-1760127314788.png'); // Fallback image

  useEffect(() => {
    fetchPageCover();
  }, []);

  const fetchPageCover = async () => {
    try {
      const response = await fetch('/api/page-covers/public?pageType=aboutus');
      const data = await response.json();
      
      // Set page cover from MongoDB or use fallback
      if (data.aboutus?.hero) {
        setPageCover(data.aboutus.hero);
      }
    } catch (error) {
      console.error('Error fetching page cover:', error);
      // Keep fallback image if API fails
    }
  };

  const aboutHeading = language === 'ar' ? 'سيلينجز آرت' : 'Ceilings Art';
  const aboutTitle = language === 'ar' ? 'من نحن' : 'About Us';
  const sectionHeading = language === 'ar' ? 'من نحن' : 'About Us';
  const p1 = language === 'ar'
    ? 'نحن فريق سيلينجز آرت الاحترافي، مختصّون في تقديم حلول الأسقف الفرنسية والعزل الصوتي على أعلى مستوى، مع خبرة تتجاوز عشر سنوات في المملكة العربية السعودية. نلتزم بالدقة والإتقان في كل مشروع، ونسعى دائماً لتقديم لمسات فنية راقية تحوّل أي مساحة إلى تحفة معمارية نتشرف بخدمتكم وتلبية جميع احتياجاتكم في عالم الأسقف المعلقة والحلول الصوتية.'
    : 'We are the professional team of Ceilings Art, specializing in French stretch ceilings and acoustic solutions with over a decade of experience in Saudi Arabia. We pride ourselves on precision and excellence in every project, delivering elegant, artistic touches that transform any space into an architectural masterpiece. We look forward to serving you and meeting all your needs in the world of stretch ceilings and acoustic solutions.';
  const p2 = language === 'ar'
    ? 'كل ما تحتاج معرفته عن الأسقف الفرنسية المشدودة والعزل الصوتي'
    : 'Everything You Need to Know About Stretch Ceilings and Acoustic Solutions';

  const values = language === 'ar'
    ? [
        { 
          banner: '/1.jpg', 
          title: 'التميّز', 
          desc: 'نسعى للكمال في كل مشروع، مع أعلى معايير الجودة والدقة.' 
        },
        { 
          banner: '/3.jpg', 
          title: 'الابتكار', 
          desc: 'نستكشف باستمرار تقنيات ومواد جديدة لدفع حدود التصميم.' 
        },
        { 
          banner: '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.47_31a375ed.jpg', 
          title: 'الحِرَفية', 
          desc: 'خبرتنا تصنع أعمالًا متقنة تدوم طويلاً وتُلهم المساحات.' 
        }
      ]
    : [
        { 
          banner: '/1.jpg', 
          title: 'Excellence', 
          desc: 'We pursue perfection in every project with the highest quality standards.' 
        },
        { 
          banner: '/3.jpg', 
          title: 'Innovation', 
          desc: 'We continuously explore new techniques and materials to push boundaries.' 
        },
        { 
          banner: '/acustic gallery/WhatsApp Image 2025-10-12 at 20.15.47_31a375ed.jpg', 
          title: 'Craftsmanship', 
          desc: 'Our expertise delivers enduring work that elevates every space.' 
        }
      ];

  // Extended content about French stretch ceilings
  const extendedContent = language === 'ar'
    ? {
        title: 'كل ما تحتاج معرفته عن الأسقف الفرنسية المشدودة والعزل الصوتي',
        paragraphs: [
          'الأسقف الفرنسية المشدودة تُعد من أحدث وأرقى حلول التشطيب الداخلي التي تجمع بين الجمال، المرونة، والدقة في التنفيذ. يتم تصنيعها من غشاء PVC أو قماش خاص يُشدّ على هيكل من الألمنيوم، مما يمنح السقف سطحًا أملسًا وأنيقًا يمكن تشكيله بأي لون أو إضاءة أو نمط تصميمي يناسب ذوقك ومساحتك.',
          'تتميز هذه الأسقف بسهولة التركيب وسرعته، فهي لا تحتاج إلى أعمال دهان أو جبس تقليدية، كما يمكن فكّها وتركيبها من جديد دون أي ضرر. وتتيح أنظمة Ceilings Art دمج الإضاءة الحديثة — مثل خطوط الـLED المخفية أو الإضاءة الخلفية الشفافة — لتصميم سقفٍ ينبض بالحياة ويمنح المكان عمقًا بصريًا مميزًا.',
          'أما من ناحية الأداء، فإن الأسقف الفرنسية المشدودة تتميز بمقاومتها للرطوبة، وعدم تأثرها بالغبار أو الحرارة، مما يجعلها مثالية للاستخدام في المنازل، المكاتب، الصالات، والفنادق، وحتى المشاريع الكبرى.',
          'وفي مجال العزل الصوتي، تقدّم Ceilings Art حلولًا احترافية باستخدام أغشية مايكرو-مثقبة (Micro-Perforated Membranes) وأنظمة امتصاص صوتي متطورة تقلل من الضجيج وتُحسّن جودة الصوت في المساحات الداخلية — سواء كانت قاعات اجتماعات، مطاعم، أو مسارح.',
          'نحن في Ceilings Art نوفّر لعملائنا أنظمة متكاملة من الأسقف المشدودة والعزل الصوتي مع ضمان أعلى درجات الجودة، والإتقان في التنفيذ، والتصميم بما يتناسب مع متطلبات المشاريع السكنية والتجارية على حدّ سواء.'
        ],
        cta: 'اطلب استشارتك المجانية الآن!',
        contactButton: 'اضغط للتواصل'
      }
    : {
        title: 'Everything You Need to Know About Stretch Ceilings and Acoustic Solutions',
        paragraphs: [
          'Stretch ceilings represent one of the most modern and elegant interior finishing solutions, combining aesthetics, flexibility, and precision. They are made from a special PVC or fabric membrane stretched over an aluminum frame, creating a smooth, flawless surface that can be customized in any color, shape, or lighting design to perfectly match your space.',
          'Installation is clean and fast — no need for painting or traditional gypsum work — and the ceiling can be easily removed and reinstalled without damage. With Ceilings Art systems, you can integrate modern lighting features such as hidden LED lines or backlit translucent designs, bringing life and dimension to your ceilings.',
          'From a performance perspective, stretch ceilings are highly resistant to humidity, dust, and heat, making them ideal for homes, offices, halls, hotels, and large commercial projects alike.',
          'When it comes to acoustic performance, Ceilings Art provides professional solutions using advanced micro-perforated membranes and sound-absorbing systems that reduce noise and improve sound quality in interior spaces — perfect for meeting rooms, restaurants, cinemas, and theaters.',
          'At Ceilings Art, we offer complete, high-quality systems for stretch ceilings and acoustic insulation — combining craftsmanship, precision, and creativity to meet the needs of both residential and commercial projects across Saudi Arabia.'
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
            src={pageCover}
            alt="About us cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/uploads/home-cover-1760127314788.png';
            }}
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
                    // Navigate directly to contact page
                    try {
                      const event = new CustomEvent('navigate', { detail: { page: 'CONTACT US' } });
                      window.dispatchEvent(event);
                    } catch (error) {
                      console.error('Navigation error:', error);
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

      {/* Image Gallery Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <MDiv 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {isRTL ? 'معرض الصور' : 'Image Gallery'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isRTL 
                  ? 'استكشف مجموعة متنوعة من مشاريعنا في الأسقف الفرنسية والعزل الصوتي'
                  : 'Explore our diverse range of projects in stretch ceilings and acoustic solutions'
                }
              </p>
            </MDiv>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                '/art-images/stretch-ceiling/glossy/High-Gloss-Ceiling-Installation-In-The-Bathroom-1024x690.jpg.webp',
                '/art-images/stretch-ceiling/glossy/High-Gloss-Ceiling-Installation-On-the-Kitchen-1024x894.jpg.webp',
                '/art-images/stretch-ceiling/glossy/luxury-condo-family-room-with-multilevel-red-stretch-ceiling-deutchland.jpg.webp',
                '/art-images/stretch-ceiling/glossy/multilevel-waved-reflective-white-glossy-stretch-ceiling-in-monopoly-1024x918.jpg.webp',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_CeilingPanel_office_15-1024x683.jpg',
                '/art-images/acoustic-panels/wood-wool/AS_WoodWool_Designs_Custom_15_1000px.jpg',
                '/art-images/acoustic-panels/fabric-wrapped-acoustic/1A-studio-panel-1024x683-1.jpg',
                '/art-images/acoustic-panels/polyester-acoustic/Customed-Acoustic-Panel-Polyester-Fiber-Wall-Panel.webp'
              ].map((imageSrc, index) => (
                <MDiv 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-700 group cursor-pointer"
                  onClick={() => {
                    window.open(imageSrc, '_blank');
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`Project ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-acoustic.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </MDiv>
              ))}
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