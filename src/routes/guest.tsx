import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>;
}
