import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";
import { AuthContextProvider } from "./context/authContext.jsx";

//Pages
import Home from "./pages/home.page";
import LoginPage from "./pages/login.page";
import ModPage from "./pages/mod.page";
import AdminPanel from "./pages/adminPanel.page";
import ModPanel from "./pages/modPanel.page";
import ModTable from "./pages/modTable.page";

//Components
import NavBar from "./components/NavBar";
import ModForm from "./components/mod.form";
import Logout from "./components/logout";

//Routes
import AdminRoute from "./components/router/AdminRoute";
import PublicRoute from "./components/router/PublicRoute";

function App() {
  const [session, setSession] = useState(null);
  const [location, setLocation] = useState(useLocation());

  const navigate = useNavigate();

  // OTP validation auth
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session && location.pathname != "/") {
        navigate("/session/login");
      } else {
        setSession(session);
        window.localStorage.setItem("USER_DATA", JSON.stringify(session));
        window.localStorage.setItem("LOGGED_IN", true);
      }
    });
  }, [navigate]);

  return (
    <div className="App font-Comfortaa">
      <AuthContextProvider session={session}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mod/:modId" element={<ModPage />} />
          <Route path="/session" element={<PublicRoute />}>
            <Route path="/session/login" element={<LoginPage />} />
            <Route path="/session/logout" element={<Logout />} />
          </Route>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/panel" element={<AdminPanel />} />
            <Route path="/admin/mod/panel" element={<ModPanel />} />
            <Route path="/admin/mod/list" element={<ModTable />} />
            <Route path="/admin/mod/register" element={<ModForm />} />
          </Route>
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
