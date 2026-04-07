// src/components/PublicRoute.jsx

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { login } = useSelector((state) => state.auth);

  if (login) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;