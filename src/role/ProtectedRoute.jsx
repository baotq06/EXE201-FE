import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PUBLIC_ROUTES, ROUTE_PERMISSIONS } from "./roles";
import AccessDenied from "../pages/accessDenied/AccessDenied";

const ProtectedRoute = ({ children, userRole }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Kiểm tra nếu là route công khai
  if (PUBLIC_ROUTES.includes(currentPath)) {
    return children;
  }

  // Kiểm tra đăng nhập
  if (!userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền truy cập
  const matchingRoute = Object.keys(ROUTE_PERMISSIONS).find((route) => {
    const routePattern = new RegExp(
      "^" + route.replace(/:[^/]+/g, "[^/]+") + "$"
    );
    return routePattern.test(currentPath);
  });

  if (!matchingRoute || !ROUTE_PERMISSIONS[matchingRoute].includes(userRole)) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
