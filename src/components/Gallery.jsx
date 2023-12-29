const Gallery = ({ title, items }) => {
  return (
    <div className="flex flex-col flex-wrap bg-white">
      <div className="flex flex-row justify-between px-3 my-4">
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <div className="relative w-full ">
            <input
              type="text"
              className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.35 10H12a6 6 0 1 0-4.9 6.9 1 1 0 0 0 1.4-1.42 4 4 0 1 1 2.72-2.72 1 1 0 0 0-.4-1.9v-.35a6 6 0 0 0 2-4.9 1 1 0 0 0-2 0 4 4 0 0 1-2.82 3.82 1 1 0 1 0 .8 1.87A6 6 0 0 0 12 10.35V11a1 1 0 0 0 2 0v-.65a6 6 0 0 0 2-4.9 1 1 0 0 0-2 0 4 4 0 0 1-2.82 3.82 1 1 0 1 0 .8 1.87A6 6 0 0 0 12.35 10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row overflow-x-auto">
        {items.map((item) => (
          <div key={item.id} className="flex-none p-2 w-1/6 overflow-clip">
            <div className="rounded overflow-hidden ">
              <div className="rounded overflow-hidden shadow-lg aspect-square max-w-fit">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full"
                />
              </div>
              <div className="px-6 py-4 shadow-lg">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
