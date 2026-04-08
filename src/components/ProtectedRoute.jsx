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

// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { login, isLoading, user } = useSelector((state) => state.auth);

//   // 1. If we are globally loading (fetching token or user), show loading
//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   // 2. If the check is done and we definitely aren't logged in, redirect
//   if (!login) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3. FIX: If logged in but user data is missing, we shouldn't just stay stuck.
//   // We check if user exists. If not, we show a loader while the App.js 
//   // (usually where you fetch user) does its work.
//   if (login && !user?._id) {
//     return <div className="text-white text-center mt-10">Fetching Profile...</div>;
//   }

//   return children;
// };

// export default ProtectedRoute;