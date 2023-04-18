import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

//Pages
import LoginPage from "./pages/login.page";
import ModPage from "./pages/mod.page";

//Components
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import Mosaic from "./components/Mosaic";

//Data
import categories from "./Data/Categories";
import items from "./Data/Items";
import { useEffect } from "react";

const Home = () => (
  <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
    <Mosaic title={"Categorías de nuestros mods"} categories={categories} />
    <Gallery title={"Galería"} items={items} />
  </div>
);

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
        setSession(session);
      }
    });
  }, []);

  return (
    <div className="App font-Comfortaa">
      <NavBar session={session} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mod/:modId" element={<ModPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
