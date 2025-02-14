import React from 'react';  
import ProductCard from '../components/ProductCard';  

const products = [  
  { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/150" },  
  { id: 2, name: "Smartphone", price: 499, image: "https://via.placeholder.com/150" },  
  { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/150" },  
];  

const ProductList: React.FC = () => {  
  return (  
    <div>  
      <h2>Our Products</h2>  
      <div className="product-list">  
        {products.map((product) => (  
          <ProductCard key={product.id} product={product} />  
        ))}  
      </div>  
    </div>  
  );  
};  

export default ProductList;
