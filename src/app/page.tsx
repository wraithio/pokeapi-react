"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deformatString, generateFavs, generatePokemonData } from "@/lib/services";
import { useEffect, useState } from "react";
import { PokemonData, IFavorites } from "../../interfaces/interfaces";
import {
  removeFromLocalStorage,
  saveToLocalStorageByName,
} from "@/lib/localstorage";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [shiny, setShiny] = useState<boolean>(false);
  const [fav, setFav] = useState<IFavorites[]>([{ name: "none", image: "#" }]);
  const [data, setData] = useState<PokemonData>({
    name: "loading...",
    number: 0,
    type: [],
    location: "",
    picture: "#",
    shiny: "#",
    moves: [],
    evolTree: [
      {
        name: "",
        picture: "#",
      },
    ],
    abilities: [],
  });

  const displayData = async (search: string) => {
    console.log(search);
    setData(await generatePokemonData(search.split(" ").join("-")));
  };

  const addtoFavs = async () => {
    saveToLocalStorageByName(deformatString(data.name));
    setFav(await generateFavs());
  };
  const removeFav = async (pokemon: string) => {
    removeFromLocalStorage(deformatString(pokemon));
    setFav(await generateFavs());
  };

  useEffect(() => {
    const callFavs = async () => {
      setFav(await generateFavs());
    };
    callFavs();
    displayData(String(Math.floor(Math.random() * 649) + 1))
  }, []);

  return (
    <div className="font-[family-name:var(--font-bubblegum-sans)] min-h-screen flex sm:justify-center flex-col mx-3">
      <div className="flex lg:flex-row flex-col-reverse justify-between">
        <div className="flex gap-3 place-items-center mb-2">
          <Input
            name="pokemon"
            onChange={(event) => setSearch(event.target.value)}
            className="lg:w-fit w-48 sm:w-fit"
          />
          <Button
            type="submit"
            className="cursor-pointer sm:text-md text-sm"
            variant="outline"
            onClick={() => displayData(search)}
          >
            Search
          </Button>
          <Button
            type="submit"
            className="text-md cursor-pointer sm:text-md text-sm"
            variant="outline"
            onClick={() =>
              displayData(String(Math.floor(Math.random() * 649) + 1))
            }
          >
            Randomize
          </Button>
          <img
            src="/blackstar.png"
            alt="star icon"
            className="w-10 h-10 cursor-pointer"
            onClick={addtoFavs}
          />
        </div>
        <div className="flex sm:gap-2 gap-1 sm:justify-normal justify-end sm:mt-0 mt-2">
          <h1 className="sm:text-7xl text-sm">Pokedex</h1>
          <div className="flex place-items-end mb-2">
            <h2 className="sm:text-2xl text-sm">powered by PokeAPI</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-3">
        <div className="grid grid-cols-2 sm:grid-rows-[repeat(3,auto)] grid-rows-[150px_270px_1fr] sm:gap-3">
          <div className="col-start-1 sm:col-end-2 col-end-3 sm:border-2 border-black sm:p-2">
            <h2 className="sm:text-4xl text-5xl sm:my-0 my-2">{data.name}</h2>
            <div className="flex gap-1 sm:text-xl">
              <div className="flex flex-col text-right">
                <h3>no.</h3>
                <h3>type:</h3>
                <h3>location:</h3>
              </div>
              <div className="flex flex-col">
                <h3>{data.number}</h3>
                <h3>{data.type.toString()}</h3>
                <h3> {data.location}</h3>
              </div>
            </div>
          </div>
          <div className="relative sm:col-start-2 col-start-1 sm:col-end-2 col-end-3 sm:row-start-1 row-start-2 row-end-3 sm:border-2 border-black sm:p-2 flex place-items-center">
            <h1
              className={
                data.number <= 1
                  ? "hidden"
                  : "lg:text-xl text-sm hover:text-slate-500 cursor-pointer"
              }
              onClick={() => displayData(String(data.number - 1))}
            >
              #{data.number - 1}
            </h1>
            <a
              href={`https://www.pokemon.com/us/pokedex/${data.name.toLowerCase()}`}
              className="w-full hover:cursor-pointer"
              target="_blank"
            >
              <img
                src={shiny ? data.shiny : data.picture}
                alt={data.name}
                className="w-full aspect-square sm:p-2"
              />
            </a>
            <h1
              className={
                data.number >= 649
                  ? "hidden"
                  : "lg:text-xl text-sm hover:text-slate-500 cursor-pointer"
              }
              onClick={() => displayData(String(data.number + 1))}
            >
              #{data.number + 1}
            </h1>
            <img
              src={shiny ? "/shinyfull.png" : "/shinyout.png"}
              alt="shiny icon"
              className="absolute bottom-1 right-1 w-8 cursor-pointer hover:text"
              onClick={() => setShiny(!shiny)}
            />
          </div>
          <div className="row-start-3 text-2xl col-start-1 col-end-3 sm:border-2 border-black sm:p-2">
            <h2>Evolution Tree</h2>
            <div className="flex justify-evenly lg:mt-4 sm:mt-12 mt-4 gap-3 overflow-x-auto">
              {/* evol tree div */}
              {data.evolTree.map((evolution, index) => (
                evolution.picture == "#" ? <div key={index}>{evolution.name}</div> : <div className="flex flex-col gap-1 justify-center text-center hover:text-slate-500 cursor-pointer" key={index} onClick={() => displayData(evolution.name)}>
                  <img src={evolution.picture} alt="" className="h-[100px] w-[100px]" />
                  <h2 className="sm:text-2xl text-sm">{evolution.name}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid sm:grid-rows-2 grid-rows-[290px_160px_110px] grid-cols-3 sm:gap-3">
          <div className="sm:border-2 border-black sm:p-2 col-start-1 col-end-4">
            <h2 className="text-2xl">Abilities</h2>

            <div className="overflow-y-auto lg:h-52 sm:h-48 h-64 sm:border-0 border-1 rounded-sm sm:p-0 p-2">
              {/* abilities div */}
              {data.abilities.map((ability, index) => (
                <div key={index}>
                  <h2 className="sm:text-2xl text-lg">{ability.name}</h2>
                  <h4 className="sm:text-sm text-xs">{ability.description}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:border-2 border-black sm:p-2 col-start-1 sm:col-end-2 col-end-4">
            <h2 className="text-2xl">Moves</h2>{" "}
            <h4 className="sm:text-lg text-xs">({data.moves.length})</h4>
            <div className="overflow-y-auto lg:h-48 sm:h-44 h-24 sm:border-0 border-1 rounded-sm sm:p-0 p-2">
              {/* moves div */}
              {data.moves.map((move, index) => (
                <a href={`https://pokemondb.net/move/${deformatString(move)}`} className="hover:text-slate-500" target="_blank" key={index}>
                <h3 className="sm:text-xl">
                  {move}
                </h3>
                <hr className="lg:hidden block"/>
                </a>
              ))}
            </div>
          </div>
          <div className="sm:border-2 border-black sm:p-2 sm:col-start-2 col-start-1 sm:row-start-2 row-start-3 col-end-4">
            <h2 className="text-2xl">Favorites</h2>
            <div className="sm:overflow-y-auto overflow-y-visible overflow-x-auto sm:h-48 h-18 flex sm:flex-col flex-row sm:justify-normal justify-center gap-3 sm:border-0 border-1 rounded-sm sm:p-0 p-2">
              {/* favorites div */}
              {fav.map((favorite, index) => (
                <div
                  className="flex sm:justify-between place-items-center sm:gap-0 gap-2 sm:mx-3"
                  key={index}
                >
                  <div
                    className="flex md:flex-row flex-col lg:gap-2 place-items-center cursor-pointer hover:text-slate-500"
                    onClick={() => displayData(favorite.name.toLowerCase())}
                  >
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      className="w-[60px] h-[60px]"
                    />
                    <h3 className="text-xl sm:block hidden">{favorite.name}</h3>
                  </div>
                  <button onClick={() => removeFav(favorite.name)}>
                    <h2 className="sm:text-2xl hover:text-red-500">X</h2>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
      <h4 className="text-xs">created by: Aaron Robinson</h4>

      </div>
    </div>
  );
}
