import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Gallery({ onSelect }: { onSelect?: (item: { src: string; alt: string }) => void }) {
  const [galleryImages, setGalleryImages] = React.useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/projects/light?page=1&pageSize=9');
        const data = await res.json();
        const list = Array.isArray(data?.items) ? data.items : [];
        setGalleryImages(list.map((d: any) => ({ src: d.image, alt: d.title || 'Gallery image' })));
      } catch (e) {
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Gallery Grid */}
        {loading && (
          <div className="text-center text-gray-500">Loading gallery...</div>
        )}
        {!loading && galleryImages.length === 0 && (
          <div className="text-center text-gray-500">No images found. Use the admin ingestion to import from art_images.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-square cursor-pointer" onClick={() => onSelect?.(image)}>
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}