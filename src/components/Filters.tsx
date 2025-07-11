import AdvancedFilters from './AdvancedFilters'
import { type FiltersProps } from '../types/FiltersProps'

const Filters = ({
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
    handleReset,
}: FiltersProps) => {
    return (
        <div className='flex flex-col gap-3.5'>
            <div className="grid grid-cols-2 gap-2.5">
                <input
                    type="text"
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary'
                />
                <button
                    onClick={handleAdvancedClick}
                    className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80'>Advanced</button>
            </div>

            <AdvancedFilters setSelectedFacets={setSelectedFacets} setAlphabetSort={setAlphabetSort} setStatsValues={setStatsValues} filteredData={filteredData} selectedStat={selectedStat} setSelectedStat={setSelectedStat} resetSort={resetSort} statSort={statSort} updateSort={updateSort} handleAdvancedClick={handleAdvancedClick} />

            <button
                onClick={handleReset}
                className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text hover:opacity-80 btn-bkgd'>
                Reset
            </button>
        </div>
    )
}

export default Filters