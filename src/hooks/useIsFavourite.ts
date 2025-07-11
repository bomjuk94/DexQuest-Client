import { useFavouritesStore } from "../stores/favouritesStore";

export const useIsFavourite = (pokeId: number): boolean =>
    useFavouritesStore((state) =>
        state.hydrated ? state.favourites.some((p) => p.id === pokeId) : false
    );
