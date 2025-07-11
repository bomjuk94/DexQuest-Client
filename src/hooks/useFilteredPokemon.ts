import { useEffect, useState, useMemo } from 'react'
import type { Pokemon, StatsValues } from '../types/models/Pokemon'
import { filterLightweightPokemon } from '../utilities/filterLightweightPokemon'

export function useFilteredPokemon(
    pokemonList: Pokemon[],
    searchTerm: string,
    typeTerms: string[],
    stats: StatsValues,
) {
    const [filteredData, setFilteredData] = useState<Pokemon[]>([])

    const lightweightFiltered = useMemo(() => {
        return filterLightweightPokemon(
            pokemonList,
            searchTerm,
            typeTerms,
            stats,
        )
    }, [pokemonList, searchTerm, typeTerms, stats])

    useEffect(() => {
        const fetchFiltered = async () => {
            setFilteredData(lightweightFiltered)
            return
        }

        fetchFiltered()
    }, [lightweightFiltered])

    return filteredData
}
