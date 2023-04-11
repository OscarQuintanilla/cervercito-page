import { useState } from "react";
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import Mosaic from "./components/Mosaic";

const items = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the first item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the second itemasdfasdfa sdfa sdfasdf",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the third item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the fourth item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the fifth item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    name: "Item 6",
    description: "This is the sixth item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 7,
    name: "Item 7",
    description: "This is the sixth item",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 8,
    name: "Item 8",
    description: "This is the sixth item",
    image: "https://picsum.photos/200/300",
  },
];

const categories = [
  {
    id: 1,
    name: "Interfaz de Usuario",
    img: "gui.png",
  },
  {
    id: 2,
    name: "Animaciones",
    img: "animations.png"
  },
  {
    id: 3,
    name: "Optimización",
    img: "optimization.png"
  },
  {
    id: 4,
    name: "Generación",
    img: "generation.png"
  },
  {
    id: 5,
    name: "Mobs",
    img: "mobs.png"
  },
  {
    id: 6,
    name: "RPG",
    img: "rpg.png"
  },
  {
    id: 7,
    name: "Comida",
    img: "food.png"
  },
  {
    id: 8,
    name: "Estructuras",
    img: "structures.png"
  },
]; 

const mods = [
  {
    id: 1,
    name: "Chat Heads",
    subtitle: "Agrega skins a los chats de Minecraft",
    description: "Agrega skins a los chats de Minecraft",
    category: 1 ,
    image: "https://picsum.photos/200/300",
    tags: ["tag1", "tag2", "tag3"],
    documentationLink: "https://www.google.com",
    downloadedLink: "https://www.google.com",
    creationDate: "2021-01-01",
  },
]

function App() {
  return (
    <div className="App font-Comfortaa">
      <NavBar />
      <div className="bg-white p-8 mx-12 mt-160 rounded-md align-bottom">
        <Mosaic title={"Categorías de nuestros mods"} categories={categories} />
        <Gallery title={"Galería"} items={items} />
      </div>
    </div>
  );
}

export default App;
