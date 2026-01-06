'use client';

import { ContactPage } from '../../components/ContactPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export function ContactPageClient() {
    return (
        <PageLayout>
            <ContactPage />
            <Footer />
        </PageLayout>
    );
}
