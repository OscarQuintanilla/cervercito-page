import modsData from "../data/Mods.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ModsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(modsData);
  }, [modsData]);

  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom text-center">
      <div className="table-fixed w-full">
        <div className="caption-top">
          <h1 className="">Mod List</h1>
        </div>
        <div className="grid grid-cols-16 align-middle max-h-12">
          <div className="border border-slate-600 flex items-center col-span-2 py-2">
            <p className="text-center w-full">Name</p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-2 py-2">
            <p className="text-center w-full">Subtitle</p>
          </div>
          <div className="border border-slate-600 flex items-center overflow-y-hidden col-span-3 py-2">
            <p className="text-center w-full">Description</p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-2 py-2">
            <p className="text-center w-full">Category</p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-1 py-2">
            <p className="text-center w-full">Image</p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-2 py-2">
            <p className="text-center w-full">Tags</p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-1 py-2">
            <p className="text-center w-full">
              <span className="material-symbols-outlined">description</span>
            </p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-1 py-2">
            <p className="text-center w-full">
              <span className="material-symbols-outlined">download</span>
            </p>
          </div>
          <div className="border border-slate-600 flex items-center col-span-2 py-2">
            <p className="text-center w-full">
              <span className="material-symbols-outlined">more_horiz</span>
            </p>
          </div>
        </div>
        {data.map((mod) => (
          <div className="grid grid-cols-16 max-h-32" key={mod.id}>
            <div className="border border-slate-600 col-span-2 flex items-center">
              <p className="text-center w-full">{mod.name}</p>
            </div>
            <div className="border border-slate-600 col-span-2 flex items-center">
              <p className="text-center w-full">{mod.subtitle}</p>
            </div>
            <div className="border border-slate-600 col-span-3 flex items-center truncate p-4">
              <p className="text-center w-full text-ellipsis overflow-hidden">
                {mod.description}
              </p>
            </div>
            <div className="border border-slate-600 col-span-2 flex items-center">
              <p className="text-center w-full">{mod.category}</p>
            </div>
            <div className="border border-slate-600 p-4 col-span-1 flex items-center">
              <Link to={mod.image} className="w-full">
                <span className="material-symbols-outlined">photo_library</span>
              </Link>
            </div>
            <div className="border border-slate-600 col-span-2 flex items-center">
              <p className="text-center w-full">{mod.tags}</p>
            </div>
            <div className="border border-slate-600 p-4 col-span-1 flex items-center">
              <Link to={mod.documentation_link} className="w-full">
                <span className="material-symbols-outlined">link</span>
              </Link>
            </div>
            <div className="border border-slate-600 p-4 col-span-1 flex items-center">
              <Link to={mod.downloaded_link} className="w-full">
                <span className="material-symbols-outlined">link</span>
              </Link>
            </div>
            <div className="border border-slate-600 py-4 col-span-2 flex items-center justify-center">
              <Link to={mod.downloaded_link} className="px-2">
                <span className="material-symbols-outlined">edit_square</span>
              </Link>
              <Link to="">
                <span className="material-symbols-outlined">delete</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModsTable;
