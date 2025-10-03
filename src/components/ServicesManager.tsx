import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  descriptionEn: string;
  descriptionAr: string;
  category?: string;
  image: string;
  detailImages?: string[];
  featured: boolean;
  createdAt: string;
}

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    descriptionEn: '',
    descriptionAr: '',
    category: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
    setInitialLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('descriptionEn', formData.descriptionEn);
    formDataToSend.append('descriptionAr', formData.descriptionAr);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('featured', formData.featured.toString());

    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    detailImageFiles.slice(0,3).forEach((file) => formDataToSend.append('detailImages', file));

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingService
        ? `/api/services/${editingService._id}`
        : '/api/services';

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
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      category: service.category || '',
      featured: service.featured,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', descriptionEn: '', descriptionAr: '', category: '', featured: false });
    setImageFile(null);
    setDetailImageFiles([]);
    setEditingService(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Services Management
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Manage your services and featured content
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Service</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-2">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <p className="text-gray-600">
              {editingService ? 'Update your service information' : 'Create a new service for your website'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="Enter service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black"
                  placeholder="e.g. Stretch Ceiling, Acoustic Panels, Lighting"
                  list="service-categories"
                />
                <datalist id="service-categories">
                  <option value="Stretch Ceiling" />
                  <option value="Printed Stretch Ceiling" />
                  <option value="Glossy Stretch Ceiling" />
                  <option value="Translucent Stretch Ceiling" />
                  <option value="Mirror Stretch Ceiling" />
                  <option value="Acoustic Panels" />
                  <option value="Wood Wool" />
                  <option value="Polyester Acoustic" />
                  <option value="Fabric Wrapped Acoustic" />
                  <option value="Fiber Optic Ceiling" />
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required={!editingService}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 mt-1">Main image appears across listings and hero sections.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Detail Images (up to 3, shown only on service detail)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setDetailImageFiles(Array.from(e.target.files || []).slice(0,3))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 mt-1">These images are only displayed on the detail page.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Description (English)
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="Describe your service in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                وصف الخدمة (Arabic)
              </label>
              <textarea
                dir="rtl"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-black"
                placeholder="اكتب وصف الخدمة بالعربية"
              />
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="featured" className="ml-3 text-sm font-medium text-gray-900">
                Featured on main page
              </label>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
              >
                {loading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialLoading && (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`svc-skel-${i}`} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
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
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              {service.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {service.descriptionEn}
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-all duration-300 font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition-all duration-300 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
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