export interface EvolTree{
    name:string,
    picture:string
}

export interface AbilityTree{
    name:string,
    description:string
}

export interface PokemonData {
    name: string;
    number: number;
    type: string[];
    location: string;
    picture: string;
    shiny:string;
    moves: string[];
    evolTree: EvolTree[];
    abilities:AbilityTree[];
}

export interface IFavorites{
    name:string
    image:string
}