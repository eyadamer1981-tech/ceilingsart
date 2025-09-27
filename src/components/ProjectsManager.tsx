import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
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
    title: '',
    descriptionEn: '',
    descriptionAr: '',
    category: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
    fetch('/api/projects/categories')
      .then((r) => r.json())
      .then((cats) => setCategories(Array.isArray(cats) ? cats : []))
      .catch(() => { setCategories([]); });
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
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
      title: project.title,
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      category: project.category,
      featured: project.featured,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', descriptionEn: '', descriptionAr: '', category: '', featured: false });
    setImageFile(null);
    setDetailImageFiles([]);
    setEditingProject(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Projects Management
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Manage your projects and portfolio
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Project</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
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

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingProject ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                {project.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
              <p className="text-orange-600 text-sm font-medium mb-2">{project.category}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.descriptionEn}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
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