import React from 'react'
import PokemonCard from './PokemonCard'
import type { FC } from 'react'
import type { PokemonEvolutionProps } from '../types/models/Pokemon'

const EvolutionChain: FC<PokemonEvolutionProps> = ({ pokemonEvolutions }) => {
    if (!Array.isArray(pokemonEvolutions) || pokemonEvolutions.length === 0) return null


    return (
        <section className="mt-20 mx-auto max-w-[800px] flex flex-col items-center">
            <h4 className='text-xl font-medium mb-4 text-primary'>Evolutions</h4>
            <div className="flex flex-wrap justify-center gap-6 px-4">
                {pokemonEvolutions.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        context="detail"
                    />
                ))}
            </div>
        </section>
    )
}

export default React.memo(EvolutionChain)
