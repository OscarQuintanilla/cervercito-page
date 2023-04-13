import { Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

//Components
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import Mosaic from "./components/Mosaic";

//Data
import categories from "./Data/Categories";
import items from "./Data/Items";
import ModPage from "./pages/mod.page";

const Home = () => (
  <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
    <Mosaic title={"Categorías de nuestros mods"} categories={categories} />
    <Gallery title={"Galería"} items={items} />
  </div>
);

function App() {
  // Supabase call example
  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }

  return (
    <div className="App font-Comfortaa">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mod/:modId" element={<ModPage />} />
      </Routes>
    </div>
  );
}

export default App;
