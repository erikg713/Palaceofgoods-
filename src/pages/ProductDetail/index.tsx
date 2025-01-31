// src/pages/Marketplace/index.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '../../state/store';
import { productService } from '../../services/api';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

export const Marketplace: React.FC = () => {
  const { products, setProducts } = useStore();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [setProducts]);

  const filteredProducts = products.filter(product => {
    if (filter !== 'all' && product.category !== filter) return false;
    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
