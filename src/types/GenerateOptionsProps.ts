import { type Pokemon } from "./models"

export interface GenerateOptionsProps {
    pokemonList: Pokemon[]
    poke: Pokemon
    setOptions: React.Dispatch<React.SetStateAction<Pokemon[]>>
}