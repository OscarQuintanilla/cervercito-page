import { Link } from "react-router-dom";

const adminPanel = () => {
  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom text-center">
      <h1 className="my-2">Admin Panel</h1>
      <div className="grid grid-cols-1 gap-6 px-36 py-2">
        *Shows a Mod Stadistic with an animation*
      </div>
      <div className="grid grid-cols-3 gap-6 px-36 py-2">
        <Link to="/admin/mod/panel">
          <div className="bg-gray-200 p-5 aspect-square flex flex-row justify-center items-center border-8 border-gray-400 rounded-md hover:bg-gray-300">
            Mods Panel
          </div>
        </Link>
        <div className="bg-gray-200 p-5 aspect-square flex flex-row justify-center items-center border-8 border-gray-400 rounded-md hover:bg-gray-300">
          Forum
        </div>
        <div className="bg-gray-200 p-5 aspect-square flex flex-row justify-center items-center border-8 border-gray-400 rounded-md hover:bg-gray-300">
          Screenshots
        </div>
      </div>
    </div>
  );
};

export default adminPanel;
