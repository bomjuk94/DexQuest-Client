import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EntryType, Sprites } from "../types/models";

export type AddToComparisonResponse = 'max limit' | 'success' | void
type Stat = {
    stat: EntryType
}
type Type = {
    type: EntryType
}
type Ability = {
    ability: EntryType
}
type Move = {
    move: EntryType
}
export type CompareObj = {
    id: number
    name: string
    sprites: Sprites
    stats: Stat[]
    abilities: Ability[]
    types: Type[]
    moves: Move[]
}
type PokemonComparisonStore = {
    pokeToCompare: CompareObj[]
    addToComparison: (poke: CompareObj) => AddToComparisonResponse
    removeFromComparison: (id: number) => void
    existsInComparison: (id: number) => boolean
    setComparison: (list: CompareObj[]) => void
}

export const usePokemonComparisonStore = create<PokemonComparisonStore>()(
    persist(
        (set, get) => ({
            pokeToCompare: [],
            addToComparison: (poke: CompareObj): AddToComparisonResponse | void => {
                const { pokeToCompare } = get();

                if (pokeToCompare.length >= 2) return 'max limit'
                return set({ pokeToCompare: [...pokeToCompare, poke] }), 'success'
            },
            removeFromComparison: (id) => {
                set((state) => ({
                    pokeToCompare: state.pokeToCompare.filter((poke) => poke.id !== id)
                }))
            },
            existsInComparison: (id) => get().pokeToCompare.some((poke) => poke.id === id),
            setComparison: (list) => set({ pokeToCompare: list }),
        }),
        {
            name: 'pokemon-comparison-storage',
            partialize: (state) => ({ pokeToCompare: state.pokeToCompare }),
        }
    )
);