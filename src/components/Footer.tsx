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
              <div className="text-sm tracking-widest opacity-80">CEILINGS ART</div>
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
              <p>Luxury Ceiling Design</p>
              <p>Decorative Patterns</p>
              <p>Modern Architecture</p>
              <p>Traditional Coffered</p>
              <p>Vaulted Ceilings</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('contactInfo')}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>+966 575474699</p>
              <p>info@ceilingsatr.com</p>
              <p>{language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
              <p>{language === 'ar' ? 'السبت - الخميس: 9 صباحاً - 6 مساءً' : 'Sat - Thu: 9AM - 6PM'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 RUAAD ALRQMEA Team . {t('allRightsReserved')}
          </p>
          <div className="flex items-center space-x-6">
            <p className="text-sm text-gray-400">{t('followUs')}:</p>
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-500 rounded cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-500 rounded cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-500 rounded cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}