import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("access");
  console.log(token);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
