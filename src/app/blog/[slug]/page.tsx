import { Metadata, ResolvingMetadata } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog as BlogModel, SEOConfig, InternalLinkMapping } from '../../../lib/models';
import { BlogDetailPage } from '../../../components/BlogDetailPage';
import PageLayout from '../../../components/PageLayout';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { generateInternalLinks } from '../../../lib/internal-linking';
import Image from 'next/image';

export const dynamic = 'auto'; // الأفضل للـ SEO

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
          blog = await BlogModel.findOne({ slug: decodeURIComponent(decoded) }).lean();
        }
      } catch {}
    }

    if (!blog && /^[0-9a-fA-F]{24}$/.test(slug)) {
      blog = await BlogModel.findById(slug).lean();
    }

    if (!blog) return null;

    const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

    const useAutoLinks = config?.globalAutoInternalLinks && blog.autoInternalLinks !== false;

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
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const blog: any = await getBlog(params.slug);
  if (!blog) return { title: 'المقال غير موجود | Ceilings Art' };

  const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

  let title = blog.metaTitle || blog.title || 'مقال Ceilings Art';
  let description = blog.metaDescription || blog.excerpt || blog.title || 'مقال من Ceilings Art';
  let keywords = blog.metaKeywords || [];

  if (blog.manualSEO) {
    title = blog.manualSEO.title || title;
    description = blog.manualSEO.description || description;
    keywords = blog.manualSEO.keywords?.length ? blog.manualSEO.keywords : keywords;
  }

  if (!title || !description) {
    const generated = generateSEOMetadata(blog.title, blog.content, blog.excerpt);
    title ||= generated.metaTitle;
    description ||= generated.metaDescription;
    keywords ||= generated.metaKeywords;
  }

  const canonical = `https://www.ceilingsart.sa/blog/${encodeURIComponent(blog.slug || blog._id)}`;

  // الصور لجميع المنصات
  const images: string[] = [];
  if (blog.image?.startsWith('http')) images.push(blog.image);
  if (Array.isArray(blog.gallery)) {
    blog.gallery.forEach((img: string) => { if (img?.startsWith('http')) images.push(img); });
  }
  if (images.length === 0) images.push(config?.defaultOGImage || 'https://www.ceilingsart.sa/newlogo.png');

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
      images: images.map(img => ({ url: img, width: 1200, height: 630, alt: title })),
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt || blog.createdAt).toISOString(),
      locale: 'ar_SA'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [images[0]]
    }
  };
}

/* =======================
   PAGE COMPONENT
======================= */
export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog(params.slug);
  if (!blog) notFound();

  const images: string[] = [];
  if (blog.image?.startsWith('http')) images.push(blog.image);
  if (Array.isArray(blog.gallery)) {
    blog.gallery.forEach(img => { if (img?.startsWith('http')) images.push(img); });
  }
  if (images.length === 0) images.push('https://www.ceilingsart.sa/newlogo.png');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.ceilingsart.sa/blog/${encodeURIComponent(blog.slug || blog._id)}` },
    headline: blog.title || 'مقال Ceilings Art',
    description: blog.excerpt || blog.metaDescription || blog.title || 'مقال من Ceilings Art',
    image: images,
    author: { '@type': 'Organization', name: 'Ceilings Art' },
    publisher: { '@type': 'Organization', name: 'Ceilings Art', logo: { '@type': 'ImageObject', url: 'https://www.ceilingsart.sa/newlogo.png' } },
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
    inLanguage: 'ar-SA'
  };

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* معرض الصور */}
      {images.map((img, idx) => (
        <div key={idx} style={{ marginBottom: '16px', width: '100%', textAlign: 'center' }}>
          <Image
            src={img}
            alt={blog.title || `صورة المقال ${idx + 1}`}
            width={1200}
            height={630}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: 'center' }}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      ))}

      <BlogDetailPage initialBlog={{ ...blog, content: blog.processedContent }} slug={params.slug} />
    </PageLayout>
  );
}
