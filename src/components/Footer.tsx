import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t, language, isRTL } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="text-2xl font-bold tracking-wider">CA</div>
              <img 
                src="/footer-text.png" 
                alt="Ceilings Art" 
                className="h-6 w-auto opacity-80"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('quickLinks')}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="hover:text-orange-400 cursor-pointer transition-colors">{t('home')}</p>
              <p className="hover:text-orange-400 cursor-pointer transition-colors">{t('about')}</p>
              <p className="hover:text-orange-400 cursor-pointer transition-colors">{t('services')}</p>
              <p className="hover:text-orange-400 cursor-pointer transition-colors">{t('gallery')}</p>
              <p className="hover:text-orange-400 cursor-pointer transition-colors">{t('contact')}</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('services')}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{t('luxuryCeilingDesign')}</p>
              <p>{t('decorativePatterns')}</p>
              <p>{t('modernArchitecture')}</p>
              <p>{t('traditionalCoffered')}</p>
              <p>{t('vaultedCeilings')}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('contactInfo')}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p dir="ltr">+966 575474699</p>
              <p dir="ltr">info@ceilingsart.com</p>
              <p>{language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
              <p>{language === 'ar' ? 'السبت - الخميس: 9 صباحاً - 6 مساءً' : 'Sat - Thu: 9AM - 6PM'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p className="font-medium text-white mb-1">{t('companyName')} . {t('allRightsReserved')}</p>
            <p>{t('designedBy')} © 2025 RUAAD ALRQMEA Team</p>
          </div>
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            <p className="text-sm text-gray-400">{t('followUs')}:</p>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* X (Twitter) */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 text-gray-400 hover:text-black transition-colors cursor-pointer"
                aria-label="X (Twitter)"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}