import { useState } from 'react'
import type { Pokemon } from '../types/models/Pokemon'
import type { StatSortState, SortDirection } from '../types/models/Filters'

export const useStatSort = () => {
    const [statSort, setStatSort] = useState<StatSortState>({
        hp: 'none',
        attack: 'none',
        defense: 'none',
        speed: 'none',
        weight: 'none',
    })

    const updateSort = (stat: keyof StatSortState, direction: SortDirection) => {
        setStatSort(prev => ({
            ...prev,
            [stat]: direction,
        }))
    }

    const getActiveSort = (): [keyof StatSortState, SortDirection] | null => {
        for (const stat in statSort) {
            if (statSort[stat as keyof StatSortState] !== 'none') {
                return [stat as keyof StatSortState, statSort[stat as keyof StatSortState]]
            }
        }
        return null
    }

    const resetSort = () => {
        setStatSort({
            hp: 'none',
            attack: 'none',
            defense: 'none',
            speed: 'none',
            weight: 'none',
        })
    }

    return {
        statSort,
        updateSort,
        getActiveSort,
        resetSort,
    }
}

export const getStatValue = (pokemon: Pokemon, statName: keyof StatSortState): number => {
    if (statName === 'weight') return pokemon.weight

    const statObj = pokemon.stats.find(s => s.stat.name === statName)
    return statObj?.base_stat ?? 0
}