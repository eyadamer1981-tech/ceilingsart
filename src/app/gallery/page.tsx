'use client';

import { OurWorkPage } from '../../components/OurWorkPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export default function Gallery() {
  return (
    <PageLayout>
      <OurWorkPage onStartProject={() => window.location.href = '/contact'} />
      <Footer />
    </PageLayout>
  );
}
