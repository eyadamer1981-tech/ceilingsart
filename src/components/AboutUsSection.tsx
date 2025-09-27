import { useLanguage } from '../contexts/LanguageContext';

export function AboutUsSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative">
              <img
                src="/image.png"
                alt="About Us"
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
