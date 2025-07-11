import type { Pokemon } from "../types/models"
import type { AddToComparisonResponse, CompareObj } from "../stores/pokemonComparisonStore"
import { showToast } from "../utilities/toast"
import { capitalizeName } from "../utilities/capitalizeName"
import { scrollToTop } from '../utilities/scrollToTop'

export const useComparisonAdd = () => {
    const addComparePokemon = (pokemon: Pokemon, addToComparison: (poke: CompareObj) => AddToComparisonResponse) => {

        const pokeObj = {
            id: pokemon.id,
            name: pokemon.name,
            sprites: pokemon.sprites,
            stats: pokemon.stats,
            abilities: pokemon.abilities,
            types: pokemon.types,
            moves: pokemon.moves,
        }

        const response = addToComparison(pokeObj)

        if (response === 'success') {
            showToast('success', `${capitalizeName(pokeObj.name)} added!`)
        } else if (response === 'max limit') {
            showToast('error', 'Max limit reached!')
        }
        scrollToTop()
    }

    return { addComparePokemon }
}