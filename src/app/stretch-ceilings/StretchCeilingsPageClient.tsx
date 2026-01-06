'use client';

import { ServicesPage } from '../../components/ServicesPage';
import { Footer } from '../../components/Footer';
import { useLanguage } from '../../contexts/LanguageContext';
import PageLayout from '../../components/PageLayout';

export function StretchCeilingsPageClient() {
    const { t } = useLanguage();

    return (
        <PageLayout>
            <ServicesPage
                category="stretch"
                pageTitle={t('stretchCeilingPageTitle')}
                pageSubtitle={t('stretchCeilingPageSubtitle')}
            />
            <Footer />
        </PageLayout>
    );
}
