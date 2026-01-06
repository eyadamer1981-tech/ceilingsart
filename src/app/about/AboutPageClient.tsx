'use client';

import { AboutPage } from '../../components/AboutPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export function AboutPageClient() {
    return (
        <PageLayout>
            <AboutPage onContactClick={() => window.location.href = '/contact'} />
            <Footer />
        </PageLayout>
    );
}
