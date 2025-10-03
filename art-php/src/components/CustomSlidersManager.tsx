import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  image: string;
  category: string;
}

interface CustomSlider {
  _id: string;
  title: string;
  description: string;
  projectIds: Project[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function CustomSlidersManager() {
  const [sliders, setSliders] = useState<CustomSlider[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<CustomSlider | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectIds: [] as string[],
    order: 0
  });

  useEffect(() => {
    fetchSliders();
    fetchProjects();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await fetch('/api/custom-sliders');
      const data = await response.json();
      setSliders(data);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects/select');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSlider ? `/api/custom-sliders/${editingSlider._id}` : '/api/custom-sliders';
      const method = editingSlider ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchSliders();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Error saving slider');
      }
    } catch (error) {
      console.error('Error saving slider:', error);
      alert('Error saving slider');
    }
  };

  const handleEdit = (slider: CustomSlider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      description: slider.description,
      projectIds: slider.projectIds.map(p => p._id),
      order: slider.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;
    
    try {
      const response = await fetch(`/api/custom-sliders/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchSliders();
      } else {
        alert('Error deleting slider');
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
      alert('Error deleting slider');
    }
  };

  const toggleActive = async (slider: CustomSlider) => {
    try {
      const response = await fetch(`/api/custom-sliders/${slider._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !slider.isActive })
      });

      if (response.ok) {
        await fetchSliders();
      } else {
        alert('Error updating slider');
      }
    } catch (error) {
      console.error('Error updating slider:', error);
      alert('Error updating slider');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', projectIds: [], order: 0 });
    setEditingSlider(null);
    setShowForm(false);
  };

  const handleProjectToggle = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      projectIds: prev.projectIds.includes(projectId)
        ? prev.projectIds.filter(id => id !== projectId)
        : [...prev.projectIds, projectId]
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Custom Sliders</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Slider
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingSlider ? 'Edit Slider' : 'Create New Slider'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Projects *
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3">
                {projects.map(project => (
                  <label key={project._id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={formData.projectIds.includes(project._id)}
                      onChange={() => handleProjectToggle(project._id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <div className="font-medium text-gray-900">{project.title}</div>
                      <div className="text-sm text-gray-500">{project.category}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingSlider ? 'Update' : 'Create'} Slider
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sliders List */}
      <div className="space-y-4">
        {sliders.map(slider => (
          <div key={slider._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{slider.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    slider.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {slider.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-500">Order: {slider.order}</span>
                </div>
                
                {slider.description && (
                  <p className="text-gray-600 mb-3">{slider.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {slider.projectIds.map(project => (
                    <div key={project._id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <img src={project.image} alt={project.title} className="w-6 h-6 object-cover rounded" />
                      <span className="text-sm text-gray-700">{project.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => toggleActive(slider)}
                  className={`p-2 rounded-lg ${
                    slider.isActive 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  title={slider.isActive ? 'Deactivate' : 'Activate'}
                >
                  {slider.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                
                <button
                  onClick={() => handleEdit(slider)}
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                
                <button
                  onClick={() => handleDelete(slider._id)}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {sliders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No custom sliders created yet. Create your first slider to get started.
          </div>
        )}
      </div>
    </div>
  );
}
