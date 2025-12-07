import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogGalleryProps {
  images: string[];
  galleryIndex?: number;
}

export function BlogGallery({ images, galleryIndex = 0 }: BlogGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="my-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div
            className="max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage]}
              alt={`Gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <p className="text-white text-center mt-4">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

