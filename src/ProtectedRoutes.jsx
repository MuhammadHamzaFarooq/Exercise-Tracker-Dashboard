import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
