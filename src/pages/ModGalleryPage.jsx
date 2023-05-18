import ModGallery from "../components/ModGallery";
import { supabase } from "../../supabase/client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMemo } from "react";

const ModGalleryPage = () => {
  const { category } = useParams();
  const [modsArray, setModsArray] = useState([]);
  const [modTags, setModTags] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let modsData,
        categoryData = [];
      if (category == "all") {
        categoryData = [
          {
            id: 10,
            name: "Todos los mods",
            created_at: "2023-04-23T18:40:13.433989+00:00",
          },
        ];
        modsData = await supabase.from("mods").select("*");
      } else {
        categoryData = await supabase
          .from("categories")
          .select("*")
          .eq("id", category);

        modsData = await supabase
          .from("mods")
          .select("*")
          .eq("category", category);

        categoryData = categoryData.data;
      }

      let relatedTagsArray = [];

      modsData = modsData.data;

      Promise.all(
        modsData.map(async (mod) => {
          let tags = await supabase
            .from("mod_tag")
            .select("tags (name)")
            .eq("mod_id", mod.id);
          tags = tags.data;

          let tagsNameArray = tags.map((tag) => tag.tags.name);
          return tagsNameArray;
        })
      ).then((relatedTags) => {
        relatedTagsArray = relatedTags;
        modsData = modsData.map((mod, index) => {
          mod.tags = relatedTags[index];
          return mod;
        });
      });

      setModsArray(modsData);
      setCategoryName(categoryData);
    };

    getData();
  }, []);

  const data = useMemo(
    () => ({ modsArray, categoryName }),
    [modsArray, categoryName]
  );

  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom">
      <ModGallery modsData={data} />
    </div>
  );
};

export default ModGalleryPage;
