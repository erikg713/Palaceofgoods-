import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../state/authStore";

const ProtectedRoute: React.FC<{ role: "buyer" | "seller" | "admin"; children: React.ReactNode }> = ({ role, children }) => {
  const { role: userRole } = useAuthStore();

  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
