import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../state/store';
import { productService } from '../services/api';
import { CircularProgress, Alert } from '@mui/material'; // Import MUI components

const Home: React.FC = () => {
  const { products, setProducts } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error: any) { // Type the error
        console.error('Failed to load products:', error);
        setError(error.message || 'Failed to load products.'); // Set the error message
      } finally {
        setLoading(false); // Set loading to false after fetching, regardless of success/failure
      }
    };

    loadProducts();
  }, [setProducts]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>; // Display loading indicator
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>; // Display error message
  }

  return (
    <div className="container mx-auto px-4 py-8"> {/* Added container for better layout */}
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Added more responsive breakpoints */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
