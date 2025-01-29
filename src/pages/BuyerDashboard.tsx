import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';

const BuyerDashboard: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
