import React from "react";

const PiPaymentButton: React.FC = () => {
  const handlePayment = () => {
    // Call Pi SDK to handle payment
    alert("Payment initiated");
  };

  return <button onClick={handlePayment}>Pay with Pi</button>;
};

export default PiPaymentButton;
