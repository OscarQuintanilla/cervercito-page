//Data
import items from "../data/Items";

//Components
import Gallery from "../components/Gallery";
import Mosaic from "../components/Mosaic";
import { supabase } from "../../supabase/client";
import { useEffect, useState } from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [ammountOfMods, setAmmountOfMods] = useState(0);

  const getModCount = async () => {
    const response = await supabase
      .from("mods")
      .select("*", { count: "exact", head: true });
    return response.count;
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      return categories;
    };

    Promise.all([getCategories()]).then((values) => {
      setCategories(values[0]);
    });

    getModCount().then((result) => {
      setAmmountOfMods(result);
    });
  }, []);

  return (
    <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
      <Mosaic
        title={"Categorías"}
        categories={categories}
        ammountOfMods={ammountOfMods}
      />
      <Gallery title={"Galería"} items={items} />
    </div>
  );
};

export default Home;
