import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mods from "../data/Mods";
import categories from "../Data/Categories";

const ModPage = () => {
  const { modId } = useParams();
  const [mod, setMod] = useState(null);
  const [category, setCategory] = useState(null);

  // look for the mod in the mods array
  useEffect(() => {
    const mod = mods.find((mod) => mod.id == modId);
    setMod(mod);
  }, [modId]);

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

// mod sample data
// {
//   id: 1,

//   image: "https://picsum.photos/200/300",
//   name: "Chat Heads",
//   subtitle: "Agrega skins a los chats de Minecraft",
//   category: 1,

//   description: "Agrega skins a los chats de Minecraft",

//   videos: ["https://www.youtube.com/watch?v=1Q8fG0TtVAY"],

//   documentationLink: "https://www.google.com",
//   downloadedLink: "https://www.google.com",

//   tags: ["tag1", "tag2", "tag3"],
//   creationDate: "2021-01-01",
// },
