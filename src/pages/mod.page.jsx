import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import categories from "../data/Categories";
import { supabase } from "../../supabase/client";

const ModPage = () => {
  const { modId } = useParams();
  const [mod, setMod] = useState(null);
  const [category, setCategory] = useState(null);

  async function getModbyId() {
    const response = await supabase.from("mods").select().eq("id", modId);
    return response;
  }

  useEffect(() => {
    getModbyId().then((result) => {
      if (result.data) {
        setMod(result.data[0]);
      } else if (result.error) {
        console.log(result.error);
      }
    });
  }, []);

  useEffect(() => {
    try {
      setCategory(categories.find((category) => category.id == mod.category));
    } catch (error) {
      setCategory("No category found");
    }
  }, [mod]);

  return (
    <>
      {!mod ? (
        <div>
          <div className="bg-white p-8 mx-12 rounded-md">
            <h1>Mod no encontrado</h1>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white px-8 mx-12 rounded-md py-12">
            <div className="flex flex-col my-0">
              <div className="flex flex-row">
                <div className="flex basis-1/2">
                  <img src={mod.image} alt={mod.name} className="" />
                </div>
              </div>
              <div className="flex flex-col mb-8 mt-3">
                <div className=" mb-4">
                  <h1>{mod.name}</h1>
                  <h2>{mod.subtitle}</h2>
                  <h3>{category.name}</h3>
                </div>
                <div className="w-full">
                  <p>{mod.description}</p>
                </div>
              </div>
              <div className="mb-8">
                <h1>Videos</h1>
                // create a component to display youtube and tiktok videos using
                their embed links
              </div>
              <div className="mb-8">
                <h1>Documentación</h1>
                <div className="flex flex-col">
                  <a href={mod.documentationLink}>{mod.documentationLink} </a>
                  <a href={mod.downloadedLink}>{mod.downloadedLink} </a>
                </div>
              </div>
              <div className="mb-8">
                <h1>Comentarios</h1>
                <h1>Work in progress..</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModPage;
