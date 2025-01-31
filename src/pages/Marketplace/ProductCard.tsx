
// src/pages/Marketplace/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.images[0]} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">{product.price} π</span>
          <Link 
            to={`/product/${product.id}`}
            className="btn-secondary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
