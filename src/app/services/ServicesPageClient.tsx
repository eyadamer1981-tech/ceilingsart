'use client';

import { ServicesPage } from '../../components/ServicesPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export function ServicesPageClient() {
    return (
        <PageLayout>
            <ServicesPage />
            <Footer />
        </PageLayout>
    );
}
