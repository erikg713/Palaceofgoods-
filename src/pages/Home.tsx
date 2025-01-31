// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../state/store';
import { productService } from '../services/api';

export const Home: React.FC = () => {
  const { products, setProducts } = useStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, [setProducts]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
