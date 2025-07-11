import { useState, useEffect } from 'react'
import { capitalizeName } from '../utilities/capitalizeName'
import type { Pokemon } from '../types/models'

type EvolutionEntry = {
    name: string;
    requirement: string | null;
    branchIndex: number;
};

function getEvolutionRequirement(details: any[]): string | null {
    const d = details?.[0];
    if (!d) return null;
    if (d.min_level) return `Level ${d.min_level}`;
    if (d.item) return `Use ${capitalizeName(d.item.name)}`;
    if (d.trigger?.name === 'trade') return 'Trade';
    if (d.trigger?.name === 'use-item') return 'Use item';
    return 'Special condition';
}

function extractAllSpecies(
    chain: any,
    acc: EvolutionEntry[] = [],
    branchIndex = 0
): EvolutionEntry[] {
    if (!chain) return acc;

    acc.push({
        name: chain.species.name,
        requirement: getEvolutionRequirement(chain.evolution_details),
        branchIndex,
    });

    chain.evolves_to.forEach((evo: any, idx: number) => {
        extractAllSpecies(evo, acc, chain.evolves_to.length > 1 ? idx : branchIndex);
    });

    return acc;
}

export function usePokemonData(id: string | undefined) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonEvolutions, setPokemonEvolutions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null);

                const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                if (!res1.ok) throw new Error('Failed to fetch Pokémon');
                const pokemon: Pokemon = await res1.json();

                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
                if (!speciesRes.ok) throw new Error('Failed to fetch species info');
                const speciesData = await speciesRes.json();
                const evolutionChainUrl: string = speciesData?.evolution_chain?.url;

                const evolutionRes = await fetch(evolutionChainUrl);
                if (!evolutionRes.ok) throw new Error('Failed to fetch evolution chain');
                const evolutionChain = await evolutionRes.json();
                const speciesEntries = extractAllSpecies(evolutionChain.chain);

                const evolutionPromises = speciesEntries.map(async (entry) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.name}`);
                    if (!res.ok) return null;
                    const data = await res.json();
                    return {
                        ...data,
                        requirement: entry.requirement,
                        branchIndex: entry.branchIndex,
                        current: data.name === pokemon.name,
                    };
                });

                const evolutions = (await Promise.all(evolutionPromises)).filter(Boolean);

                setPokemon(pokemon);
                setPokemonEvolutions(evolutions);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    return { pokemon, pokemonEvolutions, loading, error };
}
