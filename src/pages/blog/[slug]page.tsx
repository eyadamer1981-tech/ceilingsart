// src/app/blog/[slug]/page.tsx
import connectDB from '../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../lib/models';
import { generateInternalLinks } from '../../../lib/internal-linking';
import Head from 'next/head';

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  await connectDB();

  // جلب المقال
  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) {
    return <p>Blog not found</p>;
  }

  // جلب الإعدادات العامة للـ SEO/Internal links
  let config = await SEOConfig.findOne({ configKey: 'global' });
  if (!config) {
    config = new SEOConfig({ configKey: 'global' });
    await config.save();
  }

  const manualLinks = blog.manualLinks || [];
  const useAutoLinks = config.globalAutoInternalLinks && blog.autoInternalLinks !== false;

  let processedContent = blog.content;
  let internalLinksApplied: string[] = [];

  if (useAutoLinks || manualLinks.length > 0) {
    const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }) : [];

    const linkResult = generateInternalLinks({
      content: blog.content,
      autoLinks: autoLinkMappings,
      manualLinks: manualLinks,
      useAutoLinks: useAutoLinks,
      maxLinksPerPost: config.maxInternalLinksPerPost || 5,
    });

    processedContent = linkResult.processedContent;
    internalLinksApplied = linkResult.linksApplied;
  }

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || ''} />
        <meta name="keywords" content={blog.metaKeywords?.join(',') || ''} />
      </Head>
      <main style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{blog.title}</h1>
        <article
          dangerouslySetInnerHTML={{ __html: processedContent }}
          style={{ lineHeight: '1.8', fontSize: '1rem' }}
        />
      </main>
    </>
  );
}

// Next.js App Router: توليد static params لكل المقالات
export async function generateStaticParams() {
  await connectDB();
  const blogs = await Blog.find();
  return blogs.map(blog => ({ slug: blog.slug }));
}
