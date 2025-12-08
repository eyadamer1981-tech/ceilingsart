import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from './ui/skeleton';
import { SEO, mergeSEOData, SEOProps } from './SEO';
import { NewsletterSubscription } from './NewsletterSubscription';

interface Blog {
  _id: string;
  title: string;
  content: string;
  processedContent?: string;
  excerpt: string;
  image: string;
  author: string;
  featured: boolean;
  slug: string;
  autoSEO?: boolean;
  autoInternalLinks?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  manualSEO?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
  manualLinks?: any[];
  internalLinksApplied?: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogDetailPageProps {
  slug?: string;
}

export function BlogDetailPage({ slug: propSlug }: BlogDetailPageProps) {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get slug from props or route params (App Router)
  const slug = propSlug || (params?.slug as string);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const isObjectId = (value: string | undefined) => {
    if (!value) return false;
    return /^[0-9a-fA-F]{24}$/.test(value);
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);

      let response = await fetch(`/api/blogs/slug/${slug}`);

      // Fall back to ID lookup for older posts that may not have a slug
      if (!response.ok && response.status === 404 && isObjectId(slug)) {
        response = await fetch(`/api/blogs/${slug}`);
      }

      if (!response.ok) {
        if (response.status === 404) {
          setError('Blog post not found');
        } else {
          setError('Failed to load blog post');
        }
        return;
      }

      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate full URL for Open Graph
  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return '';
  };

  const getFullImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${imageUrl}`;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="aspect-[16/9] w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            {error || 'Blog not found'}
          </h1>
          <button
            onClick={() => router.push('/blog')}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Merge auto and manual SEO data
  const autoSEOData: Partial<SEOProps> = {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || [],
    imageUrl: blog.image,
    url: getFullUrl(),
    author: blog.author,
    publishedTime: blog.createdAt,
    modifiedTime: blog.updatedAt,
  };

  const manualSEOData: Partial<SEOProps> = {
    title: blog.manualSEO?.title || '',
    description: blog.manualSEO?.description || '',
    keywords: blog.manualSEO?.keywords || [],
    imageUrl: blog.manualSEO?.ogImage || '',
    canonicalUrl: blog.manualSEO?.canonicalUrl || '',
  };

  const finalSEO = mergeSEOData(autoSEOData, manualSEOData, blog.autoSEO !== false);

  const proseStyles = {
    '--tw-prose-body': '#000',
    '--tw-prose-headings': '#000',
    '--tw-prose-lead': '#000',
    '--tw-prose-links': '#ea580c',
    '--tw-prose-bold': '#000',
    '--tw-prose-counters': '#000',
    '--tw-prose-bullets': '#000',
    '--tw-prose-hr': '#000',
    '--tw-prose-quotes': '#000',
    '--tw-prose-quote-borders': '#000',
    '--tw-prose-captions': '#000',
    '--tw-prose-code': '#000',
    '--tw-prose-th-borders': '#000',
    '--tw-prose-td-borders': '#000',
  } as CSSProperties;

  return (
    <>
      <SEO {...finalSEO} />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {blog.featured && (
              <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Featured Post
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-300">
              <span className="font-medium">{blog.author}</span>
              <span>•</span>
              <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
              {blog.updatedAt !== blog.createdAt && (
                <>
                  <span>•</span>
                  <span className="text-sm">Updated {formatDate(blog.updatedAt)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 max-w-4xl -mt-16 mb-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-4xl pb-20">
          {/* Excerpt */}
          <div className="text-xl text-gray-700 leading-relaxed mb-8 font-light italic border-l-4 border-orange-500 pl-6">
            {blog.excerpt}
          </div>

          {/* Main Content - Use processedContent with internal links */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-black prose-p:leading-relaxed text-black prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-600 hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-black prose-ol:text-black prose-li:text-black prose-em:text-black prose-strong:text-black prose-img:rounded-lg prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:italic"
            style={proseStyles}
            dangerouslySetInnerHTML={{
              __html: blog.processedContent || blog.content
            }}
          />

          {/* Internal Links Applied (for debugging - remove in production) */}
          {blog.internalLinksApplied && blog.internalLinksApplied.length > 0 && (
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Related Topics in This Post:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.internalLinksApplied.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-gray-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <NewsletterSubscription 
              source="blog_detail"
              compact={true}
              title={t('stayUpdated')}
              description={t('newsletterDescription')}
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={() => router.push('/blog')}
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors"
            >
              <span>←</span>
              <span>Back to All Posts</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
