'use client';

import { FAQsPage } from '../../components/FAQsPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export default function FAQs() {
  return (
    <PageLayout>
      <FAQsPage onContactClick={() => window.location.href = '/contact'} />
      <Footer />
    </PageLayout>
  );
}
