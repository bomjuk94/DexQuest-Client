import { useEffect, useState } from "react";
import type { Pokemon } from "../types/models";
import { apiFetch } from "../utilities/api";

export function useFetchAllPokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [paginationReady, setPaginationReady] = useState(false)
    const limit = 50

    useEffect(() => {
        const fetchPokemon = async () => {

            if (total > 0 && pokemonList.length >= total) return

            try {
                const res = await apiFetch(`/api/pokemon/light?limit=${limit}&offset=${offset}`)

                if (res.status === 200) {
                    const { data, total: newTotal } = await res.json();
                    setPokemonList((prev) => [...prev, ...data]);
                    if (total === null || pokemonList.length + data.length < newTotal) {
                        setOffset((prev) => prev + limit)
                    }
                    if (total === null) setTotal(newTotal)
                    setPaginationReady(true);
                    setLoading(false);
                } else {
                    const errorText = await res.text();
                    throw new Error(errorText || 'Failed to fetch Pokémon');
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false)
            }
        };

        fetchPokemon();

    }, [offset]);

    console.log('pokemon list length', pokemonList.length)

    // TODO: Fetch more pokemon only when user scrolls past the currently available pokemon
    // const triggerNextPage = () => {
    //     if (!loading && (total === null || pokemonList.length < total)) {
    //         setOffset((prev) => prev + limit)
    //     }
    // }


    return {
        pokemonList,
        loading,
        error,
        paginationReady,
        setLoading,
        // triggerNextPage,
    };
}

