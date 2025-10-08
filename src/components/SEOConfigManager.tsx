/**
 * Global SEO Configuration Manager
 * Admin UI for controlling site-wide SEO automation settings
 */

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

interface SEOConfig {
  _id?: string;
  globalAutoSEO: boolean;
  globalAutoInternalLinks: boolean;
  maxInternalLinksPerPost: number;
  defaultMetaKeywordsCount: number;
  siteName: string;
  defaultOGImage: string;
  twitterHandle: string;
}

export function SEOConfigManager() {
  const [config, setConfig] = useState<SEOConfig>({
    globalAutoSEO: true,
    globalAutoInternalLinks: true,
    maxInternalLinksPerPost: 5,
    defaultMetaKeywordsCount: 10,
    siteName: 'CA CEILINGS Art',
    defaultOGImage: '',
    twitterHandle: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/seo-config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching SEO config:', error);
      setMessage({ type: 'error', text: 'Failed to load configuration' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/seo-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      setMessage({ type: 'success', text: 'Configuration saved successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-gray-700" />
        <div>
          <h2 className="text-2xl font-light text-gray-900">Global SEO Configuration</h2>
          <p className="text-gray-600 text-sm mt-1">
            Control site-wide SEO automation and default settings
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
        {/* Global Automation Toggles */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Global Automation Controls</h3>
          <p className="text-sm text-gray-600">
            When disabled, no blog posts will use automatic features (even if enabled per-post)
          </p>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <div>
                <div className="font-medium text-gray-900">Enable Auto-SEO Globally</div>
                <div className="text-sm text-gray-600 mt-1">
                  Automatically generate meta tags from blog content site-wide
                </div>
              </div>
              <input
                type="checkbox"
                checked={config.globalAutoSEO}
                onChange={(e) => setConfig({ ...config, globalAutoSEO: e.target.checked })}
                className="w-6 h-6 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <div>
                <div className="font-medium text-gray-900">Enable Auto Internal Links Globally</div>
                <div className="text-sm text-gray-600 mt-1">
                  Automatically apply internal link mappings site-wide
                </div>
              </div>
              <input
                type="checkbox"
                checked={config.globalAutoInternalLinks}
                onChange={(e) => setConfig({ ...config, globalAutoInternalLinks: e.target.checked })}
                className="w-6 h-6 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Default Settings */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Default Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Internal Links Per Post
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={config.maxInternalLinksPerPost}
                onChange={(e) =>
                  setConfig({ ...config, maxInternalLinksPerPost: parseInt(e.target.value) || 5 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 3-5 links</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Meta Keywords Count
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={config.defaultMetaKeywordsCount}
                onChange={(e) =>
                  setConfig({ ...config, defaultMetaKeywordsCount: parseInt(e.target.value) || 10 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Number of keywords to extract</p>
            </div>
          </div>
        </div>

        {/* Site-wide SEO Defaults */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Site-wide SEO Defaults</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Site Name"
              />
              <p className="text-xs text-gray-500 mt-1">Used in Open Graph tags</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default OG Image URL
              </label>
              <input
                type="text"
                value={config.defaultOGImage}
                onChange={(e) => setConfig({ ...config, defaultOGImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/images/default-og-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Fallback image for social sharing</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter Handle
              </label>
              <input
                type="text"
                value={config.twitterHandle}
                onChange={(e) => setConfig({ ...config, twitterHandle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="@yourhandle"
              />
              <p className="text-xs text-gray-500 mt-1">Your Twitter username (with @)</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">How This Works</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Global toggles override per-post settings when disabled</li>
          <li>When global auto-SEO is OFF, only manual SEO data is used</li>
          <li>When global auto-links is OFF, only manual links are applied</li>
          <li>Per-post settings can disable automation even when global is enabled</li>
        </ul>
      </div>
    </div>
  );
}
