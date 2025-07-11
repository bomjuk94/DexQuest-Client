import type { CompareObj } from '../stores/pokemonComparisonStore'
import { capitalizeName } from '../utilities/capitalizeName'
import { usePokemonComparisonStore } from '../stores/pokemonComparisonStore'
import { generateChartData } from '../utilities/chartData'
import StatVisualizer from './StatVisualizer'
import AddToFavourite from './AddToFavourite'
import type { Pokemon } from '../types/models'
import { useTeamHandler } from '../hooks/useAddToTeam'
import { useIndividualPokemon } from '../hooks/useIndividualPokemon'

type ComparisonCardProps = {
    poke: CompareObj | null
}

const ComparisonCard = ({ poke }: ComparisonCardProps) => {

    const { pokemon, loading, error } = useIndividualPokemon(poke?.id)
    const removeFromComparison = usePokemonComparisonStore((state) => state.removeFromComparison)

    const handleComparisonRemove = (id: number) => {
        removeFromComparison(id)
    }

    const { handleTeamAdd } = useTeamHandler()

    const handleAddComparisonToTeam = (pokemon: Pokemon) => {
        handleTeamAdd(pokemon)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    if (!pokemon) return (
        <div className='grid grid-cols-[40%_60%] gap-2.5 h-fit'>
            <div className='bg-secondary rounded-xl p-3 min-h-two-hundred'>
                <div className='bg-brand-antique-white w-full h-full flex justify-center items-center rounded-sm text-3xl'>
                    +
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p>
                </p>
            </div>
        </div>
    )

    const { statLabels, chartData } = generateChartData(pokemon)

    return (
        <div className='flex flex-col phone:grid phone:grid-cols-[45%_55%] phone:gap-2.5'>
            <div className='bg-secondary rounded-xl p-3 min-h-two-hundred'>
                <div className='bg-brand-antique-white w-full h-full flex justify-center items-center rounded-sm relative'>
                    <img src={pokemon?.sprites?.["official-artwork"]} alt={capitalizeName(pokemon.name)} className='object-contain' />
                    <AddToFavourite pokemon={pokemon} />
                </div>
            </div>

            <div className='flex flex-col gap-9 my-8 phone:gap-4 text-primary'>
                <h4 className='text-2xl'>
                    {capitalizeName(pokemon.name)}
                </h4>
                <div className='grid grid-cols-2 gap-x-2 gap-y-4'>
                    <div className='flex flex-col gap-2.5 w-full items-start'>
                        <h5 className='text-lg font-medium'>Types</h5>
                        <ul className='flex flex-col gap-1'>
                            {
                                pokemon.types.map((type) => <li key={type.type.name}>{capitalizeName(type.type.name)}</li>)
                            }
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2.5 w-full items-start'>
                        <h5 className='text-lg font-medium'>Stats</h5>
                        <ul className='flex flex-col gap-1'>
                            {
                                pokemon.stats
                                    .filter(stat => !['special-attack', 'special-defense'].includes(stat.stat.name))
                                    .map((stat) => (
                                        <li key={stat.stat.name}>
                                            <span>
                                                {stat.stat.name === 'hp'
                                                    ? stat.stat.name.toUpperCase()
                                                    : capitalizeName(stat.stat.name)
                                                }
                                            </span>
                                            : {stat.base_stat}
                                        </li>
                                    ))
                            }

                        </ul>
                    </div>

                    <div className='flex flex-col gap-2.5 w-full items-start'>
                        <h5 className='text-lg font-medium'>Abilities</h5>
                        <ul className='flex flex-col gap-1'>
                            {
                                pokemon.abilities.map((ability) => <li>{capitalizeName(ability.ability.name)}</li>)
                            }
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2.5 w-full items-start'>
                        <h5 className='text-lg font-medium'>Moves</h5>
                        <ul className='flex flex-col gap-1 overflow-auto h-sprite'>
                            {
                                pokemon.moves.map((move) => <li>{capitalizeName(move.move.name)}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-1 col-start-1 col-end-3'>
                <button
                    onClick={() => handleAddComparisonToTeam(pokemon)}
                    className={`cursor-pointer border-none rounded-sm py-1 px-1.5 text-white hover:opacity-80 btn-bkgd transition-all duration-200`}
                >
                    Add to Team
                </button>
                <button
                    onClick={() => handleComparisonRemove(pokemon.id)}
                    className={`cursor-pointer border-none rounded-sm py-1 px-1.5 text-white hover:opacity-80 btn-bkgd-secondary transition-all duration-200`}>
                    Remove
                </button>
            </div>

            <section className='col-start-1 col-end-3 mt-7'>
                <StatVisualizer chartData={chartData} statLabels={statLabels} />
            </section>
        </div>
    )
}

export default ComparisonCard