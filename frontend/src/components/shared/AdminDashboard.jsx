// components/routes/AdminRoute.js

import { useLoadUserQuery } from "@/store/api/authApi";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { data, isLoading } = useLoadUserQuery();

  if (isLoading) return <div>Loading...</div>;

  const user = data?.user;
  const isAdmin = user?.email === import.meta.env.VITE_EMAIL;

  return isAdmin ? children : <Navigate to="/" />;
  n;
};

export default AdminRoute;
