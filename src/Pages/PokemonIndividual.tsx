import { useParams } from 'react-router'
import Pokeball from '../assets/poke-ball.png'
import { capitalizeName } from '../utilities/capitalizeName'
import EvolutionChain from '../components/EvolutionChain'
import { generateChartData } from '../utilities/chartData'
import StatVisualizer from '../components/StatVisualizer'
import { useIndividualPokemon } from '../hooks/useIndividualPokemon'
import AddToFavourite from '../components/AddToFavourite'
import { Helmet } from 'react-helmet'

const PokemonIndividual = () => {

    const { id } = useParams()
    const { pokemon, loading, error } = useIndividualPokemon(id)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const image = pokemon?.sprites?.["official-artwork"]
    const pokemonTypes = pokemon?.types
    const pokemonAbilities = pokemon?.abilities
    const pokemonMoves = pokemon?.moves
    const statIndices = [0, 1, 2, 5]
    const { statLabels, chartData } = generateChartData(pokemon)

    if (!pokemon || !pokemonAbilities || !pokemonTypes || !pokemonMoves) return null

    return (
        <>
            <Helmet>
                <title>Creature Details - DexQuest</title>
                <meta name="description" content="View detailed stats and info about a creature, and add it to your favourites list." />
            </Helmet>

            <div className='bg-primary'>
                <div className='py-20 px-4 my-0 mx-auto max-w-individual'>
                    <h2 className='text-center mb-16 text-5xl text-primary'>
                        {capitalizeName(pokemon.name)}
                    </h2>
                    <div className='flex flex-col gap-16 sm:gap-15 items-center'>
                        <div className="flex flex-col sm:flex sm:flex-row gap-6 justify-center">
                            <div className='relative'>
                                <img
                                    src={image ?? Pokeball}
                                    alt={capitalizeName(pokemon.name)}
                                    className='w-md h-auto object-contain rounded-xl bg-secondary'
                                />

                                <AddToFavourite pokemon={pokemon} />
                            </div>

                            <div className='flex flex-col items-center phone:grid phone:grid-cols-2 phone:items-start  flex-wrap justify-center sm:flex sm:flex-col gap-7 text-primary'>
                                <div className="flex flex-col gap-2.5 w-full items-center sm:items-start">
                                    <h3 className="text-xl font-medium">Stats</h3>
                                    <div className="flex flex-col gap-1 w-full items-center sm:items-start">
                                        {statIndices.map((index, i) => (
                                            <p key={i}>{statLabels[i]}: <span>{pokemon.stats[index].base_stat}</span></p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5 w-full items-center sm:items-start">
                                    <h3 className="text-xl font-medium">Abilities</h3>
                                    <div className="flex flex-col gap-1 w-full items-center sm:items-start">
                                        {pokemonAbilities.map((ability, i) => (
                                            <p key={i}>{capitalizeName(ability.ability.name)}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5 w-full items-center sm:items-start">
                                    <h3 className="text-xl font-medium">Types</h3>
                                    <div className="flex flex-col gap-1 sm:items-start">
                                        {pokemonTypes.map((type, i) => (
                                            <p key={i}>{capitalizeName(type.type.name)}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5 w-full items-center sm:items-start">
                                    <h3 className="text-xl font-medium">Moves</h3>
                                    <div className="flex flex-col gap-1 h-28 pr-2.5 overflow-auto sm:items-start">
                                        {pokemonMoves.map((move, i) => (
                                            <p key={i} className='move'>
                                                {capitalizeName(move.move.name.replace(/-/g, " "))}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StatVisualizer chartData={chartData} statLabels={statLabels} />
                    </div>
                    <EvolutionChain pokemonEvolutions={pokemon.evolution} branchIndex={undefined} borderColor='border-transparent' />
                </div>
            </div>
        </>
    )
}

export default PokemonIndividual
