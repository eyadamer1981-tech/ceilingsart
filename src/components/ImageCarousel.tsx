import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageItem {
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
}

interface FeaturedContent {
  acousticPanels: any[];
  stretchCeilings: any[];
  projects: any[];
  blogs: any[];
}

interface ImageCarouselProps {
  onSelect?: (image: ImageItem) => void;
}

export function ImageCarousel({ onSelect }: ImageCarouselProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent>({
    acousticPanels: [],
    stretchCeilings: [],
    projects: [],
    blogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedContent();
    setCurrentIndex(0); // Reset to first slide when language changes
  }, [language]);

  const fetchFeaturedContent = async () => {
    try {
      const response = await fetch(`/api/featured?lang=${language}`);
      const data = await response.json();
      console.log('Featured content fetched:', data);
      // Only update if we got valid data
      if (data && (data.acousticPanels?.length > 0 || data.stretchCeilings?.length > 0 || data.projects?.length > 0 || data.blogs?.length > 0)) {
        setFeaturedContent(data);
      }
    } catch (error) {
      console.error('Error fetching featured content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert featured content to image items
  const convertToImageItems = (items: any[]): ImageItem[] => {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    return items.map(item => ({
      src: item.image || '/image.png',
      alt: item.title || (language === 'ar' ? (item.titleAr || 'صورة') : (item.titleEn || 'Image')),
      category: item.category || (language === 'ar' ? 'المعرض' : 'Gallery'),
      title: item.title || (language === 'ar' ? (item.titleAr || '') : (item.titleEn || '')),
      description: item.description || (language === 'ar' ? (item.descriptionAr || '') : (item.descriptionEn || ''))
    }));
  };

  // Combine all featured content into one array
  const acousticImages = convertToImageItems(featuredContent.acousticPanels);
  const stretchImages = convertToImageItems(featuredContent.stretchCeilings);
  const projectsImages = convertToImageItems(featuredContent.projects);
  const blogsImages = convertToImageItems(featuredContent.blogs);
  const allImages = [...acousticImages, ...stretchImages, ...projectsImages, ...blogsImages];

  // Ensure images is an array
  const imagesArray = Array.isArray(allImages) ? allImages : [];

  // Group images by category
  const groupedImages = imagesArray.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {} as Record<string, ImageItem[]>);

  const categoryImages = Object.values(groupedImages).flat();

  // Fallback images if no data is available
  const fallbackImages: ImageItem[] = [
    {
      src: '/image.png',
      alt: 'Stretch Ceiling Design',
      category: 'Stretch Ceilings'
    },
    {
      src: '/image.png', 
      alt: 'Acoustic Panel Installation',
      category: 'Acoustic Panels'
    }
  ];

  const displayImages = categoryImages.length > 0 ? categoryImages : fallbackImages;

  // Debug logging
  console.log('Display images:', displayImages);
  console.log('Current index:', currentIndex);
  console.log('Current image:', displayImages[currentIndex]);
  console.log('Language:', language);
  console.log('Featured content:', featuredContent);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  if (imagesArray.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">No featured content available</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            {displayImages[currentIndex]?.category || (language === 'ar' ? 'المعرض' : 'Gallery')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Image Display */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${language === 'ar' ? currentIndex * 100 : -currentIndex * 100}%)` }}
            >
              {displayImages.map((image, index) => (
                <div key={`image-${index}`} className="w-full flex-shrink-0 relative group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      key={`img-${index}`}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover cursor-pointer transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                      onClick={() => onSelect?.(image)}
                      onError={(e) => {
                        console.error('Image failed to load:', image.src, 'Language:', language, e);
                        e.currentTarget.src = '/image.png';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', image.src, 'Language:', language);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 transform translate-y-0 group-hover:translate-y-[-8px] transition-all duration-500 ease-out">
                    <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium group-hover:text-orange-200 transition-colors duration-500">{image.alt}</h3>
                    <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-500 mt-2 transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 -translate-y-1/2 left-6 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-orange-400 to-yellow-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {displayImages.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
