import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GallerySkeleton } from './ui/GallerySkeleton';

export interface GalleryItem { src: string; title: string; category: string; }

export function GalleryPage({ onSelect, onStartProject }: { onSelect?: (item: GalleryItem) => void; onStartProject?: () => void }) {
  const [galleryImages, setGalleryImages] = React.useState<GalleryItem[]>([]);
  const [filteredImages, setFilteredImages] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(0);
  const pageSize = 24;

  React.useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      try {
        // Check localStorage right before API call to catch dropdown selections
        try {
          const preset = localStorage.getItem('selectedGalleryCategory');
          if (preset && preset !== activeCategory) {
            console.log('GalleryPage: Found category selection during fetch:', preset);
            setActiveCategory(preset);
            localStorage.removeItem('selectedGalleryCategory');
            // Use the preset category for this API call
            const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
            qs.set('category', preset);
            const res = await fetch(`/api/projects/light?${qs.toString()}`);
            const data = await res.json();
            const items = Array.isArray(data?.items) ? data.items : [];
            setTotal(typeof data?.total === 'number' ? data.total : items.length);
            setGalleryImages(items.map((p: any) => ({ src: p.image, title: p.title, category: p.category })));
            return;
          }
        } catch {}

        // Normal API call with current activeCategory
        const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
        if (activeCategory) qs.set('category', activeCategory);
        const res = await fetch(`/api/projects/light?${qs.toString()}`);
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        setTotal(typeof data?.total === 'number' ? data.total : items.length);
        setGalleryImages(items.map((p: any) => ({ src: p.image, title: p.title, category: p.category })));
      } catch (e) {
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, [activeCategory, page]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/projects/categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {}
    }
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setFilteredImages(galleryImages);
  }, [galleryImages]);

  React.useEffect(() => {
    // pick up selection from header dropdown - check immediately and on focus
    const checkLocalStorage = () => {
      try {
        const preset = localStorage.getItem('selectedGalleryCategory');
        console.log('GalleryPage: Checking localStorage, found:', preset);
        if (preset) {
          console.log('GalleryPage: Setting active category to:', preset);
          setActiveCategory(preset);
          setPage(1);
          localStorage.removeItem('selectedGalleryCategory');
        } else {
          // Reset filter when no preset (clicking Gallery menu directly)
          setActiveCategory('');
          setPage(1);
        }
      } catch {}
    };

    // Check immediately
    checkLocalStorage();

    // Also check when window gains focus (user switches back to tab)
    const handleFocus = () => checkLocalStorage();
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, []); // Run on mount

  // Check localStorage periodically to catch dropdown selections
  React.useEffect(() => {
    const interval = setInterval(() => {
      try {
        const preset = localStorage.getItem('selectedGalleryCategory');
        if (preset && preset !== activeCategory) {
          console.log('GalleryPage: Found new category selection:', preset);
          setActiveCategory(preset);
          setPage(1);
          localStorage.removeItem('selectedGalleryCategory');
        }
      } catch {}
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto transform rotate-180"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,0L1296,0C1248,0,1152,0,1056,0C960,0,864,0,768,0C672,0,576,0,480,0C384,0,288,0,192,0C96,0,48,0,24,0L0,0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-4">
            GALLERY
          </h1>
          <p className="text-xl text-white tracking-wide">
            Explore our portfolio of exceptional ceiling designs
          </p>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,120L1296,120C1248,120,1152,120,1056,120C960,120,864,120,768,120C672,120,576,120,480,120C384,120,288,120,192,120C96,120,48,120,24,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {activeCategory && (
              <button
                onClick={() => { setActiveCategory(''); setPage(1); }}
                className="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Clear filter
              </button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded disabled:opacity-50 text-black"
              >
                Prev
              </button>
              <span className="text-sm text-black">Page {page}</span>
              <button
                disabled={page * pageSize >= total}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 text-black"
              >
                Next
              </button>
            </div>
          </div>

          {/* Gallery Content */}
          {loading && (
            <GallerySkeleton count={pageSize} />
          )}
          {!loading && galleryImages.length === 0 && (
            <div className="text-center text-black">No images found. Use the admin ingestion to import from art_images.</div>
          )}
          {!loading && galleryImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <div key={index} className="group cursor-pointer" onClick={() => onSelect?.(image)}>
                  <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{image.title}</h3>
                    <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
              Ready to Transform Your Space?
            </h2>
            <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
              Let us create a custom ceiling design that reflects your unique style and vision.
            </p>
            <button onClick={() => onStartProject?.()} className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-medium tracking-wide">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}