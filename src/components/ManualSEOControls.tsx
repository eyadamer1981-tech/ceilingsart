/**
 * Manual SEO and Internal Links Controls Component
 * Used in the blog editor for per-post SEO/link configuration
 */

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface ManualSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
}

interface ManualLink {
  keyword: string;
  url: string;
  caseSensitive: boolean;
  maxOccurrences: number;
}

interface ManualSEOControlsProps {
  autoSEO: boolean;
  autoInternalLinks: boolean;
  manualSEO: ManualSEO;
  manualLinks: ManualLink[];
  onAutoSEOChange: (value: boolean) => void;
  onAutoInternalLinksChange: (value: boolean) => void;
  onManualSEOChange: (seo: ManualSEO) => void;
  onManualLinksChange: (links: ManualLink[]) => void;
}

export function ManualSEOControls({
  autoSEO,
  autoInternalLinks,
  manualSEO,
  manualLinks,
  onAutoSEOChange,
  onAutoInternalLinksChange,
  onManualSEOChange,
  onManualLinksChange,
}: ManualSEOControlsProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const addKeyword = () => {
    if (keywordInput.trim()) {
      onManualSEOChange({
        ...manualSEO,
        keywords: [...manualSEO.keywords, keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    onManualSEOChange({
      ...manualSEO,
      keywords: manualSEO.keywords.filter((_, i) => i !== index),
    });
  };

  const addManualLink = () => {
    onManualLinksChange([
      ...manualLinks,
      { keyword: '', url: '', caseSensitive: false, maxOccurrences: 1 },
    ]);
  };

  const updateManualLink = (index: number, field: keyof ManualLink, value: any) => {
    const updated = [...manualLinks];
    updated[index] = { ...updated[index], [field]: value };
    onManualLinksChange(updated);
  };

  const removeManualLink = (index: number) => {
    onManualLinksChange(manualLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-medium text-gray-900">SEO & Internal Links Configuration</h3>

      {/* Automation Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoSEO}
            onChange={(e) => onAutoSEOChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <div>
            <div className="font-medium text-gray-900">Auto-generate SEO</div>
            <div className="text-sm text-gray-600">Automatically create meta tags from content</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoInternalLinks}
            onChange={(e) => onAutoInternalLinksChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <div>
            <div className="font-medium text-gray-900">Auto Internal Links</div>
            <div className="text-sm text-gray-600">Apply automatic link mappings</div>
          </div>
        </label>
      </div>

      {/* Manual SEO Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Manual SEO Overrides</h4>
        <p className="text-sm text-gray-600">
          These values will override auto-generated ones (if auto SEO is enabled) or be used exclusively
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              value={manualSEO.title}
              onChange={(e) => onManualSEOChange({ ...manualSEO, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Custom SEO title (50-60 chars)"
              maxLength={60}
            />
            <div className="text-xs text-gray-500 mt-1">
              {manualSEO.title.length}/60 characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={manualSEO.description}
              onChange={(e) => onManualSEOChange({ ...manualSEO, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Custom SEO description (150-160 chars)"
              rows={3}
              maxLength={160}
            />
            <div className="text-xs text-gray-500 mt-1">
              {manualSEO.description.length}/160 characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Keywords
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type keyword and press Enter"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {manualSEO.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom OG Image URL
              </label>
              <input
                type="text"
                value={manualSEO.ogImage}
                onChange={(e) => onManualSEOChange({ ...manualSEO, ogImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/images/custom-og.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={manualSEO.canonicalUrl}
                onChange={(e) => onManualSEOChange({ ...manualSEO, canonicalUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/blog/post"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Manual Internal Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Manual Internal Links</h4>
            <p className="text-sm text-gray-600">Define custom links for this post only</p>
          </div>
          <button
            type="button"
            onClick={addManualLink}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        {manualLinks.length > 0 ? (
          <div className="space-y-3">
            {manualLinks.map((link, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={link.keyword}
                    onChange={(e) => updateManualLink(index, 'keyword', e.target.value)}
                    placeholder="Keyword"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateManualLink(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={link.caseSensitive}
                      onChange={(e) => updateManualLink(index, 'caseSensitive', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    Case Sensitive
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <span>Max Occurrences:</span>
                    <input
                      type="number"
                      min="1"
                      value={link.maxOccurrences}
                      onChange={(e) => updateManualLink(index, 'maxOccurrences', parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => removeManualLink(index)}
                    className="ml-auto px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg text-gray-500">
            No manual links defined. Click "Add Link" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
