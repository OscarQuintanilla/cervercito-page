import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import categories from "../data/Categories";
import { supabase } from "../../supabase/client";
import ReactQuill from "react-quill";

const ModPage = () => {
  const { modId } = useParams();
  const [mod, setMod] = useState(null);
  const [category, setCategory] = useState(null);
  const [videoSource, setVideoSource] = useState(null);

  const navigate = useNavigate();

  function identifyVideoSource(link) {
    const youtubeFilter = link.match("youtube.com");
    const tiktokFilter = link.match("tiktok.com");
    if (youtubeFilter) {
      return "youtube";
    }
    if (tiktokFilter) {
      return "tiktok";
    }
  }

  function prepareYoutubeEmbedLink(link) {
    let videoId = link.match(/v=([^&]+)/)[1];
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    let dataLink = {
      videoId: videoId,
      source: "youtube",
      embedUrl: embedUrl,
    };

    return dataLink;
  }

  function prepareTiktokEmbedLink(link) {
    let dataLinkArray = link.split("/");
    let userName = dataLinkArray[3].split("@")[1];
    let dataLink = {
      source: "tiktok",
      fulllink: link,
      user: userName,
      videoId: dataLinkArray[5],
    };

    return dataLink;
  }

  const tiktokEmbed = (dataLink) => {
    return (
      <>
        <script async src="https://www.tiktok.com/embed.js"></script>
        <div
          className="m-2"
          style={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "100%",
          }}
        >
          <iframe
            src={`https://www.tiktok.com/embed/${dataLink.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
          ></iframe>
        </div>
      </>
    );
  };

  const youtubeEmbed = (dataLink) => {
    return (
      <>
        <div className="mb-8 basis-3/4" key={dataLink.videoId}>
          <iframe
            className="m-auto"
            width="560"
            height="315"
            src={dataLink.embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </>
    );
  };

  function splitDocumentationsVideos(modData) {
    /** yt
      
     */

    const source = identifyVideoSource(modData.documentation_videos);

    // cleans the string from the form
    let documentationVideos = modData.documentation_videos.split(", ");
    documentationVideos[documentationVideos.length - 1].trim();
    if (documentationVideos[documentationVideos.length - 1].trim() === "") {
      documentationVideos.pop();
    }

    // prepares the string for the embed
    if (documentationVideos)
      documentationVideos = documentationVideos.map((video) => {
        if (source == "youtube") {
          return prepareYoutubeEmbedLink(video);
        }
        if (source == "tiktok") {
          return prepareTiktokEmbedLink(video);
        }
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
                  <h1 className="text-lg ">Descarga</h1>
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
              mod.documentation_videos.map((video) =>
                video.source == "tiktok" ? (
                  <div key={video.videoId}>{tiktokEmbed(video)}</div>
                ) : video.source == "youtube" ? (
                  <div key={video.videoId}>{youtubeEmbed(video)}</div>
                ) : (
                  <></>
                )
              )
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
