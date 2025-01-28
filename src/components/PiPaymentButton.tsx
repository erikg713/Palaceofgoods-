import React from "react";
import axios from "axios";

const PiPaymentButton: React.FC<{ amount: number }> = ({ amount }) => {
  const handlePayment = async () => {
    try {
      const paymentId = "dummy-payment-id"; // Replace with actual payment ID from Pi SDK
      const response = await axios.post("/api/verify-payment", {
        paymentId,
        amount,
      });

      alert(response.data);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return <button onClick={handlePayment}>Pay {amount} Pi</button>;
};

export default PiPaymentButton;
