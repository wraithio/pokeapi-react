import {
  PokemonData,
  AbilityTree,
  EvolTree,
  IFavorites,
} from "../../interfaces/interfaces";
import { getLocalStorage } from "./localstorage";

function formatString(input: string): string {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function deformatString(input:string) {
  return input.toLowerCase().replace(/\s+/g, '-');
}

const findPicturebyName = async (pokemon: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data.sprites.other.showdown.front_default;
};

const generatePokemonData = async (pokemon: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
    cache: "force-cache",
  });
  if (!response.ok) alert("Invalid input... REMEMBER only Gen.I-V");
  const data = await response.json();
  if (data.id > 649) alert("Invalid input... REMEMBER only Gen.I-V");
  const moveArr: string[] = data.moves.map((move: { move: { name: string } }) => formatString(move.move.name));
  const typeArr: string[] = data.types.map((type:{type:{name:string}}) => formatString(type.type.name));
  const abilityArr: AbilityTree[] = [];
  for (let i = 0; i < data.abilities.length; i++) {
    const abilityResponse = await fetch(data.abilities[i].ability.url);
    const abilityData = await abilityResponse.json();
    const abilityObj: AbilityTree = {
      name: formatString(abilityData.name),
      description:
        abilityData.effect_entries.length != 1
          ? abilityData.effect_entries[1].effect
          : abilityData.effect_entries[0].effect,
    };
    abilityArr.push(abilityObj);
  }
  const locationResponse = await fetch(data.location_area_encounters);
  const locData = await locationResponse.json();

  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();

  let evolArr: EvolTree[] = [];
  if (speciesData.evolves_from_species != null) {
    let response = await fetch(speciesData.evolves_from_species.url);
    let data = await response.json();

    //finding the first evolution
    while (data.evolves_from_species != null) {
      response = await fetch(data.evolves_from_species.url);
      data = await response.json();
    }

    evolArr.push({
      name: formatString(data.name),
      picture: await findPicturebyName(data.name),
    });
  } else {
    evolArr.push({
      name: formatString(speciesData.name),
      picture: await findPicturebyName(speciesData.name),
    });
  }

  const evolResponse = await fetch(speciesData.evolution_chain.url);
  const evolData = await evolResponse.json();
  let evolChain = evolData.chain;

  if (evolChain.evolves_to.length > 3) {
    for (let i = 0; i < evolChain.evolves_to.length; i++) {
      evolArr.push({
        name: formatString(evolChain.evolves_to[i].species.name),
        picture: await findPicturebyName(evolChain.evolves_to[i].species.name),
      });
    }
  }
   else {
    while (evolChain.evolves_to.length != 0) {
      evolChain = evolChain.evolves_to[0];
      evolArr.push({
        name: formatString(evolChain.species.name),
        picture: await findPicturebyName(evolChain.species.name),
      });
    }
  }

  if(evolArr.length == 1) evolArr = [{name:"N/A", picture:"#"}]

  const pokeData: PokemonData = {
    name: formatString(data.name),
    number: data.id,
    picture: data.sprites.other.showdown.front_default,
    shiny: data.sprites.other.showdown.front_shiny,
    moves: moveArr,
    location:
      locData.length != 0
        ? formatString(locData[0].location_area.name)
        : "N/A",
    abilities: abilityArr,
    type: typeArr,
    evolTree: evolArr,
  };
  return pokeData;
};

const generateFavs = async () => {
  const favList: IFavorites[] = [];
  const favNames = getLocalStorage();
  // console.log(favNames)
  for (let i = 0; i < favNames.length; i++) {
    favList.push({
      name: formatString(favNames[i]),
      image: await findPicturebyName(favNames[i]),
    });
  }
  return favList;
};

export { generatePokemonData, generateFavs ,deformatString};
