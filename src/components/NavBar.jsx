import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/client";

function NavBar() {
  const [session, setSession] = useState(null);
  const [location, setLocation] = useState(useLocation());

  useEffect(() => {
    verifySession();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const verifySession = async () => {
    const response = await supabase.auth.getSession();
    if (response.data.session) {
      setSession(response.data.session);
    }
  };

  const loginButton = () => {
    return (
      <Link to="/login">
        <button
          className={` ${location.pathname == "/login" ? "hidden" : "block"}`}
        >
          Access
        </button>
      </Link>
    );
  };

  const logoutButton = () => {
    return (
      <button className="" onClick={logout}>
        Logout
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
          <Link to="/">Home</Link>{" "}
        </div>
        <div>Gallery</div>
        <div>Map</div>
        <div>Forum</div>
      </div>
      <div className="flex flex-row">
        <div className="mr-8">{session ? session.user.email : <></>}</div>
        <div>
          {session ? <div>{logoutButton()}</div> : <div>{loginButton()}</div>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
