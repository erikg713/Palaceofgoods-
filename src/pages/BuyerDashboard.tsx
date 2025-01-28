import React from "react";
import Chat from "../components/Chat";

const BuyerDashboard: React.FC = () => {
  const roomId = "buyer-seller-123"; // Example room ID
  const userId = "buyer-1"; // Replace with authenticated user ID

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <Chat roomId={roomId} userId={userId} />
    </div>
  );
};

export default BuyerDashboard;


import React from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

const BuyerDashboard: React.FC = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
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
