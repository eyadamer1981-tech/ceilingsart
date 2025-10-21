'use client';

import { ServicesPage } from '../../../components/ServicesPage';
import { Footer } from '../../../components/Footer';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function StretchGlossy() {
  const { t } = useLanguage();
  
  return (
    <>
      <ServicesPage
        category="stretch"
        pageTitle={t('stretchCeilingPageTitle')}
        pageSubtitle={t('stretchCeilingPageSubtitle')}
        initialSelectedCeilingType="glossy"
      />
      <Footer />
    </>
  );
}

