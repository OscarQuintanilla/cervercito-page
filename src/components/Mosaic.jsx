import { Link } from "react-router-dom";

const Mosaic = ({ title, categories, ammountOfMods }) => {
  return (
    <div className="flex flex-col  bg-white">
      <div className="flex flex-row justify-between px-3 my-4">
        <h2 className=" ">{title}</h2>
        <Link to="/mod/gallery/all">
          <h3 className="underline">Ver todos los mods ({ammountOfMods})</h3>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-6 p-0 auto-cols-max">
        {categories.map((item) => (
          <Link to={`/mod/gallery/${item.id}`} key={item.id}>
            <div
              className="justify-center text-center aspect-square items-center w-full m-auto flex relative group outline outline-offset-0 outline-8 outline-gray-800"
              key={item.id}
            >
              <img
                className="blur-sm grayscale-[75%] group-hover:grayscale-0"
                src={`/categories/${item.img}`}
                alt=""
              />
              <h3 className="absolute ease-in-out duration-300 text-white drop-shadow-2xl text-md group-hover:text-xl">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mosaic;
