import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../lib/translations";

export interface DetailItem {
  title: string;
  titleEn?: string;
  titleAr?: string;
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
  const [resolvedItem, setResolvedItem] = useState<DetailItem>(item);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(false);
  const { language, isRTL } = useLanguage();
  
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        if (isMounted) setLoadingRelated(true);
        // Determine the correct API endpoint based on category
        let apiEndpoint = '/api/projects'; // Default to projects
        
        if (isService) {
          // For services, determine which API to use based on category
          if (item.category?.toLowerCase().includes('acoustic')) {
            apiEndpoint = '/api/acoustic-panels';
          } else if (item.category?.toLowerCase().includes('stretch') || item.category?.toLowerCase().includes('ceiling')) {
            apiEndpoint = '/api/stretch-ceilings';
          } else {
            // For other service categories, use projects since services API no longer exists
            apiEndpoint = '/api/projects';
          }
        }
        
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        const items: DetailItem[] = (Array.isArray(data) ? data : []).map((p: any) => ({
          title: p.title || p.titleEn,
          titleEn: p.titleEn,
          titleAr: p.titleAr,
          image: p.image,
          descriptionEn: p.descriptionEn,
          descriptionAr: p.descriptionAr,
          category: p.category,
          detailImages: p.detailImages || [],
        }));

        // Enrich the current item with backend data to ensure detailImages/description are present
        const match = items.find((p) => {
          const incomingTitle = item.titleEn || item.title;
          return (
            p.titleEn?.toLowerCase() === incomingTitle?.toLowerCase() ||
            p.title?.toLowerCase() === incomingTitle?.toLowerCase() ||
            (item.titleAr && p.titleAr && p.titleAr.toLowerCase() === item.titleAr.toLowerCase())
          );
        });
        if (match && isMounted) {
          setResolvedItem((prev) => ({
            // Prefer backend-enriched fields while preserving provided fallbacks
            title: match.title || prev.title,
            titleEn: match.titleEn || prev.titleEn,
            titleAr: match.titleAr || prev.titleAr,
            image: match.image || prev.image,
            description: prev.description,
            descriptionEn: match.descriptionEn || prev.descriptionEn,
            descriptionAr: match.descriptionAr || prev.descriptionAr,
            category: match.category || prev.category,
            detailImages: (match.detailImages && match.detailImages.length > 0) ? match.detailImages : (prev.detailImages || []),
          }));
        } else if (isMounted) {
          // If no match, keep the provided item
          setResolvedItem(item);
        }
        
        // Filter related items: exclude current item and optionally match by category
        const filtered = items
          .filter((p) => {
            const same =
              p.title === item.title ||
              (p.titleEn && (p.titleEn === item.titleEn || p.titleEn === item.title)) ||
              (p.titleAr && (p.titleAr === item.titleAr));
            return !same;
          })
          // Prefer related by same category when available
          .sort((a, b) => {
            const aMatch = a.category && item.category && a.category === item.category;
            const bMatch = b.category && item.category && b.category === item.category;
            return (aMatch === bMatch) ? 0 : (aMatch ? -1 : 1);
          })
          .slice(0, 3); // Take first 3 items
        
        if (isMounted) setRelated(filtered);
      } catch (error) {
        console.error('Error fetching related items:', error);
        if (isMounted) setRelated([]);
      }
      finally {
        if (isMounted) setLoadingRelated(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [item.title, item.titleEn, item.titleAr, item.category, isService]);
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
              <h1 className="text-3xl lg:text-4xl mb-2 tracking-wide">
                {isRTL && item.titleAr ? item.titleAr : (item.titleEn || item.title)}
              </h1>
              <p className="text-gray-300 text-lg">{item.category ?? (isService ? getTranslation(language, 'service') : getTranslation(language, 'project'))}</p>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={resolvedItem.image}
                alt={isRTL && resolvedItem.titleAr ? resolvedItem.titleAr : (resolvedItem.titleEn || resolvedItem.title)}
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
            {(resolvedItem.detailImages && resolvedItem.detailImages.length > 0 ? resolvedItem.detailImages.slice(0,3) : []).map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={src}
                  alt={`${isRTL && resolvedItem.titleAr ? resolvedItem.titleAr : (resolvedItem.titleEn || resolvedItem.title)} detail ${i + 1}`}
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
                const byLang = language === 'ar' ? (resolvedItem.descriptionAr || resolvedItem.description) : (resolvedItem.descriptionEn || resolvedItem.description);
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
              {loadingRelated && Array.from({ length: 3 }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className="w-full">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 animate-pulse" />
                  <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}

              {!loadingRelated && related.map((rel, idx) => (
                <div key={idx} className="cursor-pointer" onClick={() => onSelectRelated?.(rel)}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={rel.image}
                      alt={isRTL && rel.titleAr ? rel.titleAr : (rel.titleEn || rel.title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    {isRTL && rel.titleAr ? rel.titleAr : (rel.titleEn || rel.title)}
                  </div>
                </div>
              ))}

              {!loadingRelated && related.length === 0 && (
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


