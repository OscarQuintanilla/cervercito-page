import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";

export default function AdminRoute() {
  const { isAuthenticated } = useAuthContext();
  console.log("AdminRoute", isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("AdminRoute", isAuthenticated);
      navigate("/session/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
