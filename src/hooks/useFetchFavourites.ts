import { useEffect, useState } from "react";
import { useProtectedProfile } from "./useProtectedProfile";
import type { Pokemon } from "../types/models";
import { useFavouritesStore } from "../stores/favouritesStore";
import { apiFetch } from "../utilities/api";

export const useFetchFavourites = () => {
    const { token } = useProtectedProfile()
    const [favouritesList, setFavouritesList] = useState<Pokemon[] | undefined>([]);
    const { setFavourites } = useFavouritesStore()
    const [loading, setLoading] = useState(true);
    const [favouritesError, setFavouritesError] = useState<string | null>(null)

    useEffect(() => {
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
                    setFavouritesList(data2)
                    setFavourites(data2)
                }
            }

            fetchFavourites()
        } catch (error) {
            setFavouritesError(error);
        } finally {
            setLoading(false)
        }
    }, [token])

    return {
        favouritesList,
        loading,
        favouritesError,
        setFavouritesList,
    }
}
