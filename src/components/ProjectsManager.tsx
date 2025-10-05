import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Project {
  _id: string;
  title?: string; // For backward compatibility
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  detailImages?: string[];
  category: string;
  featured: boolean;
  createdAt: string;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    category: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/projects/categories');
      const categories = await response.json();
      setCategories(Array.isArray(categories) ? categories : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('titleEn', formData.titleEn);
    formDataToSend.append('titleAr', formData.titleAr);
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
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';

      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        fetchProjects();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      titleEn: project.titleEn || project.title || '',
      titleAr: project.titleAr || project.title || '',
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      category: project.category,
      featured: project.featured,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', category: '', featured: false });
    setImageFile(null);
    setDetailImageFiles([]);
    setEditingProject(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Projects Management
        </h2>
        <p className="text-gray-600 text-base lg:text-lg mb-6 lg:mb-8 px-4">
          Manage your projects and portfolio
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 lg:px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="font-medium">Add New Project</span>
        </button>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={resetForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg lg:text-xl font-medium mb-2">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <h3 className="text-lg lg:text-xl font-medium mb-2 text-gray-600" dir="rtl">
              {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title (English)
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder="Enter project title in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان المشروع (Arabic)
              </label>
              <input
                type="text"
                dir="rtl"
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder="أدخل عنوان المشروع بالعربية"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (English)
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف (Arabic)
              </label>
              <textarea
                dir="rtl"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required={!editingProject}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Main image appears across listings and hero sections.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detail Images (up to 3, shown only on project detail)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setDetailImageFiles(Array.from(e.target.files || []).slice(0,3))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
              <p className="text-xs text-gray-500 mt-1">These images are only displayed on the project detail page.</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900">
                Featured on main page
              </label>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
              >
                {loading ? 'Saving...' : editingProject ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </form>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <img
              src={project.image}
              alt={project.titleEn || project.title}
              className="w-full h-40 lg:h-48 object-cover"
            />
            <div className="p-3 lg:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base lg:text-lg font-medium text-gray-900 line-clamp-1">{project.titleEn || project.title}</h3>
                {project.featured && (
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500 fill-current flex-shrink-0" />
                )}
              </div>
              <p className="text-orange-600 text-xs lg:text-sm font-medium mb-2">{project.category}</p>
              <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2 lg:line-clamp-3">
                {project.descriptionEn}
              </p>
              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-800 text-xs lg:text-sm py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                >
                  <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center justify-center space-x-1 text-red-600 hover:text-red-800 text-xs lg:text-sm py-1 px-2 rounded hover:bg-red-50 transition-colors"
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