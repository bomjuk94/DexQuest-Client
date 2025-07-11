import { type Pokemon, type StatsValues } from "./models"
import { type StatSortState, type SortDirection } from "./models/Filters"

export interface FiltersProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    handleAdvancedClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    setSelectedFacets: React.Dispatch<React.SetStateAction<string[]>>
    setAlphabetSort: React.Dispatch<React.SetStateAction<string>>
    setStatsValues: React.Dispatch<React.SetStateAction<StatsValues>>
    filteredData: Pokemon[]
    selectedStat: string
    setSelectedStat: React.Dispatch<React.SetStateAction<string>>
    resetSort: () => void
    statSort: StatSortState,
    updateSort: (stat: keyof StatSortState, direction: SortDirection) => void
    showAdvanced: boolean
    setShowAdvanced: React.Dispatch<React.SetStateAction<boolean>>
    handleReset: (e: React.MouseEvent<HTMLButtonElement>) => void
}