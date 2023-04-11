const Mosaic = ({ title, categories }) => {
  return (
    <div className="flex flex-col  bg-white">
      {/* <div>
        <h1 className="text-2xl font-bold text-center my-7">{title}</h1>
      </div> */}
      <div className="flex flex-row justify-between px-3 my-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <a href="#" className="text-blue-500">
          Ver más
        </a>
      </div>
      <div className="grid grid-cols-4 gap-0 p-0 auto-cols-max">
        {categories.map((item) => (
          <div
            className="justify-center text-center aspect-square items-center w-full m-auto flex relative group"
            key={item.id}
          >
            <img
              className="blur-sm grayscale-[75%] group-hover:grayscale-0"
              src={`/categories/${item.img}`}
              alt=""
            />
            <h1 className="absolute ease-in-out duration-300 text-white drop-shadow-2xl text-md group-hover:text-xl">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mosaic;
