"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generatePokemonData } from "@/lib/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokemonData,AbilityTree,EvolTree } from "../../interfaces/interfaces";

export default function Home() {

  const [search,setSearch] = useState<string>("")
  const [shiny,setShiny] = useState<boolean>(false)
  const [data, setData] = useState<PokemonData>(
    {
      name: "string",
      number: 1,
      type: [],
      location: "string",
      picture: "string",
      shiny:"string",
      moves: [],
      // evolTree: EvolTree[];
      abilities:[]
  }
  )

  // useEffect(() =>{
  //   generatePokemonData(search)
  // },[])

  const displayData = async(search:string) => {
    console.log(search)
    setData(await generatePokemonData(search.split(" ").join("-")))
  }

  const toggleShiny = () => {
    if(shiny)
    {
      setShiny(false)
    }else{
      setShiny(true)
    }
  }

  return (
    <div className="font-[family-name:var(--font-bubblegum-sans)] min-h-screen flex justify-center flex-col mx-3">
      <div className="flex flex-row justify-between">
        <div className="flex gap-3 place-items-center mb-2">
          <Input name="pokemon" onChange={(event) => setSearch(event.target.value)}/>
          <Button variant="outline" onClick={() => displayData(search)}>Search</Button>
          <Button className="text-md" variant="outline" onClick={() => displayData(String(Math.floor(Math.random() * 649) + 1))}>
            Randomize
          </Button>
          <img src="/blackstar.png" alt="star icon" className="w-10 h-10" />
        </div>
        <div className="flex gap-2">
          <h1 className="text-7xl">Pokedex</h1>
          <div className="flex place-items-end mb-2">
            <h2 className="text-2xl">powered by PokeAPI</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-3">
        <div className="grid grid-cols-2 grid-rows-[repeat(3,auto)] gap-3">
          <div className="col-start-1 border-2 border-black p-2">
            <h2 className="text-4xl">{data.name}</h2>
            <div className="flex gap-1">
              <div className="flex flex-col text-right">
              <h3 className="text-xl">no.</h3>
              <h3 className="text-xl">type:</h3>
              <h3 className="text-xl">location:</h3>
              </div>
              <div className="flex flex-col">
              <h3 className="text-xl">{data.number}</h3>
              <h3 className="text-xl">{data.type.toString()}</h3>
              <h3 className="text-xl"> {data.location}</h3>
              </div>
            </div>
          </div>
          <div className="relative col-start-2 row-start-1 row-end-3 border-2 border-black p-2 flex place-items-center">
            <a href={`https://www.pokemon.com/us/pokedex/${data.name}`} className="w-full hover:cursor-pointer">

            <img src={shiny ? data.picture:data.shiny} alt="pokemon" className="w-full h-full"/>
            </a>
            <img src={shiny ? "/shinyfull.png":"/shinyout.png"} alt="shiny icon" className="absolute bottom-1 right-1 w-8 hover:cursor-pointer" onClick={toggleShiny}/>
          </div>
          <div className="row-start-3 text-2xl col-start-1 col-end-3 border-2 border-black p-2">
            <h2>Evolution Tree</h2>
            <div className="flex justify-evenly">
              {/* evol tree div */}
              <div className="flex flex-col gap-1 justify-center">
                <img src="/pikachu.png" alt="" className="w-18" />
                <h2>Pikachu</h2>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <img src="/pikachu.png" alt="" className="w-18" />
                <h2>Pikachu</h2>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <img src="/pikachu.png" alt="" className="w-18" />
                <h2>Pikachu</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-3 gap-3">
          <div className="border-2 border-black p-2 col-start-1 col-end-4">
            <h2 className="text-2xl">Abilities</h2>
            <div className="overflow-y-auto h-52">
            {/* abilities div */}
            {data.abilities.map((ability, index) => (
              <div key={index}>
                <h2 className="text-2xl">{ability.name}</h2>
                <h4>{ability.description}</h4>
              </div>
            ))}
            </div>
          </div>
          <div className="border-2 border-black p-2 col-start-1 col-end-2">
            <h2 className="text-2xl">Moves</h2> <h4 className="text-md">({data.moves.length})</h4>
            <div className="overflow-y-auto h-48">
              {/* moves div */}
              {data.moves.map((move,index) =>(<h3 className="text-xl" key={index}>{move}</h3>))}
            </div>
          </div>
          <div className="border-2 border-black p-2 col-start-2 col-end-4">
            <h2 className="text-2xl">Favorites</h2>
            <div className="overflow-y-scroll h-48 flex flex-col gap-3">
              {/* favorites div */}
              <div className="flex justify-between place-items-center mx-3">
                <div className="flex gap-2 place-items-center">
                  <img
                    src="/pikachu.png"
                    alt="favorite pokemon"
                    className="w-12"
                  />
                  <h3 className="text-xl">Favorite1</h3>
                </div>
                <h2 className="text-2xl hover:text-red-500">X</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
