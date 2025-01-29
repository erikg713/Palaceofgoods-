import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { showSuccess } from "../utils/notifications";

interface Order {
  id: string;
  status: string;
}

const socket = io("http://localhost:3002");

const OrderTracking: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    socket.on("orderUpdate", (data) => {
      setOrders((prev) =>
        prev.map((order) => (order.id === data.id ? { ...order, status: data.status } : order))
      );
      showSuccess(`Order ${data.id} updated to ${data.status}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Order Tracking</h2>
      {orders.map((order) => (
        <p key={order.id}>
          Order ID: {order.id} - Status: <strong>{order.status}</strong>
        </p>
      ))}
    </div>
  );
};

export default OrderTracking;
