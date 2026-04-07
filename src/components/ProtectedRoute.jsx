import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login, isLoading } = useSelector((state) => state.auth);

  // ⏳ WAIT until API finishes
  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // ❌ only redirect AFTER checking
  if (!login) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;