import { Metadata, ResolvingMetadata } from 'next';
import connectDB from '../../../lib/mongodb';
import {
  Blog as BlogModel,
  SEOConfig,
  InternalLinkMapping
} from '../../../lib/models';
import { BlogDetailPage } from '../../../components/BlogDetailPage';
import PageLayout from '../../../components/PageLayout';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { generateInternalLinks } from '../../../lib/internal-linking';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/* =======================
   GET BLOG
======================= */
async function getBlog(slug: string) {
  try {
    await connectDB();

    let blog: any = await BlogModel.findOne({ slug }).lean();

    if (!blog) {
      try {
        const decoded = decodeURIComponent(slug);
        blog = await BlogModel.findOne({ slug: decoded }).lean();
        if (!blog) {
          blog = await BlogModel.findOne({
            slug: decodeURIComponent(decoded)
          }).lean();
        }
      } catch {}
    }

    if (!blog && /^[0-9a-fA-F]{24}$/.test(slug)) {
      blog = await BlogModel.findById(slug).lean();
    }

    if (!blog) return null;

    const config: any = await SEOConfig.findOne({
      configKey: 'global'
    }).lean();

    const useAutoLinks =
      config?.globalAutoInternalLinks &&
      blog.autoInternalLinks !== false;

    if (useAutoLinks || (blog.manualLinks?.length ?? 0) > 0) {
      const autoLinks = useAutoLinks
        ? await InternalLinkMapping.find({ isActive: true }).lean()
        : [];

      const linkResult = generateInternalLinks({
        content: blog.content,
        autoLinks,
        manualLinks: blog.manualLinks || [],
        useAutoLinks,
        maxLinksPerPost: config?.maxInternalLinksPerPost || 5
      });

      blog.processedContent = linkResult.processedContent;
      blog.internalLinksApplied = linkResult.linksApplied;
    }

    // 🔴 مهم جدا: ضمان عرض المحتوى دايما بروابط
    if (!blog.processedContent) {
      blog.processedContent = blog.content;
    }

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* =======================
   METADATA (SEO)
======================= */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog: any = await getBlog(params.slug);
  if (!blog)
    return { title: 'المقال غير موجود | Ceilings Art' };

  const config: any = await SEOConfig.findOne({
    configKey: 'global'
  }).lean();

  let title = blog.metaTitle || blog.title;
  let description =
    blog.metaDescription || blog.excerpt || blog.title;
  let keywords = blog.metaKeywords || [];

  if (blog.manualSEO) {
    title = blog.manualSEO.title || title;
    description =
      blog.manualSEO.description || description;
    keywords = blog.manualSEO.keywords?.length
      ? blog.manualSEO.keywords
      : keywords;
  }

  if (!title || !description) {
    const generated = generateSEOMetadata(
      blog.title,
      blog.content,
      blog.excerpt
    );
    title ||= generated.metaTitle;
    description ||= generated.metaDescription;
    keywords ||= generated.metaKeywords;
  }

  const canonical = `https://www.ceilingsart.sa/blog/${
    blog.slug || blog._id
  }`;

  const ogImage =
    blog.manualSEO?.ogImage ||
    blog.image ||
    config?.defaultOGImage ||
    'https://www.ceilingsart.sa/newlogo.png';

  return {
    title: `${title} | ${config?.siteName || 'Ceilings Art'}`,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config?.siteName || 'Ceilings Art',
      images: [ogImage],
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(
        blog.updatedAt || blog.createdAt
      ).toISOString(),
      locale: 'ar_SA'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

/* =======================
   PAGE
======================= */
export default async function BlogPostPage({
  params
}: Props) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ceilingsart.sa/blog/${
        blog.slug || blog._id
      }`
    },
    headline: blog.title,
    description:
      blog.excerpt || blog.metaDescription || blog.title,
    image: [
      blog.image?.startsWith('http')
        ? blog.image
        : 'https://www.ceilingsart.sa/newlogo.png'
    ],
    author: {
      '@type': 'Organization',
      name: 'Ceilings Art'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ceilings Art',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ceilingsart.sa/newlogo.png'
      }
    },
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(
      blog.updatedAt || blog.createdAt
    ).toISOString(),
    inLanguage: 'ar-SA'
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />

      {/* صفحة المقال */}
      <BlogDetailPage
        initialBlog={{
          ...blog,
          content: blog.processedContent // 👈 مهم
        }}
        slug={params.slug}
      />
    </PageLayout>
  );
}
