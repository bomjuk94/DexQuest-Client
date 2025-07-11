import type { Pokemon, StatsValues } from '../types/models/Pokemon'

export function filterLightweightPokemon(
    pokemonList: Pokemon[],
    searchTerm: string,
    typeTerms: string[],
    stats: StatsValues,
): Pokemon[] {

    return pokemonList.filter(pokemon => {
        const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())

        const typeMatch = typeTerms.length
            ? typeTerms.every(type =>
                pokemon.types.some(t => t.type.name.toLowerCase() === type)
            )
            : true

        const statsMatch = Object.entries(stats).every(([statKey, range]) => {
            const statObj = pokemon.stats.find(s => s.stat.name === statKey);
            if (!statObj) return false;

            const statValue = statObj.base_stat;
            const min = range.min !== '' ? parseInt(range.min) : null;
            const max = range.max !== '' ? parseInt(range.max) : null;

            if (min !== null && statValue < min) return false;
            if (max !== null && statValue > max) return false;

            return true;
        });
        return nameMatch && typeMatch && statsMatch
    })
}
