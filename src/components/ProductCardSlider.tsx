import React, { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export interface ProductCard {
  src: string;
  title: string;
  category: string;
}

interface ProductCardSliderProps {
  title: string;
  items: ProductCard[];
  onSelect?: (item: ProductCard) => void;
}

export function ProductCardSlider({ title, items, onSelect }: ProductCardSliderProps) {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 300; // Fixed card width
  const gap = 24; // Gap between cards
  const visibleCards = 4; // Number of cards visible at once

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollPosition = index * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, items.length - visibleCards);
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(prevIndex);
  };

  const canGoNext = currentIndex < Math.max(0, items.length - visibleCards);
  const canGoPrev = currentIndex > 0;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      {/* Category Title */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 tracking-wide">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoPrev
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Previous items"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoNext
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Next items"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 group cursor-pointer"
              onClick={() => onSelect?.(item)}
              style={{ width: `${cardWidth}px` }}
            >
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for better UX */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Dots indicator */}
      {items.length > visibleCards && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.max(1, items.length - visibleCards + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-orange-400 to-yellow-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
