import { Navigate, Outlet } from "react-router-dom";
import { useLoadUserQuery } from "@/store/api/authApi";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useLoadUserQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
