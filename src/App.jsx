import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";

//Pages
import Home from "./pages/home.page";
import LoginPage from "./pages/login.page";
import ModPage from "./pages/mod.page";
import AdminPanel from "./pages/adminPanel.page";

//Components
import NavBar from "./components/NavBar";
import ModForm from "./components/mod.form";

function App() {
  const [session, setSession] = useState(null);
  const [location, setLocation] = useState(useLocation());

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session && location.pathname != "/") {
        navigate("/login");
      } else {
        setSession(session);
      }
    });
  }, [navigate]);

  return (
    <div className="App font-Comfortaa">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mod/:modId" element={<ModPage />} />
        <Route path="/mod/register" element={<ModForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
