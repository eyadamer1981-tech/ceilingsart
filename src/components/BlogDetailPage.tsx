import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from './ui/skeleton';
import { SEO, mergeSEOData, SEOProps } from './SEO';
import { BlogShareButtons } from './BlogShareButtons';
import { BlogGallery } from './BlogGallery';

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
  gallery?: string[];
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
  const contentRef = useRef<HTMLDivElement>(null);

  // Get slug from props or route params (App Router)
  const slug = propSlug || (params?.slug as string);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Handle internal link clicks for client-side navigation
  useEffect(() => {
    if (!contentRef.current || !blog) return;

    const handleInternalLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a.internal-link') as HTMLAnchorElement;
      
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          // Check if it's an internal link (starts with /)
          if (href.startsWith('/')) {
            router.push(href);
          } else {
            // External link - open in new tab
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        }
      }
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener('click', handleInternalLinkClick);

    return () => {
      contentElement.removeEventListener('click', handleInternalLinkClick);
    };
  }, [blog, router]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/slug/${slug}`);

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

  // Parse content and replace gallery placeholders with gallery components
  const parseContentWithGalleries = () => {
    if (!blog.processedContent && !blog.content) return null;
    
    const content = blog.processedContent || blog.content;
    const gallery = blog.gallery || [];
    
    // Split content by gallery placeholders [GALLERY:0], [GALLERY:1], etc.
    const parts: Array<{ type: 'text' | 'gallery'; content?: string; galleryIndex?: number }> = [];
    const galleryRegex = /\[GALLERY:(\d+)\]/g;
    let lastIndex = 0;
    let match;
    let galleryCounter = 0;

    while ((match = galleryRegex.exec(content)) !== null) {
      // Add text before gallery
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        });
      }
      
      // Add gallery
      const galleryIndex = parseInt(match[1], 10);
      parts.push({
        type: 'gallery',
        galleryIndex: galleryIndex
      });
      
      lastIndex = match.index + match[0].length;
      galleryCounter++;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }
    
    // If no galleries found, return all as text
    if (parts.length === 0) {
      return (
        <div
          ref={contentRef}
          className="prose prose-lg max-w-none text-gray-900
            prose-headings:font-light prose-headings:text-gray-900
            prose-p:text-gray-900 prose-p:leading-relaxed
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-600 hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:text-gray-900 prose-ol:text-gray-900
            prose-li:text-gray-900
            prose-img:rounded-lg prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:italic prose-blockquote:text-gray-900
            [&_p]:text-gray-900 [&_span]:text-gray-900 [&_div]:text-gray-900
            [&_a.internal-link]:text-orange-600 [&_a.internal-link]:font-medium [&_a.internal-link]:underline
            [&_a.internal-link]:decoration-orange-300 [&_a.internal-link]:decoration-2
            [&_a.internal-link]:underline-offset-2 [&_a.internal-link]:cursor-pointer
            [&_a.internal-link]:transition-all [&_a.internal-link]:duration-200
            hover:[&_a.internal-link]:text-orange-700 hover:[&_a.internal-link]:decoration-orange-500
            hover:[&_a.internal-link]:decoration-[3px]"
          style={{ color: '#111827' }}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      );
    }
    
    // Render parts with galleries
    return (
      <div ref={contentRef}>
        {parts.map((part, index) => {
          if (part.type === 'text' && part.content) {
            return (
              <div
                key={`text-${index}`}
                className="prose prose-lg max-w-none text-gray-900
                  prose-headings:font-light prose-headings:text-gray-900
                  prose-p:text-gray-900 prose-p:leading-relaxed
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-600 hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:text-gray-900 prose-ol:text-gray-900
                  prose-li:text-gray-900
                  prose-img:rounded-lg prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:italic prose-blockquote:text-gray-900
                  [&_p]:text-gray-900 [&_span]:text-gray-900 [&_div]:text-gray-900
                  [&_a.internal-link]:text-orange-600 [&_a.internal-link]:font-medium [&_a.internal-link]:underline
                  [&_a.internal-link]:decoration-orange-300 [&_a.internal-link]:decoration-2
                  [&_a.internal-link]:underline-offset-2 [&_a.internal-link]:cursor-pointer
                  [&_a.internal-link]:transition-all [&_a.internal-link]:duration-200
                  hover:[&_a.internal-link]:text-orange-700 hover:[&_a.internal-link]:decoration-orange-500
                  hover:[&_a.internal-link]:decoration-[3px]"
                style={{ color: '#111827' }}
                dangerouslySetInnerHTML={{
                  __html: part.content
                }}
              />
            );
          } else if (part.type === 'gallery' && part.galleryIndex !== undefined) {
            // For now, show all gallery images. In future, could support multiple galleries
            return (
              <BlogGallery
                key={`gallery-${index}`}
                images={gallery}
                galleryIndex={part.galleryIndex}
              />
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <>
      <SEO {...finalSEO} />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {blog.featured && (
              <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t('featuredPost')}
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

          {/* Main Content - Use processedContent with internal links and galleries */}
          {parseContentWithGalleries()}

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

          {/* Social Share Buttons */}
          <BlogShareButtons 
            title={blog.title}
            url={getFullUrl()}
            description={blog.excerpt}
          />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={() => router.push('/blog')}
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors"
            >
              <span>←</span>
              <span>{t('backToAllPosts')}</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
