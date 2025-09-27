import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageItem {
  src: string;
  alt: string;
  category: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  onSelect?: (image: ImageItem) => void;
}

export function ImageCarousel({ images, onSelect }: ImageCarouselProps) {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group images by category
  const groupedImages = images.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {} as Record<string, ImageItem[]>);

  const nextImage = () => {
    const categoryImages = Object.values(groupedImages).flat();
    setCurrentIndex((prev) => (prev + 1) % categoryImages.length);
  };

  const prevImage = () => {
    const categoryImages = Object.values(groupedImages).flat();
    setCurrentIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentCategory = Object.keys(groupedImages)[0] || 'Gallery';
  const categoryImages = Object.values(groupedImages).flat();

  if (categoryImages.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            {currentCategory}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Image Display */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categoryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => onSelect?.(image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-medium">{image.alt}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10`}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10`}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {categoryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
              {currentIndex + 1} / {categoryImages.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
