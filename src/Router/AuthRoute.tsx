import { selectLogin } from "@/redux/slices/LoginSlice";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectLogin);
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      to={"/login"}
      state={{
        from: location.pathname,
      }}
    />
  );
};

export default AuthRoute;
