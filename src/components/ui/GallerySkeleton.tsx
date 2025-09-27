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



