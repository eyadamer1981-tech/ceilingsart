/**
 * Modular SEO Component
 * Renders meta tags for search engines and social media
 */

import Head from 'next/head';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
  url?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  siteName?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function SEO({
  title,
  description,
  keywords = [],
  imageUrl = '',
  url = '',
  author,
  publishedTime,
  modifiedTime,
  siteName = 'CA CEILINGS Art',
  twitterHandle,
  canonicalUrl,
  noIndex = false,
  noFollow = false,
}: SEOProps) {
  // Ensure full URLs for images
  const getFullUrl = (relativeUrl: string) => {
    if (!relativeUrl) return '';
    if (relativeUrl.startsWith('http') || relativeUrl.startsWith('data:')) {
      return relativeUrl;
    }
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${relativeUrl}`;
    }
    return relativeUrl;
  };

  const fullImageUrl = getFullUrl(imageUrl);
  const fullPageUrl = canonicalUrl || url || (typeof window !== 'undefined' ? window.location.href : '');

  // Robots meta tag
  const robotsContent: string[] = [];
  if (noIndex) robotsContent.push('noindex');
  if (noFollow) robotsContent.push('nofollow');
  const robotsMeta = robotsContent.length > 0 ? robotsContent.join(', ') : 'index, follow';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsMeta} />

      {/* Canonical URL */}
      {fullPageUrl && <link rel="canonical" href={fullPageUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
      {fullPageUrl && <meta property="og:url" content={fullPageUrl} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImageUrl && <meta name="twitter:image" content={fullImageUrl} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
    </Head>
  );
}

/**
 * Merge manual and automatic SEO data
 * Manual values take precedence when provided
 */
export function mergeSEOData(
  autoSEO: Partial<SEOProps>,
  manualSEO: Partial<SEOProps>,
  useAuto: boolean
): SEOProps {
  if (!useAuto) {
    // Use only manual data
    return {
      title: manualSEO.title || autoSEO.title || 'Untitled',
      description: manualSEO.description || autoSEO.description || '',
      keywords: manualSEO.keywords || [],
      imageUrl: manualSEO.imageUrl || autoSEO.imageUrl || '',
      url: manualSEO.url || autoSEO.url || '',
      author: manualSEO.author || autoSEO.author,
      publishedTime: manualSEO.publishedTime || autoSEO.publishedTime,
      modifiedTime: manualSEO.modifiedTime || autoSEO.modifiedTime,
      siteName: manualSEO.siteName || autoSEO.siteName,
      twitterHandle: manualSEO.twitterHandle || autoSEO.twitterHandle,
      canonicalUrl: manualSEO.canonicalUrl || autoSEO.canonicalUrl,
      noIndex: manualSEO.noIndex || false,
      noFollow: manualSEO.noFollow || false,
    };
  }

  // Merge: Manual overrides auto
  return {
    title: manualSEO.title || autoSEO.title || 'Untitled',
    description: manualSEO.description || autoSEO.description || '',
    keywords: manualSEO.keywords && manualSEO.keywords.length > 0
      ? manualSEO.keywords
      : autoSEO.keywords || [],
    imageUrl: manualSEO.imageUrl || autoSEO.imageUrl || '',
    url: manualSEO.url || autoSEO.url || '',
    author: manualSEO.author || autoSEO.author,
    publishedTime: manualSEO.publishedTime || autoSEO.publishedTime,
    modifiedTime: manualSEO.modifiedTime || autoSEO.modifiedTime,
    siteName: manualSEO.siteName || autoSEO.siteName,
    twitterHandle: manualSEO.twitterHandle || autoSEO.twitterHandle,
    canonicalUrl: manualSEO.canonicalUrl || autoSEO.canonicalUrl,
    noIndex: manualSEO.noIndex !== undefined ? manualSEO.noIndex : false,
    noFollow: manualSEO.noFollow !== undefined ? manualSEO.noFollow : false,
  };
}
