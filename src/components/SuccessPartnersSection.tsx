import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function SuccessPartnersSection() {
  const { t, isRTL } = useLanguage();
  const [columns, setColumns] = useState(2);

  // Detect responsive grid columns to determine row grouping for alternating animations
  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) {
        setColumns(5);
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        setColumns(4);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setColumns(3);
      } else {
        setColumns(2);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Partner images from the شركاء النجاح folder
  const partnerImages = [
    '/شركاء النجاح/IMG-20251004-WA0050.jpg',
    '/شركاء النجاح/IMG-20251004-WA0051.jpg',
    '/شركاء النجاح/IMG-20251004-WA0052.jpg',
    '/شركاء النجاح/IMG-20251004-WA0053.jpg',
    '/شركاء النجاح/IMG-20251004-WA0054.jpg',
    '/شركاء النجاح/IMG-20251004-WA0055.jpg',
    '/شركاء النجاح/IMG-20251004-WA0056.jpg',
    '/شركاء النجاح/IMG-20251004-WA0057.jpg',
    '/شركاء النجاح/IMG-20251004-WA0058.jpg',
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
              {t('successPartnersTitle')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-600 mb-6">
              {t('successPartnersSubtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              {t('successPartnersDescription')}
            </p>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {partnerImages.map((image, index) => {
            const rowIndex = Math.floor(index / Math.max(1, columns));
            const dir = rowIndex % 2 === 0 ? -40 : 40; // first row from left, second from right
            const delayInRow = (index % Math.max(1, columns)) * 0.06;
            return (
              <motion.div
                key={index}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, x: dir }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: delayInRow }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="aspect-square">
                  <img
                    src={image}
                    alt={`Success Partner ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-gray-500 text-sm">
            {isRTL 
              ? 'نحن فخورون بشراكاتنا مع هذه المؤسسات الرائدة في مجالها'
              : 'We are proud of our partnerships with these leading institutions in their fields'
            }
          </p>
        </div>
      </div>
    </section>
  );
}
