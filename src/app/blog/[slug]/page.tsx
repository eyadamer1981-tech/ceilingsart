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

export const dynamic = 'auto';

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
    }

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
   METADATA + SEO
======================= */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const blog: any = await getBlog(params.slug);
  if (!blog) {
    return { title: 'المقال غير موجود | Ceilings Art' };
  }

  const config: any = await SEOConfig.findOne({
    configKey: 'global'
  }).lean();

  let title = blog.metaTitle || blog.title || 'مقال Ceilings Art';
  let description =
    blog.metaDescription ||
    blog.excerpt ||
    blog.title ||
    'مقال من Ceilings Art';

  if (!title || !description) {
    const generated = generateSEOMetadata(
      blog.title,
      blog.content,
      blog.excerpt
    );
    title ||= generated.metaTitle;
    description ||= generated.metaDescription;
  }

  const canonical = `https://www.ceilingsart.sa/blog/${encodeURIComponent(
    blog.slug || blog._id
  )}`;

  const image =
    blog.image?.startsWith('http')
      ? blog.image
      : config?.defaultOGImage ||
        'https://www.ceilingsart.sa/newlogo.png';

  return {
    title: `${title} | ${config?.siteName || 'Ceilings Art'}`,
    description,
    alternates: { canonical },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large'
      }
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config?.siteName || 'Ceilings Art',
      type: 'article',
      locale: 'ar_SA',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

/* =======================
   PAGE COMPONENT
======================= */
export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const image =
    blog.image?.startsWith('http')
      ? blog.image
      : 'https://www.ceilingsart.sa/newlogo.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ceilingsart.sa/blog/${encodeURIComponent(
        blog.slug || blog._id
      )}`
    },
    headline: blog.title,
    description:
      blog.excerpt ||
      blog.metaDescription ||
      blog.title,
    image: [image],
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
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* صورة المقال الأساسية فقط */}
      {image && (
        <img
          src={image}
          alt={blog.title}
          width={1200}
          height={630}
          loading="eager"
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '24px',
            borderRadius: '8px'
          }}
        />
      )}

      <BlogDetailPage
        initialBlog={{ ...blog, content: blog.processedContent }}
        slug={params.slug}
      />
    </PageLayout>
  );
}
