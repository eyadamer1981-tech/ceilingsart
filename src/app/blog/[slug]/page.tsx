// app/blog/[slug]/page.tsx

import { Metadata } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog as BlogModel, SEOConfig, InternalLinkMapping } from '../../../lib/models';
import PageLayout from '../../../components/PageLayout';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { generateInternalLinks } from '../../../lib/internal-linking';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
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
      } catch {}
    }

    if (!blog && /^[0-9a-fA-F]{24}$/.test(slug)) {
      blog = await BlogModel.findById(slug).lean();
    }

    if (!blog) return null;

    const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

    const useAutoLinks =
      config?.globalAutoInternalLinks && blog.autoInternalLinks !== false;

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
    } else {
      blog.processedContent = blog.content;
    }

    return JSON.parse(JSON.stringify(blog));
  } catch (e) {
    console.error(e);
    return null;
  }
}

/* =======================
   METADATA (SEO)
======================= */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog: any = await getBlog(params.slug);
  if (!blog) return { title: 'المقال غير موجود | Ceilings Art' };

  const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

  let title = blog.metaTitle || blog.title;
  let description = blog.metaDescription || blog.excerpt || blog.title;

  if (!title || !description) {
    const generated = generateSEOMetadata(blog.title, blog.content, blog.excerpt);
    title ||= generated.metaTitle;
    description ||= generated.metaDescription;
  }

  // منع القطع في نتائج جوجل
  title = title.length > 60 ? title.slice(0, 60) : title;
  description = description.length > 160 ? description.slice(0, 160) : description;

  const canonical = `https://www.ceilingsart.sa/blog/${blog.slug}`;
  const ogImage =
    blog.image ||
    blog.manualSEO?.ogImage ||
    config?.defaultOGImage ||
    'https://www.ceilingsart.sa/newlogo.png';

  return {
    title: `${title} | ${config?.siteName || 'Ceilings Art'}`,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config?.siteName || 'Ceilings Art',
      type: 'article',
      locale: 'ar_SA',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt || blog.createdAt).toISOString()
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
export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const imageUrl = blog.image || 'https://www.ceilingsart.sa/newlogo.png';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ceilingsart.sa/blog/${blog.slug}`
    },
    "headline": blog.title,
    "description": blog.excerpt || blog.metaDescription || blog.title,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Organization",
      "name": "Ceilings Art"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ceilings Art",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ceilingsart.sa/newlogo.png"
      }
    },
    "datePublished": new Date(blog.createdAt).toISOString(),
    "dateModified": new Date(blog.updatedAt || blog.createdAt).toISOString(),
    "wordCount": blog.content?.split(' ').length || 0,
    "inLanguage": "ar-SA"
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <h1>{blog.title}</h1>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={blog.title}
            width="1200"
            height="630"
            loading="eager"
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: blog.processedContent }} />
      </article>
    </PageLayout>
  );
}
