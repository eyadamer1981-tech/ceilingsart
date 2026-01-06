'use client';

import { OurWorkPage } from '../../components/OurWorkPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export function GalleryPageClient() {
    return (
        <PageLayout>
            <OurWorkPage onStartProject={() => window.location.href = '/contact'} />
            <Footer />
        </PageLayout>
    );
}
