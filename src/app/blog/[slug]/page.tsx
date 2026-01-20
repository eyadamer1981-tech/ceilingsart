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
}

/* =======================
   GET BLOG
======================= */
async function getBlog(slug: string) {
  await connectDB();

  let blog: any = await BlogModel.findOne({ slug }).lean();

  if (!blog) {
    try {
      const decoded = decodeURIComponent(slug);
      blog = await BlogModel.findOne({ slug: decoded }).lean();
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

  blog.processedContent ||= blog.content;

  return JSON.parse(JSON.stringify(blog));
}

/* =======================
   HELPERS
======================= */
function getFullImageUrl(img: string | undefined) {
  if (!img) return undefined;
  if (img.startsWith('http')) return img;
  if (img.startsWith('//')) return `https:${img}`;
  return `https://www.ceilingsart.sa${img.startsWith('/') ? '' : '/'}${img}`;
}

/* =======================
   METADATA
======================= */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const blog: any = await getBlog(params.slug);
  if (!blog) return { title: 'المقال غير موجود' };

  let title = blog.metaTitle || blog.title;
  let description =
    blog.metaDescription || blog.excerpt || blog.title;

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

  // هنا بقى الصورة كاملة
  const image = getFullImageUrl(blog.image);

  return {
    title,
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

    openGraph: image
      ? {
          title,
          description,
          url: canonical,
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
        }
      : undefined,

    twitter: image
      ? {
          card: 'summary_large_image',
          title,
          description,
          images: [image]
        }
      : undefined
  };
}

/* =======================
   PAGE
======================= */
export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const image = getFullImageUrl(blog.image);

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
      blog.excerpt || blog.metaDescription || blog.title,
    image: image ? [image] : undefined,
    author: {
      '@type': 'Organization',
      name: 'Ceilings Art'
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
            marginBottom: '24px'
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
