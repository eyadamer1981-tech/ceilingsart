import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Service {
  _id: string;
  title?: string; // For backward compatibility
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category?: string;
  image: string;
  detailImages?: string[];
  features?: string[];
  benefits?: string[];
  applications?: string[];
  specifications?: {
    material?: string;
    thickness?: string;
    colors?: string;
    warranty?: string;
    installation?: string;
  };
  featured: boolean;
  createdAt: string;
}

export function StretchCeilingsManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: '',
    featured: false,
    features: '' as unknown as string,
    benefits: '' as unknown as string,
    applications: '' as unknown as string,
    specifications: {
      material: '',
      thickness: '',
      colors: '',
      warranty: '',
      installation: '',
    },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

  const fetchServices = useCallback(async () => {
    try {
      console.log('StretchCeilingsManager: Fetching stretch ceilings...');
      // Bypass CDN/browser caching for admin by adding a cache-busting query and no-store
      const cacheBuster = Date.now();
      const response = await fetch(`/api/stretch-ceilings?admin=1&ts=${cacheBuster}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      const data = await response.json();
      console.log('StretchCeilingsManager: Received', data.length, 'stretch ceilings');
      
      setServices(data);
    } catch (error) {
      console.error('Error fetching stretch ceiling services:', error);
    }
    setInitialLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('titleEn', formData.titleEn);
    formDataToSend.append('titleAr', formData.titleAr);
    formDataToSend.append('descriptionEn', formData.descriptionEn);
    formDataToSend.append('descriptionAr', formData.descriptionAr);
    formDataToSend.append('category', 'Stretch Ceilings'); // Force category
    formDataToSend.append('featured', formData.featured.toString());
    // Optional arrays/objects serialized as JSON strings
    if (formData.features && (formData.features as any as string).trim()) {
      try { formDataToSend.append('features', JSON.stringify((formData.features as any as string).split('\n').map(s => s.trim()).filter(Boolean))); } catch {}
    }
    if (formData.benefits && (formData.benefits as any as string).trim()) {
      try { formDataToSend.append('benefits', JSON.stringify((formData.benefits as any as string).split('\n').map(s => s.trim()).filter(Boolean))); } catch {}
    }
    if (formData.applications && (formData.applications as any as string).trim()) {
      try { formDataToSend.append('applications', JSON.stringify((formData.applications as any as string).split('\n').map(s => s.trim()).filter(Boolean))); } catch {}
    }
    if (formData.specifications) {
      try { formDataToSend.append('specifications', JSON.stringify(formData.specifications)); } catch {}
    }

    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    detailImageFiles.slice(0,3).forEach((file) => formDataToSend.append('detailImages', file));

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingService
        ? `/api/stretch-ceilings/${editingService._id}`
        : '/api/stretch-ceilings';

      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        fetchServices();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving stretch ceiling service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stretch ceiling service?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/stretch-ceilings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting stretch ceiling service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      titleEn: service.titleEn || service.title || '',
      titleAr: service.titleAr || service.title || '',
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      category: service.category || '',
      featured: service.featured,
      features: Array.isArray(service.features) ? service.features.join('\n') : '',
      benefits: Array.isArray(service.benefits) ? service.benefits.join('\n') : '',
      applications: Array.isArray(service.applications) ? service.applications.join('\n') : '',
      specifications: {
        material: service.specifications?.material || '',
        thickness: service.specifications?.thickness || '',
        colors: service.specifications?.colors || '',
        warranty: service.specifications?.warranty || '',
        installation: service.specifications?.installation || '',
      },
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ 
      titleEn: '', 
      titleAr: '', 
      descriptionEn: '', 
      descriptionAr: '', 
      category: '', 
      featured: false,
      features: '' as any,
      benefits: '' as any,
      applications: '' as any,
      specifications: { material: '', thickness: '', colors: '', warranty: '', installation: '' },
    });
    setImageFile(null);
    setDetailImageFiles([]);
    setEditingService(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Stretch Ceilings Management
        </h2>
        <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 px-4">
          Manage stretch ceiling services and French ceiling solutions
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-6 lg:px-8 py-3 rounded-full hover:from-purple-500 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="font-medium">Add New Stretch Ceiling</span>
        </button>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={resetForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-2xl font-light text-gray-900 mb-2">
              {editingService ? 'Edit Stretch Ceiling' : 'Add New Stretch Ceiling'}
            </h3>
            <h3 className="text-lg lg:text-2xl font-light text-gray-600 mb-2" dir="rtl">
              {editingService ? 'تعديل السقف المشدود' : 'إضافة سقف مشدود جديد'}
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              {editingService ? 'Update your stretch ceiling information' : 'Create a new stretch ceiling service'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ceiling Title (English)
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="Enter stretch ceiling title in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  عنوان السقف المشدود (Arabic)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="أدخل عنوان السقف المشدود بالعربية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ceiling Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required={!editingService}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">Main image appears across listings and hero sections.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Detail Images (up to 3, shown only on ceiling detail)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setDetailImageFiles(Array.from(e.target.files || []).slice(0,3))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">These images are only displayed on the detail page.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ceiling Description (English)
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="Describe your stretch ceiling in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                وصف السقف المشدود (Arabic)
              </label>
              <textarea
                dir="rtl"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="اكتب وصف السقف المشدود بالعربية"
              />
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Key Features (one per line)
              </label>
              <textarea
                value={formData.features as any as string}
                onChange={(e) => setFormData({ ...formData, features: e.target.value as any })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="e.g. Seamless finish\nWaterproof\nQuick installation"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Benefits (one per line)
              </label>
              <textarea
                value={formData.benefits as any as string}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value as any })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="e.g. Enhances lighting\nEasy maintenance\nDurable"
              />
            </div>

            {/* Applications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Applications (one per line)
              </label>
              <textarea
                value={formData.applications as any as string}
                onChange={(e) => setFormData({ ...formData, applications: e.target.value as any })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="e.g. Living rooms\nRestaurants\nRetail stores"
              />
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Material</label>
                <input
                  type="text"
                  value={formData.specifications.material}
                  onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, material: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="PVC / Polyester"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Thickness</label>
                <input
                  type="text"
                  value={formData.specifications.thickness}
                  onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, thickness: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="e.g. 0.18mm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
                <input
                  type="text"
                  value={formData.specifications.colors}
                  onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, colors: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="e.g. 100+ colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Warranty</label>
                <input
                  type="text"
                  value={formData.specifications.warranty}
                  onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, warranty: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="e.g. 10-Year Warranty"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Installation</label>
                <input
                  type="text"
                  value={formData.specifications.installation}
                  onChange={(e) => setFormData({ ...formData, specifications: { ...formData.specifications, installation: e.target.value } })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="e.g. Certified installation team"
                />
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="featured" className="ml-3 text-sm font-medium text-gray-900">
                Featured on main page
              </label>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 lg:px-8 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium text-sm lg:text-base flex-1 sm:flex-none"
              >
                {loading ? 'Saving...' : editingService ? 'Update Ceiling' : 'Create Ceiling'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 lg:px-8 py-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium text-sm lg:text-base flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </form>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {initialLoading && (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`stretch-skel-${i}`} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="w-full h-56 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="flex justify-center space-x-3">
                  <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))
        )}
        {!initialLoading && services.map((service) => (
          <div key={service._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
            <div className="relative">
              <img
                src={service.image}
                alt={service.titleEn || service.title}
                className="w-full h-40 lg:h-56 object-cover"
              />
              {service.featured && (
                <div className="absolute top-2 right-2 lg:top-4 lg:right-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium flex items-center space-x-1">
                  <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
            </div>
            <div className="p-3 lg:p-6">
              <h3 className="text-base lg:text-xl font-medium text-gray-900 mb-2 lg:mb-3 line-clamp-2">
                {service.titleEn || service.title}
              </h3>
              <p className="text-gray-600 text-xs lg:text-sm mb-4 lg:mb-6 line-clamp-2 lg:line-clamp-3 leading-relaxed">
                {service.descriptionEn}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex items-center justify-center space-x-2 bg-purple-50 text-purple-600 px-3 py-2 lg:px-4 lg:py-2 rounded-full hover:bg-purple-100 transition-all duration-300 font-medium text-xs lg:text-sm"
                >
                  <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-3 py-2 lg:px-4 lg:py-2 rounded-full hover:bg-red-100 transition-all duration-300 font-medium text-xs lg:text-sm"
                >
                  <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


