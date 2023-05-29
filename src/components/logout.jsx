import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  logout();
  navigate("/");
};
export default Logout;
