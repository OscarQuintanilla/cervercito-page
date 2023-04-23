import { Link } from "react-router-dom";

const ModPanel = () => {
  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom text-center">
      <h1 className="my-2">Mod Panel</h1>
      <div className="grid grid-cols-2 gap-6 px-36 py-2">
        <Link to="/mod/list">
          <div className="bg-blue-500 p-5 aspect-square flex flex-row">
            See All Mods List
          </div>
        </Link>
        <Link to="/mod/register">
          <div className="bg-blue-500 p-5 aspect-square flex flex-row">
            Add a mod
          </div>
        </Link>
        <div className="bg-blue-500 p-5 aspect-square"></div>
        <div className="bg-blue-500 p-5 aspect-square">---</div>
      </div>
    </div>
  );
};

export default ModPanel;
