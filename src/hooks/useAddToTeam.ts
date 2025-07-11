import type { Pokemon } from "../types/models"
import { useTeamStore } from "../stores/teamStore"
import { showToast } from "../utilities/toast"
import { capitalizeName } from "../utilities/capitalizeName"
import { scrollToTop } from '../utilities/scrollToTop'

export const useTeamHandler = () => {
    const { addToTeam } = useTeamStore()

    const handleTeamAdd = (pokemon: Pokemon) => {
        const pokeObj = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
        }

        const response = addToTeam(pokeObj)

        if (response === 'success') {
            showToast('success', `${capitalizeName(pokeObj.name)} added!`)
        } else if (response === 'exists') {
            showToast('error', `${capitalizeName(pokeObj.name)} already added!`)
        } else if (response === 'max limit') {
            showToast('error', 'Max limit reached!')
        }
        scrollToTop()
    }

    return { handleTeamAdd }
}