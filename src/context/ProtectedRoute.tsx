import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: number[];
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Not logged in

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Unauthorized
  }

  return children;
};

export default ProtectedRoute;
