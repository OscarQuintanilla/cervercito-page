import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { useAuthContext } from "../context/authContext";

function NavBar() {
  const { isAuthenticated, logout } = useAuthContext();

  const queryLogout = async () => {
    await supabase.auth.signOut();
    logout();
  };

  const loginButton = () => {
    return (
      <Link to="/session/login">
        <button
          className={` ${
            location.pathname == "/session/login" ? "hidden" : "block"
          }`}
        >
          Acceder
        </button>
      </Link>
    );
  };

  const logoutButton = () => {
    return (
      <button className="" onClick={queryLogout}>
        Cerrar Sesión
      </button>
    );
  };

  return (
    <div className="flex justify-between p-3 m-4 mx-12 rounded-md bg-white">
      <div className="justify-start">
        <h3>
          <Link to="/">Cervercito</Link>
        </h3>
      </div>
      <div className="flex flex-row space-x-4">
        <div>
          <Link to="/">Inicio</Link>{" "}
        </div>
        <div>Gallería</div>
        <div>Mapa</div>
        <div>Foro</div>
      </div>
      <div className="flex flex-row">
        <div className="mr-8">
          {isAuthenticated ? (
            <Link to="/admin/panel">
              <button>Administración</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <div>{logoutButton()}</div>
          ) : (
            <div>{loginButton()}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
