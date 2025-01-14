import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLogin } from "@/redux/slices/LoginSlice";

type LoginAuthRouteProps = {
  children: React.ReactNode;
};

const LoginAuthRoute: React.FC<LoginAuthRouteProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectLogin);

  // Get the previous route from window history
  const from = location.state?.from || "/";

  return isLoggedIn ? <Navigate to={from} replace /> : <>{children}</>;
};

export default LoginAuthRoute;
