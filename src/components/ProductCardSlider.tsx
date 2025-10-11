import React, { useState, useRef } from 'react';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { translateCategory } from '../lib/translations';

export interface ProductCard {
  src: string;
  title: string;
  titleAr?: string;
  category: string;
}

interface ProductCardSliderProps {
  title: string;
  items: ProductCard[];
  onSelect?: (item: ProductCard) => void;
}

export function ProductCardSlider({ title, items, onSelect }: ProductCardSliderProps) {
  const { language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 300; // Fixed card width
  const gap = 24; // Gap between cards
  const visibleCards = 4; // Number of cards visible at once

  // Handle scroll events to update current index
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidthWithGap = cardWidth + gap;
      const newIndex = Math.round(scrollLeft / cardWidthWithGap);
      setCurrentIndex(Math.max(0, Math.min(newIndex, items.length - visibleCards)));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [items.length, visibleCards, cardWidth, gap]);

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
    <div className="mb-16 slider-container" dir="ltr">
      {/* Category Title */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent tracking-wide relative z-10">
            {translateCategory(title, language)}
          </h2>
          {/* Subtle shadow effect */}
          <h2 className="absolute top-0 left-0 text-4xl md:text-5xl font-bold text-gray-300 tracking-wide opacity-30 -z-10" style={{ transform: 'translate(2px, 2px)' }}>
            {translateCategory(title, language)}
          </h2>
        </div>
         <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
           <button
             onClick={isRTL ? nextSlide : prevSlide}
             disabled={isRTL ? !canGoNext : !canGoPrev}
             className={`p-2 rounded-full transition-all duration-300 ${
               (isRTL ? canGoNext : canGoPrev)
                 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                 : 'bg-gray-50 text-gray-300 cursor-not-allowed'
             }`}
             aria-label={isRTL ? "Next items" : "Previous items"}
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
             </svg>
           </button>
           <button
             onClick={isRTL ? prevSlide : nextSlide}
             disabled={isRTL ? !canGoPrev : !canGoNext}
             className={`p-2 rounded-full transition-all duration-300 ${
               (isRTL ? canGoPrev : canGoNext)
                 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                 : 'bg-gray-50 text-gray-300 cursor-not-allowed'
             }`}
             aria-label={isRTL ? "Previous items" : "Next items"}
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
          className="flex gap-6 overflow-x-auto md:overflow-x-hidden scrollbar-hide snap-x snap-mandatory"
          dir="ltr"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            touchAction: 'pan-x pinch-zoom'
          }}
        >
          {items.map((item, index) => (
            <MDiv
              key={index}
              className="flex-shrink-0 group cursor-pointer snap-start"
              onClick={() => onSelect?.(item)}
              style={{ width: `${cardWidth}px` }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05 }}
            >
              <div className="bg-white rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden">
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>
                
                {/* Content */}
                <div className="p-4 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-yellow-50 transition-all duration-500">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-800 transition-colors duration-500">
                    {isRTL && item.titleAr ? item.titleAr : item.title}
                  </h3>
                  <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium group-hover:from-orange-500 group-hover:to-yellow-600 transition-all duration-500">
                    {translateCategory(item.category, language)}
                  </span>
                </div>
              </div>
            </MDiv>
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
