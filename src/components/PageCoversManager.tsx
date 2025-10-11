import { useState, useEffect } from 'react';
import { Upload, Save, Eye, Image as ImageIcon, Home, User, Volume2, Layers, Briefcase, RefreshCw } from 'lucide-react';

interface PageCover {
  id: string;
  pageType: 'home' | 'aboutus' | 'acousticpanel' | 'stretchceiling' | 'ourwork';
  coverType?: 'hero' | 'about' | 'services' | 'stretchCeilings' | 'acousticPanels'; // For specific circular images
  title: string;
  image: string;
  imageId?: string;
  updatedAt: string;
}

export function PageCoversManager() {
  const [pageCovers, setPageCovers] = useState<PageCover[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [activePage, setActivePage] = useState<'home' | 'aboutus' | 'acousticpanel' | 'stretchceiling' | 'ourwork'>('home');
  const [activeCoverType, setActiveCoverType] = useState<'hero' | 'about' | 'services' | 'stretchCeilings' | 'acousticPanels'>('hero');
  const [imageCacheBuster, setImageCacheBuster] = useState<number>(Date.now());

  const pageTypes = [
    { key: 'home', label: 'Home Page', icon: Home, description: 'Main homepage covers and circular images', hasSubTypes: true },
    { key: 'aboutus', label: 'About Us Page', icon: User, description: 'About us page cover image', hasSubTypes: false },
    { key: 'acousticpanel', label: 'Acoustic Panels Page', icon: Volume2, description: 'Acoustic panels page cover image', hasSubTypes: false },
    { key: 'stretchceiling', label: 'Stretch Ceilings Page', icon: Layers, description: 'Stretch ceilings page cover image', hasSubTypes: false },
    { key: 'ourwork', label: 'Our Work Page', icon: Briefcase, description: 'Our work/gallery page cover image', hasSubTypes: false }
  ];

  const coverTypes = [
    { key: 'hero', label: 'Hero Circular Image', description: 'Main circular ellipse image in hero section' },
    { key: 'about', label: 'About Us Image', description: 'About us section image' },
    { key: 'services', label: 'Services Images', description: 'Main services section images' },
    { key: 'stretchCeilings', label: 'Stretch Ceilings Service Image', description: 'Stretch ceilings service image in main services section' },
    { key: 'acousticPanels', label: 'Acoustic Panels Service Image', description: 'Acoustic panels service image in main services section' }
  ];

  useEffect(() => {
    fetchPageCovers();
  }, []);

  const fetchPageCovers = async () => {
    try {
      const cacheBuster = Date.now();
      const response = await fetch(`/api/page-covers?admin=1&ts=${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPageCovers(data);
        setImageCacheBuster(Date.now()); // Update cache buster to refresh images
      }
    } catch (error) {
      console.error('Error fetching page covers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('You are not logged in. Please log in again.');
        window.location.reload();
        return;
      }
      
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('pageType', activePage);
      formData.append('coverType', activeCoverType);

      console.log('PageCoversManager - Sending request with:', {
        pageType: activePage,
        coverType: activeCoverType,
        file: selectedFile ? { name: selectedFile.name, size: selectedFile.size } : 'No file'
      });

      const response = await fetch('/api/page-covers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        await fetchPageCovers();
        setSelectedFile(null);
        setPreviewUrl('');
        alert('Page cover updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Page covers API error:', errorData);
        
        if (response.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('adminToken');
          window.location.reload();
        } else {
          alert(`Error updating page cover: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error saving page cover:', error);
      alert('Error saving page cover');
    } finally {
      setSaving(false);
    }
  };


  const getCurrentCover = (pageType: string, coverType?: string) => {
    if (pageType === 'home' && coverType) {
      return pageCovers.find(cover => cover.pageType === pageType && cover.coverType === coverType);
    }
    return pageCovers.find(cover => cover.pageType === pageType);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-gray-900">Page Covers Management</h2>
            <p className="text-gray-600">Manage cover images for home, about us, acoustic panels, stretch ceilings, and our work pages</p>
          </div>
        </div>
      </div>

      {/* Page Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Select Page Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pageTypes.map((page) => {
            const Icon = page.icon;
            const currentCover = getCurrentCover(page.key);
            const isActive = activePage === page.key;
            
            return (
              <button
                key={page.key}
                onClick={() => setActivePage(page.key as any)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                  isActive 
                    ? 'border-orange-400 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className={`w-6 h-6 ${isActive ? 'text-orange-400' : 'text-gray-400'}`} />
                  <span className={`font-medium ${isActive ? 'text-orange-400' : 'text-gray-900'}`}>
                    {page.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                {currentCover && (
                  <div className="flex items-center space-x-2 text-xs text-green-600">
                    <Eye className="w-4 h-4" />
                    <span>Cover exists</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cover Type Selection (only for home page) */}
      {activePage === 'home' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Select Cover Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverTypes.map((cover) => (
              <button
                key={cover.key}
                onClick={() => setActiveCoverType(cover.key as 'hero' | 'about' | 'services' | 'stretchCeilings' | 'acousticPanels')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  activeCoverType === cover.key
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className={`font-medium ${
                    activeCoverType === cover.key ? 'text-orange-900' : 'text-gray-900'
                  }`}>
                    {cover.label}
                  </div>
                  <div className={`text-sm ${
                    activeCoverType === cover.key ? 'text-orange-700' : 'text-gray-500'
                  }`}>
                    {cover.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Cover Display */}
      {getCurrentCover(activePage, activePage === 'home' ? activeCoverType : undefined) && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Current Cover</h3>
            <button
              onClick={fetchPageCovers}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              title="Refresh page covers"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="flex items-start space-x-6">
            <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={`${getCurrentCover(activePage, activePage === 'home' ? activeCoverType : undefined)?.image}?t=${imageCacheBuster}`} 
                alt={`${activePage} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">
                {pageTypes.find(p => p.key === activePage)?.label} Cover
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Last updated: {new Date(getCurrentCover(activePage, activePage === 'home' ? activeCoverType : undefined)?.updatedAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Cover */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Upload New Cover</h3>
        
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!selectedFile || saving}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedFile && !saving
                  ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white hover:from-orange-500 hover:to-yellow-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Cover</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
