import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ModGallery = (modsData) => {
  const { categoryName, modsArray } = modsData.modsData;
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="">
      <h2>{categoryName[0] ? categoryName[0].name : <></>}</h2>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Buscar mod"
          value={searchValue}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-6 gap-6 p-2 auto-cols-max">
        {modsArray
          .filter(
            (mod) =>
              mod.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              mod.subtitle.toLowerCase().includes(searchValue.toLowerCase()) ||
              mod.tags.some((tag) =>
                tag.toLowerCase().includes(searchValue.toLowerCase())
              )
          )
          .map((mod) => (
            <Link to={`/mod/${mod.id}`} key={mod.id}>
              <div
                className="justify-center text-center aspect-square items-center w-full my-5 flex relative group outline outline-offset-0 outline-8 outline-gold-600 rounded-sm"
                key={mod.id}
              >
                <img
                  className="group-hover:grayscale-0 object-fill h-full w-full"
                  src={`${mod.image}`}
                  alt={mod.name}
                />
                <div className="absolute bg-slate-800/50 w-full h-full group-hover:bg-slate-900/80"></div>
                <div className="absolute ease-in-out duration-300 text-white drop-shadow-2xl text-md group-hover:text-lg">
                  <h3>{mod.name}</h3>
                  <p>{mod.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ModGallery;

//modsArray example
// [
//   {
//       "id": 90,
//       "name": "Chat Heads",
//       "subtitle": "Agrega skins a los chats de Minecraft",
//       "description": "<p>Agrega la skin de la persona que envia el mensaje al chat, permitiendo identificar más rápidamente al remitente.</p>",
//       "category": 1,
//       "image": "https://raw.githubusercontent.com/dzwdz/chat_heads/main/assets/chat_head-example01.webp",
//       "documentation_link": "https://www.curseforge.com/minecraft/mc-mods/chat-heads",
//       "downloaded_link": "https://www.curseforge.com/minecraft/mc-mods/chat-heads",
//       "created_at": "2023-05-02T16:09:24.402156+00:00",
//       "documentation_videos": "https://www.youtube.com/watch?v=vxcaGNTTlSo",
//       "tags": [
//           "chat",
//           "skins",
//           "mensajes",
//           "cara",
//           "comunicacion",
//           "interfaz de usuario"
//       ]
//   },
//   {
//       "id": 94,
//       "name": "Better Third Person",
//       "subtitle": "Mejora la vista en tercera persona",
//       "description": "<p>Agrega la <strong>rotación libre</strong> de la cámara en <strong>tercera persona</strong></p><p>Este mod es del lado del cliente.</p><ul><li>Rota la cámara 360 grados</li><li>Camina en todas direcciones sin tener que cambiar la oritentación de la cámara</li><li>Puede poner, romper y usar bloques estando en tercera persona</li><li>Libertad en la cámara cuando te mueves</li><li>Soporte para vehículos (caballos y cerdos), nadar y usar elytras</li></ul>",
//       "category": 1,
//       "image": "https://media.forgecdn.net/avatars/392/806/637587416534783614.png",
//       "documentation_link": "https://www.curseforge.com/minecraft/mc-mods/better-third-person",
//       "downloaded_link": "https://www.curseforge.com/minecraft/mc-mods/better-third-person",
//       "created_at": "2023-05-10T18:22:54.437355+00:00",
//       "documentation_videos": "https://www.youtube.com/watch?v=CEphmIioblk",
//       "tags": [
//           "Tercera persona",
//           "third person",
//           "vista",
//           "3D"
//       ]
//   }
// ]
