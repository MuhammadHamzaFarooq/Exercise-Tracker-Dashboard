import React from "react";

const ProtectedRoutes = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
