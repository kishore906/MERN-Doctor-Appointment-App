import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ doctor, children }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (doctor && user?.role !== "doctor") return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
