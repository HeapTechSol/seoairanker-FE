import { useAppSelector } from "@/api/store";
import { EXACT_ROUTES } from "@/constant/routes";
import { Navigate } from "react-router-dom";

const { LOGIN } = EXACT_ROUTES;

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode | JSX.Element;
}) => {
  
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user?.access_token
  );

  return isAuthenticated ? children : <Navigate to={LOGIN} />;
};

export default ProtectedRoute;
