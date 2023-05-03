import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";

const ModsTable = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getModData() {
    const response = await supabase.from("mods").select();
    return response;
  }

  async function getCategoryData() {
    const response = await supabase.from("categories").select();
    return response;
  }

  async function deleteMod(id) {
    const response = await supabase.from("mods").delete().eq("id", id);
    return response;
  }

  function getModCategory(categoryId) {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return "Sin categoría";
    return category.name;
  }

  function handleDelete(id) {
    deleteMod(id).then((result) => {
      if (result.status == 204) {
        getModData().then((result) => {
          if (result.data) {
            setData(result.data);
          } else if (result.error) {
            console.log(result.error);
          }
        });
      } else if (result.error) {
        console.log(result.error);
      }
    });
  }

  useEffect(() => {
    getCategoryData().then((result) => {
      if (result.data) {
        setCategories(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });

    getModData().then((result) => {
      if (result.data) {
        setData(result.data);
      } else if (result.error) {
        console.log(result.error);
      }
    });
  }, []);

  return (
    <div className="bg-gray-100 p-8 mx-12 rounded-md">
      <div className="grid justify-items-end mb-6 ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          <Link to="/mod/register">Add new mod</Link>
        </button>
      </div>

      {/* Table Section */}
      <div className=" w-full">
        <div className="caption-top">
          <h1 className="">Mod List</h1>
        </div>
        {/* Header Section */}
        <div className="grid grid-cols-16 align-middle max-h-12 bg-gray-400">
          <div className="border border-slate-600 flex items-center col-span-2 py-2 ">
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
        {/* Data Section */}
        {data.length != 0 ? (
          data.map((mod) => (
            <div
              className="grid grid-cols-16 max-h-32 bg-gray-200"
              key={mod.id}
            >
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
                <p className="text-center w-full">
                  {getModCategory(mod.category)}
                </p>
              </div>
              <div className="border border-slate-600 p-4 col-span-1 flex items-center">
                <Link to={mod.image} className="w-full">
                  <span className="material-symbols-outlined">
                    photo_library
                  </span>
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
              <div className="border border-slate-600 py-4 col-span-2 flex items-center justify-around">
                <Link to={`/mod/${mod.id}`}>
                  <button>
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>
                </Link>
                <button>
                  <span className="material-symbols-outlined">edit_square</span>
                </button>
                <button onClick={() => handleDelete(mod.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 max-h-32 bg-gray-200">
            <div className="col-span-1 justify-center p-8">
              <p className="text-center w-full">No Mods Found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModsTable;
