import React from 'react';

export default function UploadImageExample() {
  const [file, setFile] = React.useState<File | null>(null);
  const [imageId, setImageId] = React.useState<string>('');
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (res.ok && data?.id) setImageId(data.id);
      else alert(data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Upload Image (GridFS)</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full" />
        <button type="submit" disabled={!file || uploading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {imageId && (
        <div className="mt-6">
          <div className="text-sm text-gray-600 mb-2">Image ID: {imageId}</div>
          <img src={`/api/images/${imageId}`} alt="Uploaded" className="w-full h-auto rounded" />
        </div>
      )}
    </div>
  );
}






