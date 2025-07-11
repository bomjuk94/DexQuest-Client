import { create } from "zustand";
import type { Pokemon } from "../types/models";

type FavouritesStore = {
    favourites: Pokemon[];
    hydrated: boolean
    setFavourites: (list: Pokemon[]) => void;
    addFavourite: (poke: Pokemon) => void;
    removeFavourite: (id: number) => void;
    isFavourite: (id: number) => boolean;
    clear: () => void
};

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
    favourites: [],
    hydrated: false,
    setFavourites: (list) => {
        set({ favourites: list, hydrated: true });
    },
    addFavourite: (poke) => {
        const favourites = get().favourites;
        const alreadyExists = favourites.some((p) => p.id === poke.id);
        if (alreadyExists) {
            console.log(`[Zustand] Skipping add: ${poke.name} already in favourites`);
            return;
        }
        console.log(`[Zustand] Adding favourite: ${poke.name}`);
        set({ favourites: [...favourites, poke] });
    },
    removeFavourite: (id) =>
        set((state) => ({
            favourites: state.favourites.filter((poke) => poke.id !== id),
        })),
    isFavourite: (id) => {
        const { favourites, hydrated } = get();
        if (!hydrated) return false;
        return favourites.some((poke) => poke.id === id);
    },
    clear: () => set({ favourites: [] }),
}));
