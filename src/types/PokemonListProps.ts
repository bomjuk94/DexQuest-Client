import { type SetStateAction } from "react";
import type { Pokemon } from "./models";

export interface PokemonListProps {
    pokemonList: Pokemon[],
    paginationReady: boolean,
    setLoading: React.Dispatch<SetStateAction<boolean>>,
}