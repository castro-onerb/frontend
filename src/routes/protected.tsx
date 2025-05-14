import { Navigate, type RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends Omit<RouteProps, 'element'> {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
