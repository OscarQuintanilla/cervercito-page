import { Link } from "react-router-dom";

const ModPanel = () => {
  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom text-center">
      <h1 className="my-2">Mod Panel</h1>
      <div className="grid grid-cols-2 gap-6 px-36 py-2">
        <Link to="/mod/list">
          <div className="bg-gray-200 p-5 aspect-square flex flex-row justify-center items-center border-8 border-gray-400 rounded-md hover:bg-gray-300">
            <p className="text-center">See All Mods List</p>
          </div>
        </Link>
        <Link to="/mod/register">
          <div className="bg-gray-200 p-5 aspect-square flex flex-row justify-center items-center border-8 border-gray-400 rounded-md hover:bg-gray-300">
            <p className="text-center">Add a Mod</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ModPanel;
