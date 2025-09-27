import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
        ${isRTL 
          ? 'border-gray-600 hover:border-orange-400 text-gray-300 hover:text-orange-400' 
          : 'border-gray-600 hover:border-orange-400 text-gray-300 hover:text-orange-400'
        }
        hover:bg-gray-800/50
      `}
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
      <span className="text-xs opacity-75">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;

