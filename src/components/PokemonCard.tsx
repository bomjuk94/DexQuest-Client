import { useState } from 'react'
import { Link } from 'react-router'
import type { PokemonPreviewProps, PokemonCardProps, Pokemon } from '../types/models/Pokemon'
import { capitalizeName } from '../utilities/capitalizeName'
import { isElementalType, typeIcons } from '../utilities/getElementalType'
import AddToFavourite from './AddToFavourite'
import { useTeamStore } from '../stores/teamStore';
import { usePokemonComparisonStore } from '../stores/pokemonComparisonStore';
import { useTeamHandler } from '../hooks/useAddToTeam';
import { useIsTeamBuilder } from '../hooks/useIsTeamBuilder'
import { useIsPokemonComparison } from '../hooks/useIsPokemonComparison';
import { useComparisonAdd } from '../hooks/useComparisonAdd'

const PokemonCard = ({ pokemon, context = 'home' }: Pokemon & PokemonCardProps & PokemonPreviewProps) => {

    const { addToComparison } = usePokemonComparisonStore()
    const [showDetails, setShowDetails] = useState(false)
    const isHome = context === 'home'
    const currentClass = pokemon.current ? 'ring-4 ring-offset-2 ring-blue-500 shadow-xl' : ''
    const teamBuilder = useIsTeamBuilder({ location })
    const isPokemonComparison = useIsPokemonComparison({ location })
    const pokemonAdded = useTeamStore((state) => state.existsInTeam(pokemon.id));
    const pokemonComparisonAdded = usePokemonComparisonStore((state) => state.existsInComparison(pokemon.id));
    const { addComparePokemon } = useComparisonAdd()

    const { handleTeamAdd } = useTeamHandler()

    const handleTeamAddClick = (pokemon: Pokemon) => {
        handleTeamAdd(pokemon)
    }

    const handleComparisonAdd = (pokemon: Pokemon) => {
        addComparePokemon(pokemon, addToComparison)
    }

    const imageSrc = pokemon.sprites.front_default || pokemon.sprites.other?.["official-artwork"]?.front_default;

    return (
        <div
            className={`relative border-2 rounded-xl p-2 transition-all snap-center shrink-0 ${currentClass} border-primary shadow-md`}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            style={{ transition: 'background-color 0.3s ease' }}
        >
            <img
                src={imageSrc}
                alt={pokemon.name}
                className="w-sprite h-sprite bg-brand-antique-white"
                width={96}
                height={96}
                loading="lazy"
            />

            <div className="flex flex-col gap-3.5">
                <h3 className="decoration-none text-primary hover:underline text-lg w-sprite" style={{ transition: 'background-color 0.3s ease' }}>
                    <Link to={`/pokemon/${pokemon.id}`}>{capitalizeName(pokemon.name)}</Link>
                </h3>
            </div>

            {
                teamBuilder && (
                    <button
                        onClick={() => handleTeamAddClick(pokemon)}
                        disabled={pokemonAdded}
                        className={`border-none rounded-sm py-1 mt-1.5 px-1.5 w-full ${pokemonAdded ? 'btn-added-bkgd text-secondary cursor-default' : 'btn-text cursor-pointer btn-bkgd hover:opacity-80'}`}>
                        {pokemonAdded ?
                            'Added'
                            :
                            'Add'
                        }
                    </button>
                )
            }

            {
                isPokemonComparison && (
                    <button
                        onClick={() => handleComparisonAdd(pokemon)}
                        disabled={pokemonComparisonAdded}
                        className={`border-none rounded-sm py-1 mt-1.5 px-1.5 w-full ${pokemonComparisonAdded ? 'btn-added-bkgd text-secondary cursor-default' : 'btn-text cursor-pointer btn-bkgd hover:opacity-80'}`}>
                        {pokemonComparisonAdded ?
                            'Added'
                            :
                            'Add'
                        }
                    </button>
                )
            }

            <div
                className={`absolute bottom-0 left-0 w-full p-2 card-text shadow-md rounded-xl transition-all duration-300 ease-in-out z-50 bg-card ${showDetails
                    ? (teamBuilder || isPokemonComparison) ?
                        `opacity-100 ${isHome ? '-translate-y-18' : '-translate-y-21'} pointer-events-auto`
                        :
                        `opacity-100 ${isHome ? '-translate-y-9' : '-translate-y-21'} pointer-events-auto`
                    : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
            >
                <div className='relative'>
                    {pokemon.stats
                        .filter((s) => !['special-attack', 'special-defense'].includes(s.stat.name))
                        .map((stat) => (
                            <p key={stat.stat.name}>
                                <span>{capitalizeName(stat.stat.name)}</span>: {stat.base_stat}
                            </p>
                        ))}

                    <div className="flex gap-x-1">
                        <div className="flex flex-col gap-1">
                            Type/s
                            <div className="flex gap-1">
                                {pokemon.types.map(({ type }) => {
                                    const name = type.name
                                    if (isElementalType(name)) {
                                        const iconSrc = typeIcons[name]
                                        return (
                                            <div title={capitalizeName(name)} className="bg-gray-100 rounded-full p-1 shadow-sm " key={name}>
                                                <img
                                                    src={iconSrc}
                                                    alt={`${capitalizeName(name)} type icon`}
                                                    width={24}
                                                    height={24}
                                                    className="transition-transform duration-300 hover:scale-110"
                                                />
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    </div>
                    <AddToFavourite pokemon={pokemon} />
                </div>
            </div>
        </div>
    )
}

export default PokemonCard
