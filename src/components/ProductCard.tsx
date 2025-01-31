// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.images[0]} 
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600">{product.price} π</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-500">{product.condition}</span>
        <Link 
          to={`/product/${product.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
