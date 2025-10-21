'use client';

import { ServicesPage } from '../../components/ServicesPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export default function Services() {
  return (
    <PageLayout>
      <ServicesPage />
      <Footer />
    </PageLayout>
  );
}
