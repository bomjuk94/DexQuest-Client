import { type Pokemon } from "./models";

export interface ToggleFavouriteProps {
    loading: boolean,
    token: string | null,
    isFavourite: boolean,
    removeFavourite: (id: number) => void,
    addFavourite: (poke: Pokemon) => void,
    pokemon: Pick<Pokemon, "name" | "id" | "sprites" | "stats" | "types" | "requirement" | "current">,
}