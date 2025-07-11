import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Team } from "../types/models";

type AddToTeamResponse = 'success' | 'max limit' | 'exists' | void

type TeamStore = {
    team: Team[]
    addToTeam: (pokemon: Team) => AddToTeamResponse
    removeFromTeam: (id: number) => void
    existsInTeam: (id: number) => boolean
    setTeam: (list: Team[]) => void
}

export const useTeamStore = create<TeamStore>()(
    persist(
        (set, get) => ({
            team: [],
            addToTeam: (pokemon: Team): 'success' | 'max limit' | 'exists' | void => {

                const { existsInTeam, team } = get();

                if (existsInTeam(pokemon.id)) {
                    return 'exists'
                } else if (team.length >= 6) {
                    return 'max limit'
                } else {
                    set({ team: [...team, pokemon] });
                    return 'success';
                }
            },
            removeFromTeam: (id) => {
                set((state) => ({
                    team: state.team.filter((pokemon) => pokemon.id !== id)
                }))
            },
            existsInTeam: (id) => get().team.some((pokemon) => pokemon.id === id),
            setTeam: (list) => set({ team: list }),
        }),
        {
            name: 'team-storage',
            partialize: (state) => ({ team: state.team }),
        }
    )
);