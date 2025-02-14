import React from "react";
import { createPiPayment } from "../services/piPayments";

const Marketplace = () => {
  const handlePurchase = async () => {
    const payment = await createPiPayment(10, "Buying a product");
    if (payment) {
      alert("Payment started. Check Pi Browser to approve.");
    }
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <button onClick={handlePurchase}>Pay with Pi</button>
    </div>
  );
};

export default Marketplace;
