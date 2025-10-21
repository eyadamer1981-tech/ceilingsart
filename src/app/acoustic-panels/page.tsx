'use client';

import { AcousticPanelsPage } from '../../components/AcousticPanelsPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export default function AcousticPanels() {
  return (
    <PageLayout>
      <AcousticPanelsPage />
      <Footer />
    </PageLayout>
  );
}
