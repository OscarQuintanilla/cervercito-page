import { useState } from "react";
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import Mosaic from "./components/Mosaic";

import categories from "./Data/Categories";
import items from "./Data/Items";
import mods from './data/Mods'

function App() {
  return (
    <div className="App font-Comfortaa">
      <NavBar />
      <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
        <Mosaic title={"Categorías de nuestros mods"} categories={categories} />
        <Gallery title={"Galería"} items={items} />
      </div>
    </div>
  );
}

export default App;
