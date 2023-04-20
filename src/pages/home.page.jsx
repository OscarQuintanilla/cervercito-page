//Data
import categories from "../data/Categories";
import items from "../data/Items";

//Components
import Gallery from "../components/Gallery";
import Mosaic from "../components/Mosaic";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
      <Mosaic title={"Categorías de nuestros mods"} categories={categories} />
      <Gallery title={"Galería"} items={items} />
    </div>
  );
};

export default Home;
