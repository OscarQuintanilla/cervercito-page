const adminPanel = () => {
  return (
    <div className="bg-white p-8 mx-12 rounded-md align-bottom text-center">
      <h1 className="my-2">Admin Panel</h1>
      <div className="grid grid-cols-2 gap-6 px-36 py-2">
        <div className="bg-blue-500 p-5 aspect-square flex flex-row">
          *Show Mod Stats*
        </div>
        <div className="bg-blue-500 p-5 aspect-square flex flex-row">
          Mods Panel
        </div>
        <div className="bg-blue-500 p-5 aspect-square">Forum</div>
        <div className="bg-blue-500 p-5 aspect-square">Screenshots</div>
      </div>
    </div>
  );
};

export default adminPanel;
