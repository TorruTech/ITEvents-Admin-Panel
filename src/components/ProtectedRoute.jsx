import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  if (!adminUser || adminUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;



