import React from "react";

const SellerDashboard: React.FC = () => {
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement product addition logic here
    alert("Product added!");
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <form onSubmit={handleAddProduct}>
        <input type="text" placeholder="Product Name" />
        <input type="number" placeholder="Price" />
        <textarea placeholder="Description"></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
