import { showToast } from "../utilities/toast"
import { capitalizeName } from "../utilities/capitalizeName"
import { type RemoveFavouriteProps } from "../types/RemoveFavouriteProps"
import { apiFetch } from "../utilities/api"

export const useRemoveFavourite = () => {

    const removeFavourite = async ({
        id, name, token, setFavouritesList
    }: RemoveFavouriteProps) => {
        try {
            const res = await apiFetch("/api/profile/favourites/remove", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    IdToRemove: id,
                })
            })

            if (res.status === 200) {
                showToast('success', `${capitalizeName(name)} removed!`)
                const data = await res.json()
                const updatedFavourites = data.profile.favourites
                if (updatedFavourites.length === 0) {
                    setFavouritesList([])
                } else {
                    try {
                        if (!token) return
                        const fetchFavourites = async () => {
                            const res1 = await apiFetch('/api/profile/favourites', {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            })

                            const data = await res1.json()

                            const res2 = await apiFetch('/api/pokemon/list', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    ids: data.favouritesIds,
                                }),
                            })

                            if (res2.status === 200) {
                                const data2 = await res2.json()
                                setFavouritesList(data2);
                            }
                        }

                        fetchFavourites()
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {
            showToast('error', `Could not remove ${capitalizeName(name)}. Error: ${error}`)
            console.log(error);
        }
    }

    return { removeFavourite }
}