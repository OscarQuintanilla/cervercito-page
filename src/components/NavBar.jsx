function NavBar() {
  return (
    <div className="flex justify-between p-3 m-4 mx-12 rounded-md bg-white">
      <div className="justify-start">
        <h3>Cervercito</h3>
      </div>
      <div className="flex flex-row space-x-4">
          <div>Home</div>
          <div>Gallery</div>
          <div>Map</div>
          <div>Foro</div>
      </div>
    </div>
  );
}

export default NavBar;
