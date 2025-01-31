// src/pages/Dashboard/NewListing.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { toast } from 'react-toastify';

export const NewListing: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'new',
    images: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((image: File) => {
            formDataToSend.append('images', image);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      await productService.createProduct(formDataToSend);
      toast.success('Product listed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded px-4 py-2 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price (π)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border rounded px-4 py-2"
            required
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Condition</label>
          <select
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'new' | 'used' })}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <input
            type="file"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setFormData({ ...formData, images: files });
            }}
            className="w-full border rounded px-4 py-2"
            multiple
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Creating Listing...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};
