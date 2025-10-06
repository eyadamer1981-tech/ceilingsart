import React from 'react';

interface ProductCardSliderSkeletonProps {
  titleWidthPct?: number; // 40-60 typical
  slides?: number; // number of placeholder cards
}

export function ProductCardSliderSkeleton({ titleWidthPct = 40, slides = 8 }: ProductCardSliderSkeletonProps) {
  const cardWidth = 300;
  const gap = 24;

  return (
    <div className="mb-16">
      {/* Title + controls skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 rounded bg-gray-200 animate-pulse" style={{ width: `${titleWidthPct}%` }} />
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Slider rail skeleton */}
      <div className="relative">
        <div
          className="flex gap-6 overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)' }}
        >
          {Array.from({ length: slides }).map((_, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default ProductCardSliderSkeleton;


