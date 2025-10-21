'use client';

import { BlogPage } from '../../components/BlogPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';
import { useRouter } from 'next/navigation';

export default function Blog() {
  const router = useRouter();

  return (
    <PageLayout>
      <BlogPage onBlogSelect={(slug) => router.push(`/blog/${slug}`)} />
      <Footer />
    </PageLayout>
  );
}
