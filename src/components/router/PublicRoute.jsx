import { useNavigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useEffect } from "react";

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Outlet />
    </>
  );
}
