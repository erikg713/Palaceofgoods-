// src/pages/ProductDetail/index.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../state/store';
import { productService } from '../../services/api';
import { connectWallet } from '../../utils/piNetwork';
import { Product } from '../../types';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handlePurchase = async () => {
    if (!user) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        return;
      }
    }

    // TODO: Implement purchase logic with Pi Network
    console.log('Purchasing product:', product?.id);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-w-1 aspect-h-1">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.slice(1).map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`${product.title} ${index + 2}`}
                className="w-full aspect-square object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          
          <div className="mt-8">
            <div className="text-2xl font-bold">{product.price} π</div>
            <div className="mt-2 text-gray-600">
              Condition: {product.condition}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handlePurchase}
              className="w-full btn-primary"
            >
              {user ? 'Purchase with Pi' : 'Connect Wallet to Purchase'}
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            <div className="flex items-center gap-4 mt-4">
              <img 
                src={product.seller.avatar || '/default-avatar.png'}
                alt={product.seller.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">{product.seller.username}</div>
                <div className="text-gray-600">Member since {new Date(product.createdAt).getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
