import { Navigate, Outlet, useLocation } from "react-router-dom";
import tokenService from "@/services/token.service";

const AUTH_ROUTES = [
  "/login",
  "/admin/forgot-password",
  "/otpforgetpassword",
  "/createnewpassword",
  "/auth/email-verification",
];

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const accessToken = tokenService.getLocalAccessToken();
  if (!accessToken && !AUTH_ROUTES.includes(pathname)) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
