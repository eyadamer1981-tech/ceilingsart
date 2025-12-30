import { Metadata, ResolvingMetadata } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog as BlogModel, SEOConfig, InternalLinkMapping } from '../../../lib/models';
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

async function getBlog(slug: string) {
  try {
    await connectDB();

    // 1. Try exact match
    let blog: any = await BlogModel.findOne({ slug }).lean();

    // 2. Try decode matches
    if (!blog) {
      try {
        const decodedSlug = decodeURIComponent(slug);
        blog = await BlogModel.findOne({ slug: decodedSlug }).lean();
        if (!blog) {
          const doubleDecoded = decodeURIComponent(decodedSlug);
          blog = await BlogModel.findOne({ slug: doubleDecoded }).lean();
        }
      } catch (e) { }
    }

    // 3. Fallback to ID
    if (!blog && /^[0-9a-fA-F]{24}$/.test(slug)) {
      blog = await BlogModel.findById(slug).lean();
    }

    if (!blog) return null;

    // Apply SEO and Internal Links logic like in the API
    const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

    const configToUse = config || {
      configKey: 'global',
      globalAutoInternalLinks: true,
      maxInternalLinksPerPost: 5
    };

    const useAutoLinks = configToUse.globalAutoInternalLinks && blog.autoInternalLinks !== false;
    const manualLinks = blog.manualLinks || [];

    if (useAutoLinks || manualLinks.length > 0) {
      const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }).lean() : [];
      const linkResult = generateInternalLinks({
        content: blog.content,
        autoLinks: autoLinkMappings,
        manualLinks: manualLinks,
        useAutoLinks: useAutoLinks,
        maxLinksPerPost: configToUse.maxInternalLinksPerPost || 5,
      });

      blog.processedContent = linkResult.processedContent;
      blog.internalLinksApplied = linkResult.linksApplied;
    }

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error in getBlog Server Component:", error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog: any = await getBlog(params.slug);

  if (!blog) {
    return {
      title: 'المقال غير موجود | سلينجز ارت',
    };
  }

  // Get global SEO defaults
  const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

  // Use the stored metadata or generate it dynamically
  let title = blog.metaTitle || blog.title;
  let description = blog.metaDescription || blog.excerpt;
  let keywords = blog.metaKeywords;

  // Use manual SEO if provided
  if (blog.manualSEO) {
    if (blog.manualSEO.title) title = blog.manualSEO.title;
    if (blog.manualSEO.description) description = blog.manualSEO.description;
    if (blog.manualSEO.keywords && blog.manualSEO.keywords.length > 0) keywords = blog.manualSEO.keywords;
  }

  // Auto-generate if missing
  if (!title || !description) {
    const generated = generateSEOMetadata(blog.title, blog.content, blog.excerpt);
    if (!title) title = generated.metaTitle;
    if (!description) description = generated.metaDescription;
    if (!keywords || keywords.length === 0) keywords = generated.metaKeywords;
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = blog.manualSEO?.ogImage || blog.image || (config?.defaultOGImage) || (previousImages.length > 0 ? previousImages[0].url : '/newlogo.png');

  return {
    title: `${title} | ${config?.siteName || 'سلينجز ارت'}`,
    description: description,
    keywords: keywords,
    authors: [{ name: blog.author || 'Ceilings Art' }],
    alternates: {
      canonical: blog.manualSEO?.canonicalUrl || `https://www.ceilingsart.sa/blog/${blog.slug || blog._id}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.ceilingsart.sa/blog/${blog.slug || blog._id}`,
      siteName: config?.siteName || 'Ceilings Art',
      images: [ogImage],
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      locale: 'ar_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
      site: config?.twitterHandle || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  // Prepare JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.metaDescription,
    "image": blog.image,
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "author": {
      "@type": "Person",
      "name": blog.author || 'Ceilings Art'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ceilings Art",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ceilingsart.sa/newlogo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ceilingsart.sa/blog/${blog.slug || blog._id}`
    }
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPage initialBlog={blog} slug={params.slug} />
    </PageLayout>
  );
}
