import { type SetStateAction } from "react"
import { type Pokemon } from "./models"

export interface FavouritesListProps {
    favourite: Pokemon
    setFavouritesList: React.Dispatch<SetStateAction<Pokemon[]>>
}