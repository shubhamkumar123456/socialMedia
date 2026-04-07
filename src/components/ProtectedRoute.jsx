// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { login, isLoading } = useSelector((state) => state.auth);

//   // ⏳ WAIT until API finishes
//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   // ❌ only redirect AFTER checking
//   if (!login) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login, isLoading, user } = useSelector((state) => state.auth);

  // ⏳ wait until API completes
  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // ❌ not logged in
  if (!login) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ user अभी तक load नहीं हुआ
  if (!user?._id) {
    return <div className="text-white text-center mt-10">Preparing user...</div>;
  }

  return children;
};

export default ProtectedRoute;