import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/api.js";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/sb-portal-x7k2" replace />;
  }
  return children;
}