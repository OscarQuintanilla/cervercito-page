import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";

export default function AdminRoute() {
  const { isAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/session/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
