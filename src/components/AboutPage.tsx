import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { language, t, isRTL } = useLanguage();

  const aboutHeading = language === 'ar' ? 'سيلينجز آرت' : 'Ceilings Art';
  const aboutTitle = language === 'ar' ? 'من نحن' : 'About Us';
  const sectionHeading = language === 'ar' ? 'تصميم أسقف متميّز مع حلول صوتية متقدمة' : 'Premium Stretch Ceilings & Advanced Acoustic Solutions';
  const p1 = language === 'ar'
    ? 'بصمات الأندلس، بخبرة تتجاوز 10 سنوات في الرياض، متخصّصون في الأسقف الفرنسية المشدودة والحلول الصوتية المتقدمة. نصنع ونركّب أنظمة أسقف تجمع بين الجمال والوظيفة وفق أعلى معايير الجودة.'
    : 'With over 10 years of expertise in Riyadh, we specialize in French stretch ceilings and advanced acoustic solutions. We craft and install ceiling systems that blend elegance with superior functionality.';
  const p2 = language === 'ar'
    ? 'نلتزم بالجودة والتنفيذ الدقيق، ونركز على الاستدامة وتنوع التصاميم – لامعة، مطفية، ناقلة للضوء، مطبوعة، وثلاثية الأبعاد – لتلبية الاحتياجات السكنية والتجارية على حد سواء.'
    : 'We are committed to quality, precise execution, and sustainability. From glossy and matte to translucent, printed, and 3D designs, our solutions suit both residential and commercial spaces.';

  const values = language === 'ar'
    ? [
        { k: 'E', title: 'التميّز', desc: 'نسعى للكمال في كل مشروع، مع أعلى معايير الجودة والدقة.' },
        { k: 'I', title: 'الابتكار', desc: 'نستكشف باستمرار تقنيات ومواد جديدة لدفع حدود التصميم.' },
        { k: 'C', title: 'الحِرَفية', desc: 'خبرتنا تصنع أعمالًا متقنة تدوم طويلاً وتُلهم المساحات.' }
      ]
    : [
        { k: 'E', title: 'Excellence', desc: 'We pursue perfection in every project with the highest quality standards.' },
        { k: 'I', title: 'Innovation', desc: 'We continuously explore new techniques and materials to push boundaries.' },
        { k: 'C', title: 'Craftsmanship', desc: 'Our expertise delivers enduring work that elevates every space.' }
      ];
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto transform rotate-180"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,0L1296,0C1248,0,1152,0,1056,0C960,0,864,0,768,0C672,0,576,0,480,0C384,0,288,0,192,0C96,0,48,0,24,0L0,0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            {t('aboutTitle')}
          </h1>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,120L1296,120C1248,120,1152,120,1056,120C960,120,864,120,768,120C672,120,576,120,480,120C384,120,288,120,192,120C96,120,48,120,24,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${isRTL ? 'text-right' : ''}`}>
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 tracking-wide">
                  {sectionHeading}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {p1}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {p2}
                </p>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663082353116-73bdf70050be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZWlsaW5nJTIwZGVzaWduJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzU4NTg1OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Values Section */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : ''}`}>
              {values.map(v => (
                <div key={v.title} className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{v.k}</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}