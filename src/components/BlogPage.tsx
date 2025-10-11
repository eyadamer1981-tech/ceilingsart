import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Skeleton } from './ui/skeleton';
import { NewsletterSubscription } from './NewsletterSubscription';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  featured: boolean;
  slug?: string;
  createdAt: string;
}

interface BlogPageProps {
  onBlogSelect?: (blogSlug: string) => void;
}

export function BlogPage({ onBlogSelect }: BlogPageProps) {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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

  const BlogSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1200 60"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,30C150,20 300,40 600,30C900,20 1050,40 1200,30L1200,60L0,60Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-4">
            {t('blogPageTitle')}
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            {t('blogPageSubtitle')}
          </p>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1200 60"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,30C150,40 300,20 600,30C900,40 1050,20 1200,30L1200,0L0,0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-light text-gray-900 mb-4">{t('noBlogPostsAvailable')}</h3>
              <p className="text-gray-600">{t('checkBackLater')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post._id}
                  onClick={() => {
                    if (onBlogSelect) {
                      onBlogSelect(post.slug || post._id);
                    } else {
                      // Fallback: try to navigate using window.location if no callback provided
                      window.location.href = `/blog/${post.slug || post._id}`;
                    }
                  }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.featured ? 'Featured' : 'Blog'}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    
                    <h2 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300">
                        {t('readMore')} →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <NewsletterSubscription 
            source="blog"
            className="mt-20"
          />
        </div>
      </div>
    </section>
  );
}