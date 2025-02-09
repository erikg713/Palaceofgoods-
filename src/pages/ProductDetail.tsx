import React from 'react';  
import { useParams } from 'react-router-dom';  

const products = [  
  { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/150", description: "A powerful laptop for all your needs." },  
  { id: 2, name: "Smartphone", price: 499, image: "https://via.placeholder.com/150", description: "A sleek smartphone with advanced features." },  
  { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/150", description: "High-quality headphones for immersive sound." },  
];  

const ProductDetail: React.FC = () => {  
  const { id } = useParams<{ id: string }>();  
  const product = products.find((p) => p.id === parseInt(id || ''));  

  if (!product) {  
    return <div>Product not found</div>;  
  }  

  return (  
    <div>  
      <h2>{product.name}</h2>  
      <img src={product.image} alt={product.name} />  
      <p>${product.price}</p>  
      <p>{product.description}</p>  
    </div>  
  );  
};  

export default ProductDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/api';
import { processPayment } from '../services/piNetwork';
import { useStore } from '../state/store';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProduct(id!);
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
      navigate('/login');
      return;
    }

    try {
      if (product) {
        const payment = await processPayment(
          product.price,
          `Purchase: ${product.title}`
        );
        
        if (payment.status === 'completed') {
          // Update product status in backend
          await productService.updateProduct(product.id, { 
            status: 'sold',
            buyer: user.id
          });
          
          // Show success message and redirect
          alert('Purchase successful!');
          navigate('/profile/purchases');
        }
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-cover"
        />
        <div className="p
