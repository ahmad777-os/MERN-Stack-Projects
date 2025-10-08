import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a role is specified, check it
  if (role && user.role !== role) {
    return <h2>⛔ Access Denied</h2>;
  }

  return children;
}

export default ProtectedRoute;
