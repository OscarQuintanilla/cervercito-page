function NavBar() {
  return (
    <div className="flex justify-around p-3 m-4 mx-12 rounded-md bg-white">
      <div className="justify-start">
        <h3>Cervercito</h3>
      </div>
      <div className="flex">
        <div className="flex flex-row justify-evenly space-x-4">
          <div>Home</div>
          <div>Gallery</div>
          <div>Map</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
