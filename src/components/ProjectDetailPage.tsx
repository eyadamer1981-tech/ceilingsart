import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../lib/translations";

export interface DetailItem {
  title: string;
  image: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  category?: string;
  detailImages?: string[];
}

export function ProjectDetailPage({
  item,
  isService,
  onBackToProjects,
  onSelectRelated,
}: {
  item: DetailItem;
  isService: boolean;
  onBackToProjects: () => void;
  onSelectRelated?: (item: DetailItem) => void;
}) {
  const [related, setRelated] = useState<DetailItem[]>([]);
  const { language } = useLanguage();
  
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        // Fetch from the correct API endpoint based on whether it's a service or project
        const apiEndpoint = isService ? '/api/services' : '/api/projects';
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        const items: DetailItem[] = (Array.isArray(data) ? data : []).map((p: any) => ({
          title: p.title,
          image: p.image,
          descriptionEn: p.descriptionEn,
          descriptionAr: p.descriptionAr,
          category: p.category,
          detailImages: p.detailImages || [],
        }));
        
        // Filter related items: exclude current item and optionally match by category
        const filtered = items
          .filter(p => p.title !== item.title) // Exclude current item
          .slice(0, 3); // Take first 3 items
        
        if (isMounted) setRelated(filtered);
      } catch (error) {
        console.error('Error fetching related items:', error);
        if (isMounted) setRelated([]);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [item.title, item.category, isService]);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#2C2C2C" }}>
      {/* Note: Global site header remains rendered by the main page layout */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left Side - Project Info */}
          <div className="text-white flex flex-col justify-center">
            {/* Project Title */}
            <div className="mb-8">
              <div className="mb-3">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
                  style={{ backgroundColor: "#D4B655", color: "#1F1F1F" }}
                >
                  {isService ? getTranslation(language, 'service') : getTranslation(language, 'project')}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl mb-2 tracking-wide">{item.title}</h1>
              <p className="text-gray-300 text-lg">{item.category ?? (isService ? getTranslation(language, 'service') : getTranslation(language, 'project'))}</p>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Yellow accent bar */}
            <div className="absolute bottom-6 left-6 w-16 h-2" style={{ backgroundColor: "#D4B655" }}></div>
          </div>
        </div>

        {/* Secondary Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Side - Small Images */}
          <div className="grid grid-cols-3 gap-4">
            {(item.detailImages && item.detailImages.length > 0 ? item.detailImages.slice(0,3) : []).map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={src}
                  alt={`${item.title} detail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Side - Description */}
          <div className="text-white flex flex-col justify-center">
            <h3 className="text-xl mb-4 tracking-wide" style={{ color: "#D4B655" }}>
              {isService ? getTranslation(language, 'serviceDescription') : getTranslation(language, 'projectDescription')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {(() => {
                // Prioritize backend data: descriptionAr/descriptionEn, then fallback to description, then static fallback
                const byLang = language === 'ar' ? (item.descriptionAr || item.description) : (item.descriptionEn || item.description);
                if (byLang) return byLang;
                
                // Static fallback text in both languages
                if (isService) {
                  return language === 'ar' 
                    ? "اكتشف خدماتنا المخصصة المصممة لرفع مستوى الديكورات الداخلية بفن الأسقف المصنوع بدقة والتفاصيل المكررة."
                    : "Discover our tailored service offering designed to elevate interiors with precision-crafted ceiling artistry and refined details.";
                } else {
                  return language === 'ar'
                    ? "القوالب المزخرفة والتفاصيل الكلاسيكية المكررة تعزز هذا المنزل الفاخر. القوالب المعمارية والهيكلية مصممة للتأثير الجمالي المتطور في جميع أنحاء المنزل."
                    : "Ornate mouldings and refined classical details enhance this luxury home. Architectural and structural moldings are designed for sophisticated aesthetic impact throughout.";
                }
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl text-gray-900 mb-8">{getTranslation(language, isService ? 'relatedServices' : 'relatedProjects')}</h2>

          <div className="flex items-end justify-between">
            <div className="grid grid-cols-3 gap-6 flex-1">
              {related.map((rel, idx) => (
                <div key={idx} className="cursor-pointer" onClick={() => onSelectRelated?.(rel)}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{rel.title}</div>
                </div>
              ))}
              {related.length === 0 && (
                <div className="text-gray-500">{getTranslation(language, 'noRelatedItems')}</div>
              )}
            </div>

            <div className="ml-8">
              <Button
                onClick={onBackToProjects}
                className="px-8 py-3 text-lg"
                style={{ backgroundColor: "#D4B655", color: "#1F1F1F" }}
              >
                {getTranslation(language, 'back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


