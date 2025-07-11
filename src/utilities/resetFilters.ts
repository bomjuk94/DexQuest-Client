import type { Dispatch, SetStateAction } from 'react'
import type { StatsValues } from '../types/models/Pokemon'
import { type StatSortState } from '../types/models/Filters'

export const defaultStats: StatsValues = {
    hp: { min: '', max: '' },
    attack: { min: '', max: '' },
    defense: { min: '', max: '' },
    speed: { min: '', max: '' },
}

type ResetFilterArgs = {
    setSearchTerm: Dispatch<SetStateAction<string>>
    setStatsValues: Dispatch<SetStateAction<StatsValues>>
    setSelectedFacets: Dispatch<SetStateAction<string[]>>
    setAlphabetSort: Dispatch<SetStateAction<string>>
    resetSort: () => void
    setSelectedStat?: Dispatch<SetStateAction<string | keyof StatSortState>>
}

export const resetFilters = ({
    setSearchTerm,
    setStatsValues,
    setSelectedFacets,
    setAlphabetSort,
    resetSort,
    setSelectedStat,
}: ResetFilterArgs) => {
    setSearchTerm('')
    setStatsValues(defaultStats)
    setSelectedFacets([])
    setAlphabetSort('none')
    resetSort()
    if (setSelectedStat) setSelectedStat('')
}
