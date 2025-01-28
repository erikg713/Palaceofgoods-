import { trackEvent } from "../utils/analytics";

const handleViewDetails = () => {
  trackEvent("Product", "View Details", product.name);
};

import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Buy</button>
    </div>
  );
};

export default ProductCard;
