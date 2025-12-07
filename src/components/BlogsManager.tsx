import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Image as ImageIcon, X, RefreshCw } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  featured: boolean;
  createdAt: string;
}

export function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [regeneratingLinks, setRegeneratingLinks] = useState(false);
  const [regenerateMessage, setRegenerateMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setInitialLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('excerpt', formData.excerpt);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('featured', String(Boolean(formData.featured)));

    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    // Append gallery images
    galleryFiles.forEach((file, index) => {
      formDataToSend.append(`gallery`, file);
    });
    
    // Append existing gallery previews (for editing)
    // Send all previews as existingGallery array
    if (galleryPreviews.length > 0) {
      galleryPreviews.forEach((preview) => {
        // Only send if it's a data URL (new upload) or existing URL
        if (preview && (preview.startsWith('data:') || preview.startsWith('http') || preview.startsWith('/'))) {
          formDataToSend.append('existingGallery', preview);
        }
      });
    }

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBlog
        ? `/api/blogs/${editingBlog._id}`
        : '/api/blogs';

      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        fetchBlogs();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      featured: Boolean(blog.featured),
    });
    // Load existing gallery images if any
    if ((blog as any).gallery && Array.isArray((blog as any).gallery)) {
      setGalleryPreviews((blog as any).gallery);
    } else {
      setGalleryPreviews([]);
    }
    setGalleryFiles([]);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', author: '', featured: false });
    setImageFile(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    files.forEach((file) => {
      newFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          setGalleryFiles([...galleryFiles, ...newFiles]);
          setGalleryPreviews([...galleryPreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    const newFiles = galleryFiles.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryFiles(newFiles);
    setGalleryPreviews(newPreviews);
  };

  const insertGalleryPlaceholder = (galleryIndex: number) => {
    const placeholder = `\n\n[GALLERY:${galleryIndex}]\n\n`;
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        formData.content.substring(0, start) +
        placeholder +
        formData.content.substring(end);
      setFormData({ ...formData, content: newContent });

      // Set cursor position after the placeholder
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + placeholder.length, start + placeholder.length);
      }, 0);
    } else {
      // Fallback: just append to content
      setFormData({ ...formData, content: formData.content + placeholder });
    }
  };

  const handleRegenerateLinks = async () => {
    if (!confirm('This will regenerate internal links for ALL blogs based on your current link mappings. Continue?')) {
      return;
    }

    setRegeneratingLinks(true);
    setRegenerateMessage(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/blogs/regenerate-links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRegenerateMessage(`✅ ${data.message}`);
        // Refresh the blogs list
        fetchBlogs();
      } else {
        setRegenerateMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error regenerating links:', error);
      setRegenerateMessage('❌ Failed to regenerate internal links. Please try again.');
    } finally {
      setRegeneratingLinks(false);
      // Clear message after 5 seconds
      setTimeout(() => setRegenerateMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
          Blogs Management
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Manage your blog posts and articles
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New Blog</span>
          </button>
          <button
            onClick={handleRegenerateLinks}
            disabled={regeneratingLinks}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${regeneratingLinks ? 'animate-spin' : ''}`} />
            <span className="font-medium">
              {regeneratingLinks ? 'Regenerating...' : 'Regenerate Internal Links'}
            </span>
          </button>
        </div>
        {regenerateMessage && (
          <div className={`mt-4 p-4 rounded-lg ${regenerateMessage.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {regenerateMessage}
          </div>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium mb-4">
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
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
                Excerpt
              </label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                placeholder="Brief description for preview"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use the gallery section below to insert gallery placeholders in your content
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required={!editingBlog}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black mb-3"
              />
              
              {galleryPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Gallery Images ({galleryPreviews.length})
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertGalleryPlaceholder(index)}
                          className="absolute bottom-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                          title="Insert gallery at cursor position"
                        >
                          <ImageIcon className="w-3 h-3" />
                          Insert
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click "Insert" on an image to add [GALLERY:X] placeholder at cursor position in content
                  </p>
                </div>
              )}
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
                {loading ? 'Saving...' : editingBlog ? 'Update' : 'Create'}
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
        {initialLoading && (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`blog-skel-${i}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))
        )}
        {!initialLoading && blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                {blog.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
              <p className="text-orange-600 text-sm font-medium mb-2">By {blog.author}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
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