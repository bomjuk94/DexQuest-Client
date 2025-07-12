import { useEffect, useState } from "react";
import type { Pokemon } from "../types/models";
import { apiFetch } from "../utilities/api";

export function useFetchAllPokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [paginationReady, setPaginationReady] = useState(false)

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await apiFetch('/api/pokemon/light');

                if (res.status === 200) {
                    const data = await res.json();
                    setPokemonList(data);
                    setPaginationReady(true);
                    setLoading(false);
                } else {
                    const errorText = await res.text();
                    throw new Error(errorText || 'Failed to fetch Pokémon');
                }
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchPokemon();
    }, []);


    return { pokemonList, loading, error, paginationReady, setLoading };
}

