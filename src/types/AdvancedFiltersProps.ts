import type { Pokemon } from "./models"
import type { StatSortState, SortDirection } from "./models/Filters"

export interface AdvancedFiltersProps {
    setSelectedFacets: React.Dispatch<React.SetStateAction<string[]>>
    setAlphabetSort: React.Dispatch<React.SetStateAction<string>>
    setStatsValues: React.Dispatch<React.SetStateAction<{
        hp: { min: string, max: string },
        attack: { min: string, max: string },
        defense: { min: string, max: string },
        speed: { min: string, max: string }
    }>>
    filteredData: Pokemon[]
    selectedStat: keyof StatSortState | string
    setSelectedStat: React.Dispatch<React.SetStateAction<keyof StatSortState | string>>
    statSort: {
        hp: string,
        attack: string,
        defense: string,
        speed: string,
        weight: string,
    }
    updateSort: (stat: keyof StatSortState, direction: SortDirection) => void;
    resetSort: () => void;
    handleAdvancedClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}