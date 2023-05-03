import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import categories from "../data/Categories";
import { supabase } from "../../supabase/client";
import ReactQuill from "react-quill";

const ModPage = () => {
  const { modId } = useParams();
  const [mod, setMod] = useState(null);
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();

  function splitDocumentationsVideos(modData) {
    let documentationVideos = modData.documentation_videos.split(", ");
    documentationVideos[documentationVideos.length - 1].trim();
    if (documentationVideos[documentationVideos.length - 1].trim() === "") {
      documentationVideos.pop();
    }

    if (documentationVideos)
      documentationVideos = documentationVideos.map((video) => {
        let videoId = video.match(/v=([^&]+)/)[1];
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return embedUrl;
      });

    return documentationVideos;
  }

  useEffect(() => {
    async function getModbyId() {
      const response = await supabase.from("mods").select().eq("id", modId);
      if (response.data[0]) {
        response.data[0].documentation_videos = splitDocumentationsVideos(
          response.data[0]
        );

        setMod(response.data[0]);
      }
    }

    getModbyId();
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
        <div className="bg-white px-8 mx-12 rounded-md py-12">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col my-0 basis-1/2 px-8">
              <div className="flex flex-col mb-2 mt-3">
                <div className="mb-0">
                  <h1 className="text-3xl">{mod.name}</h1>
                  <hr />
                  <h2 className="mt-2 text-xl">{mod.subtitle}</h2>
                  <h3 className="text-gray-400 text-sm">{category.name}</h3>
                </div>
              </div>
              <ReactQuill
                value={mod.description || "No Description"}
                readOnly={true}
                theme={"bubble"}
                className="m-0 p-0 text-4xl"
              />
            </div>
            <div className="flex flex-col my-0 basis-1/3 px-4 border-l mb-2 border-gray-200">
              <div className="flex">
                <img src={mod.image} alt={mod.name} className="" />
              </div>
              <div className="mb-8 mt-4">
                <div className="flex flex-col">
                  <h1 className="text-lg">Documentación</h1>
                  <Link to={mod.documentation_link}>
                    <p className="text-xs text-gray-500">
                      {mod.documentation_link}
                    </p>
                  </Link>
                  <hr className="my-2" />
                  <h1 className="text-lg ">Download</h1>
                  <Link to={mod.downloaded_link}>
                    <p className="text-xs text-gray-500">
                      {mod.documentation_link}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-3/4 m-auto">
            <hr />
            {mod.documentation_videos ? (
              mod.documentation_videos.map((video) => (
                <div className="mb-8 basis-3/4" key={video}>
                  <h1 className="my-4">Video Documentation</h1>
                  <iframe
                    className="m-auto"
                    width="560"
                    height="315"
                    src={video}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModPage;
