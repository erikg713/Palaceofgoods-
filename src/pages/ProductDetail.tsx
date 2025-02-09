import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/api';
import { processPayment } from '../services/piNetwork';
import { useStore } from '../state/store';
import { CircularProgress, Alert, Button } from '@mui/material'; // Import MUI components

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProduct(id!);
        setProduct(data);
      } catch (error: any) {
        console.error('Failed to load product:', error);
        setError(error.message || 'Failed to load product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handlePurchase = async () => {
     if (!user) {
       navigate('/login');
       return;
     }
    try {
      if (product) {
        const payment = await processPayment(product.price, `Purchase: ${product.title}`);
        if (payment.status === 'completed') {
          await productService.updateProduct(product.id, { status: 'sold', buyer: user.id });
          alert('Purchase successful!');
          navigate('/profile/purchases');
        } else {
          alert('Payment was not completed. Please try again.'); // More specific message
        }
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4"> {/* Added padding */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={product.images[0]} alt={product.title} className="w-full h-96 object-cover" />
        <div className="p-6"> {/* Added padding */}
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price}</p>
          <Button variant="contained" color="primary" onClick={handlePurchase} disabled={!user}> {/* MUI Button */}
            {user ? 'Purchase' : 'Connect Wallet to Purchase'}
          </Button>
        </div>
      </div>
    </div>
  );
};
