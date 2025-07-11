import { useRef, useState, useEffect } from 'react'
import { capitalizeName } from '../utilities/capitalizeName';
import type { StatsValues } from '../types/models/Pokemon';
import { isStatKey } from '../utilities/isStatKey';
import { isStatDirection } from '../utilities/isStatDirection';
import { useModalStore } from '../stores/ModalStore';
import type { StatSortState } from '../types/models/Filters';
import { useAdvancedFiltersStore } from '../stores/useAdvancedFiltersStore';
import { elementalTypes, statsRange } from '../utilities/constants.tsx';
import { useIsTeamBuilder } from '../hooks/useIsTeamBuilder';
import type { AdvancedFiltersProps } from '../types/AdvancedFiltersProps';
import { useFacetHandler } from '../hooks/useFacetHandler';
import { useAlphabetSortHandler } from '../hooks/useAlphabetSortHandler';
import { useStatHandler } from '../hooks/useStathandler';
import { useStatDirectionHandler } from '../hooks/useStatDirectionHandler'
import { useResetForm } from '../hooks/useResetForm';

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ setSelectedFacets, setAlphabetSort, setStatsValues, filteredData, setSelectedStat, updateSort, handleAdvancedClick }) => {

    const { toggleModal, isOpen } = useModalStore()
    const { isReset, setReset } = useAdvancedFiltersStore()
    const [types, setTypes] = useState<string[]>([])
    const [alphabetDirection, setAlphabetDirection] = useState('')
    const [stat, setStat] = useState<keyof StatSortState | string>('')
    const [statDirection, setStatDirection] = useState({ stat: '', direction: '' })
    const minRefs = useRef<HTMLInputElement[]>([])
    const maxRefs = useRef<HTMLInputElement[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const teamBuilder = useIsTeamBuilder({ location })

    // Hooks
    const { handleFacetChange } = useFacetHandler()
    const { handleAlphabetSortChange } = useAlphabetSortHandler()
    const { handleStatChange } = useStatHandler()
    const { handleStatDirectionChange } = useStatDirectionHandler()
    const { resetForm } = useResetForm()

    const handleAdvancedSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedStats = {} as StatsValues
        statsRange.forEach((stat, index) => {
            updatedStats[stat] = {
                min: minRefs.current[index]?.value || '',
                max: maxRefs.current[index]?.value || ''
            }
        })
        setStatsValues(updatedStats)
        setSelectedFacets(types)
        setAlphabetSort(alphabetDirection)
        setSelectedStat(stat)
        if (isStatKey(statDirection.stat) && isStatDirection(statDirection.direction))
            updateSort(statDirection.stat, statDirection.direction)
        toggleModal(false)
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        if (isReset) {
            resetForm(
                formRef,
                setTypes,
                setAlphabetDirection,
                setStat,
                minRefs,
                maxRefs,
                setReset,
            )
        }
    }, [isReset, setReset, resetForm])

    return (
        <div
            className={`
                ${teamBuilder ? 'w-ninety-five-percent' : 'w-full'} 
                absolute -z-1 p-7 rounded-xl border-4 bg-primary border-primary ease-in-out duration-500 text-primary 
                ${(teamBuilder && isOpen) ? 'top-80 opacity-100 z-50' : isOpen ? '-top-8 sm:top-52 opacity-100 z-50' : 'top-96 opacity-0'}
                `}
        >
            <form
                className='relative flex flex-col sm:grid md:grid-cols-2 gap-y-7 gap-x-2.5 
                w-full min-w-0 '
                onSubmit={handleAdvancedSubmit}
                ref={formRef}
            >
                <div className="flex flex-col gap-2.5 min-w-0">
                    <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 gap-x-2.5">
                        <div className='flex flex-col gap-1.5'>
                            <p>Type</p>

                            <div className="flex flex-col overflow-auto w-full h-one-fifty">
                                {elementalTypes.map((type, i) => (
                                    <label key={i} className='flex gap-x-1'>
                                        <input
                                            type="checkbox"
                                            value={type}
                                            checked={types.includes(type)}
                                            onChange={(e) => handleFacetChange(e, setTypes, types)}
                                            className='cursor-pointer'
                                        />
                                        {capitalizeName(type)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full">
                            <p>Alphabetical</p>
                            <select className={`cursor-pointer border-2 rounded-sm  sm:w-full ${filteredData.length === 0 ? 'opacity-35' : ''} bg-primary text-primary`} value={alphabetDirection} disabled={filteredData.length === 0} onChange={(e) => handleAlphabetSortChange(e, setAlphabetDirection)}>
                                <option value="none">None</option>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                            <p>Statistic</p>
                            <div className="flex flex-col gap-2.5 ">
                                <select
                                    value={stat}
                                    onChange={(e) => handleStatChange(e, setStat)}
                                    className={`cursor-pointer border-2 rounded-sm w-full bg-primary text-primary}`}>
                                    <option value="">None</option>
                                    <option value="hp">HP</option>
                                    <option value="attack">Attack</option>
                                    <option value="defense">Defense</option>
                                    <option value="speed">Speed</option>
                                    <option value="weight">Weight</option>
                                </select>

                                {stat && isStatKey(stat) && (
                                    <select value={statDirection.direction} onChange={(e) => handleStatDirectionChange(stat, e.target.value, setStatDirection)} className={`cursor-pointer border-2 rounded-sm w-full bg-primary text-primary}`}>
                                        <option value="none">None</option>
                                        <option value="asc">Asc</option>
                                        <option value="desc">Desc</option>
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-y-2.5 min-w-0 w-full">
                    {statsRange.map((stat, index) => (
                        <div className="flex flex-col gap-1.5 min-w-0" key={stat}>
                            <h4>{capitalizeName(stat)}</h4>
                            <div className="flex gap-1.5 w-full min-w-0">
                                <input
                                    type="number"
                                    placeholder={`Min ${stat}...`} ref={(el) => { if (el) minRefs.current[index] = el }}
                                    className='flex-1 min-w-0 border-2 py-1.5 px-2.5 rounded-sm input-bkgd text-input border-primary placeholder:text-gray-500'
                                />
                                <input type="number" placeholder={`Max ${stat}...`} ref={(el) => { if (el) maxRefs.current[index] = el }} className='flex-1 min-w-0 border-2 py-1.5 px-2.5 rounded-sm text-black input-bkgd text-input border-primary placeholder:text-gray-500' />
                            </div>
                        </div>
                    ))}
                </div>
                <input
                    type='submit'
                    value='Submit'
                    className={`cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 col-start-2 col-end-3 ml-auto`}
                />
            </form>

            <button
                onClick={handleAdvancedClick}
                className='font-medium text-lg cursor-pointer w-fit absolute top-1 right-3.5'
            >X</button>
        </div>
    )
}

export default AdvancedFilters