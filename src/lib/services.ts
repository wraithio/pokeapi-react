import { PokemonData,AbilityTree,EvolTree } from "../../interfaces/interfaces";
function formatString(input: string): string {
    return input
        .split("-") 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(" "); 
}

const generatePokemonData = async (pokemon:string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`,{
        cache: 'force-cache'
    });
    if(!response.ok) alert("Invalid input... REMEMBER only Gen.I-V")
    const data = await response.json();
    if(data.id > 649) alert("Invalid input... REMEMBER only Gen.I-V")
    const moveArr:string[] = []
    for(let i = 0; i < data.moves.length;i++)
    {
        moveArr.push(formatString(data.moves[i].move.name))
    }
    const typeArr:string[] = []
    for(let i = 0;i < data.types.length; i++)
    {
        typeArr.push(formatString(data.types[i].type.name))
    }
    const abilityArr:AbilityTree[] =[]
    for(let i = 0; i < data.abilities.length; i++)
    {
        const abilityResponse = await fetch(data.abilities[i].ability.url)
        const abilityData = await abilityResponse.json()
        const abilityObj:AbilityTree ={name:formatString(abilityData.name),description:abilityData.effect_entries[1].effect} 
        abilityArr.push(abilityObj)
    }
    // console.log(data);
    const locationResponse = await fetch(data.location_area_encounters)
    const locData = await locationResponse.json()
    // console.log(locData)
    const speciesResponse = await fetch(data.species.url)
    const speciesData = await speciesResponse.json() 
    const evolResponse = await fetch(data.forms[0].url)

    const pokeData:PokemonData = {
        name:formatString(data.name),
        number:data.id,
        picture:data.sprites.other.showdown.front_default,
        shiny:data.sprites.other.showdown.front_shiny,
        moves:moveArr,
        location:locData.length != 0 ? formatString(locData[0].location_area.name) : "Unknown",
        abilities:abilityArr,
        type:typeArr
    }

    return pokeData
}

export {generatePokemonData}