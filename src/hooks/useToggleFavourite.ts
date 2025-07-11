import { showToast } from "../utilities/toast"
import { type ToggleFavouriteProps } from "../types/ToggleFavouriteProps"

export const useToggleFavourite = () => {

    const updateFavourite = ({
        loading,
        token,
        isFavourite,
        removeFavourite,
        addFavourite,
        pokemon,
    }: ToggleFavouriteProps) => {
        if (loading) return

        if (!token) {
            showToast('error', 'You need to log in to favourite a Pokémon.')
            return
        }

        if (isFavourite) {

            const removeFavouritePokemon = async () => {
                try {
                    const res = await fetch("/api/profile/favourites/remove", {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            IdToRemove: pokemon.id,
                        })
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            removeFavourite(pokemon.id);
            removeFavouritePokemon()
        } else {
            const addFavouritePokemon = async () => {
                try {
                    const res = await fetch("/api/profile/favourites/add", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            favouriteId: pokemon.id,
                        })
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            addFavouritePokemon()
            addFavourite(pokemon);
        }
    }

    return { updateFavourite }
}