import PokemonCard from './PokemonCard'
import type { PokemonListProps } from '../types/models/Pokemon'
import { usePokemonFilter } from '../hooks/usePokemonFilter'
import Filters from './Filters'
import Spinner from './Spinner'
import { useIsTeamBuilder } from '../hooks/useIsTeamBuilder'

const PokemonList = ({ pokemonList }: PokemonListProps) => {

    const teamBuilder = useIsTeamBuilder({ location })

    const {
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
    } = usePokemonFilter(pokemonList)

    return (
        <section className={`flex flex-col gap-3.5 w-full max-w-5xl mx-auto ${teamBuilder ? '' : 'relative'}`}>
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleAdvancedClick={handleAdvancedClick}
                setSelectedFacets={setSelectedFacets}
                setAlphabetSort={setAlphabetSort}
                setStatsValues={setStatsValues}
                filteredData={filteredData}
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
                resetSort={resetSort}
                statSort={statSort}
                updateSort={updateSort}
                showAdvanced={showAdvanced}
                setShowAdvanced={setShowAdvanced}
                handleReset={handleReset}
            />

            <section className="grid grid-cols-2 phone:grid-cols-3 sm:grid-cols-4 justify-items-center gap-x-5 gap-y-8 mt-20">
                {filteredData.length === 0 ? (
                    <p>No Results...</p>
                ) : (
                    currentItems.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} key={pokemon.name} borderColor='border-transparent' />
                    ))
                )}
            </section>


            <Spinner loader={loader} itemsToShow={itemsToShow} hasMore={hasMore} />
        </section>
    )
}

export default PokemonList