import type { RemoveFavouriteProps } from "../types/RemoveFavouriteProps"
import { useRemoveFavourite } from "./useRemoveFavourite"

export const useFavouriteRemoveHandler = () => {

    const { removeFavourite } = useRemoveFavourite()

    const handleFavouriteRemove = ({ id, name, token, setFavouritesList }: RemoveFavouriteProps) => {
        removeFavourite({ id, name, token, setFavouritesList })
    }

    return { handleFavouriteRemove }
}