// src/pages/Dashboard/index.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '../../state/store';
import { productService } from '../../services/api';
import { Product } from '../../types';

export const Dashboard: React.FC = () => {
  const { user } = useStore();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'listings' | 'sales' | 'purchases'>('listings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        const data = await productService.getUserProducts(user?.id);
        setUserProducts(data);
      } catch (error) {
        console.error('Failed to load user products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProducts();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button 
          onClick={() => navigate('/dashboard/new-listing')}
          className="btn-primary"
        >
          Create New Listing
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded ${
            activeTab === 'listings' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          My Listings
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-4 py-2 rounded ${
            activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Sales History
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`px-4 py-2 rounded ${
            activeTab === 'purchases' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Purchase History
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              showActions
            />
          ))}
        </div>
      )}
    </div>
  );
};
