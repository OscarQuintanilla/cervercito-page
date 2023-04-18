import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";

function NavBar(sessionProp) {
  const [session, setSession] = useState(sessionProp);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (session.session) {
      setLoggedIn(true);
    }
  }, [session]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const loginButton = () => {
    return (
      <Link to="/login">
        <button className="font-bold">Access</button>
      </Link>
    );
  };

  const logoutButton = () => {
    return (
      <button className="font-bold" onClick={logout}>
        Logout
      </button>
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="flex justify-between p-3 m-4 mx-12 rounded-md bg-white">
      <div className="justify-start">
        <h3>Cervercito</h3>
      </div>
      <div className="flex flex-row space-x-4">
        <div>Home</div>
        <div>Gallery</div>
        <div>Map</div>
        <div>Forum</div>
      </div>
      <div>{loggedIn ? <div></div> : <div>{logoutButton()}</div>}</div>
    </div>
  );
}

export default NavBar;
