import { useState, useEffect, useRef, useMemo } from "react"
import type { Pokemon, StatsValues } from "../types/models/Pokemon"
import { useStatSort, getStatValue } from "./useStatSort"
import { type StatSortState } from "../types/models/Filters"
import { useDebounce } from "./useDebounce"
import { resetFilters } from "../utilities/resetFilters"
import { useInfiniteScroll } from "./useInfiniteScroll"
import { useModalStore } from "../stores/ModalStore"
import { useAdvancedFiltersStore } from "../stores/useAdvancedFiltersStore"
import { useFilteredPokemon } from "./useFilteredPokemon"

export const usePokemonFilter = (pokemonList: Pokemon[]) => {

    const { isOpen, toggleModal } = useModalStore()
    const { setReset } = useAdvancedFiltersStore()
    const itemsPerPage = 32
    const [searchTerm, setSearchTerm] = useState('')
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [itemsToShow, setItemsToShow] = useState(itemsPerPage)
    const [hasMore, setHasMore] = useState(true)
    const [selectedFacets, setSelectedFacets] = useState<string[]>([])
    const [statsValues, setStatsValues] = useState<StatsValues>({
        hp: { min: '', max: '' },
        attack: { min: '', max: '' },
        defense: { min: '', max: '' },
        speed: { min: '', max: '' }
    })
    const [alphabetSort, setAlphabetSort] = useState('none')
    const [selectedStat, setSelectedStat] = useState<keyof StatSortState | string>('')
    const filteredDataRef = useRef<any[]>([])
    const loader = useRef<HTMLElement | null>(null)
    const debouncedSearchTerm = useDebounce(searchTerm)

    const filteredData = useFilteredPokemon(
        pokemonList,
        debouncedSearchTerm,
        selectedFacets,
        statsValues,
    )

    const { statSort, updateSort, getActiveSort, resetSort } = useStatSort()

    useEffect(() => {
        filteredDataRef.current = filteredData
    }, [filteredData])

    const activeSort = getActiveSort()

    const currentItems = useMemo(() => {
        const sorted = [...filteredData]
        if (alphabetSort === 'asc') sorted.sort((a, b) => a.name.localeCompare(b.name))
        else if (alphabetSort === 'desc') sorted.sort((a, b) => b.name.localeCompare(a.name))

        if (activeSort) {
            const [stat, direction] = activeSort
            sorted.sort((a, b) => {
                const valA = getStatValue(a, stat)
                const valB = getStatValue(b, stat)
                return direction === 'asc' ? valA - valB : valB - valA
            })
        }

        return sorted.slice(0, itemsToShow)
    }, [filteredData, alphabetSort, activeSort, itemsToShow])

    useInfiniteScroll(loader, {
        hasMore,
        onLoadMore: () => {
            setItemsToShow(prev => {
                const next = prev + itemsPerPage
                if (next >= filteredDataRef.current.length) {
                    setHasMore(false)
                    return filteredDataRef.current.length
                }
                return next
            })
        },
    })

    useEffect(() => {
        const node = loader.current
        if (!node) return

        const rect = node.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0 && hasMore) {
            window.scrollBy({ top: 100, behavior: 'smooth' })
        }
    }, [itemsToShow, hasMore])

    useEffect(() => {
        setItemsToShow(itemsPerPage)
        setHasMore(filteredData.length > itemsPerPage)
    }, [debouncedSearchTerm, selectedFacets, statsValues, filteredData.length])

    const handleAdvancedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        toggleModal(!isOpen)

        if (isOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        resetFilters({
            setSearchTerm,
            setStatsValues,
            setSelectedFacets,
            setAlphabetSort,
            resetSort,
            setSelectedStat,
        })
        setReset(true)
    }

    return {
        searchTerm,
        setSearchTerm,
        handleAdvancedClick,
        setSelectedFacets,
        setAlphabetSort,
        setStatsValues,
        filteredData,
        selectedStat,
        setSelectedStat,
        resetSort,
        statSort,
        updateSort,
        showAdvanced,
        setShowAdvanced,
        handleReset,
        currentItems,
        loader,
        itemsToShow,
        hasMore,
    }
}
