"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Language, getTranslation, Translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Safe setLanguage function
  const safeSetLanguage = useCallback((lang: Language) => {
    if (lang === 'en' || lang === 'ar') {
      setLanguage(lang);
    } else {
      console.warn('Invalid language provided:', lang);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    // Load saved language from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          setLanguage(savedLanguage);
        }
        setIsInitialized(true);
      } catch (error) {
        console.warn('Error loading language from localStorage:', error);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage (client-side only)
    if (typeof window !== 'undefined' && isClient && isInitialized) {
      try {
        localStorage.setItem('language', language);
        
        // Update document direction and lang attribute
        if (document && document.documentElement) {
          document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = language;
        }
      } catch (error) {
        console.warn('Error saving language to localStorage:', error);
      }
    }
  }, [language, isClient, isInitialized]);

  const t = useCallback((key: keyof Translations): string => {
    try {
      if (!isInitialized) {
        return key; // Return key as fallback during initialization
      }
      return getTranslation(language, key);
    } catch (error) {
      console.warn('Translation error:', error, 'Key:', key);
      return key;
    }
  }, [language, isInitialized]);

  const isRTL = useMemo(() => language === 'ar', [language]);

  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage: safeSetLanguage,
    t,
    isRTL,
  }), [language, safeSetLanguage, t, isRTL]);

  // Don't render until initialized to prevent hydration issues
  if (!isInitialized) {
    return (
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
