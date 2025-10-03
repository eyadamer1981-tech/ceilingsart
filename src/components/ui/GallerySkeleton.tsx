import React from 'react';

interface GallerySkeletonProps {
  count?: number;
}

export function GallerySkeleton({ count = 6 }: GallerySkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="group">
          {/* Image skeleton */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="mt-4 text-center">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-3/4"></div>
            
            {/* Category badge skeleton */}
            <div className="inline-block bg-gray-200 rounded-full animate-pulse">
              <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GallerySkeletonCard() {
  return (
    <div className="group">
      {/* Image skeleton */}
      <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="mt-4 text-center">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-3/4"></div>
        
        {/* Category badge skeleton */}
        <div className="inline-block bg-gray-200 rounded-full animate-pulse">
          <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

// New: skeletons that match gallery slider dimensions (three horizontal sliders)
export function GallerySlidersSkeleton() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <div key={rowIndex} className="w-full">
          <div className="flex space-x-4 overflow-hidden">
            {Array.from({ length: 6 }).map((__, i) => (
              <div key={i} className="flex-shrink-0 w-64">
                <div className="w-full h-40 rounded-lg bg-gray-200 animate-pulse" />
                <div className="mt-3 h-4 w-3/4 mx-auto rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}






