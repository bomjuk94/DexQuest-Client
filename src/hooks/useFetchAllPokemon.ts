import { useEffect, useState } from "react";
import type { Pokemon } from "../types/models";

export function useFetchAllPokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [paginationReady, setPaginationReady] = useState(false)

    useEffect(() => {
        try {
            const fetchPokemon = async () => {
                const res = await fetch('/api/pokemon/light')

                if (res.status === 200) {
                    const data = await res.json()
                    setPokemonList(data)
                    setPaginationReady(true)
                    setLoading(false)
                }
            }
            fetchPokemon()
        } catch (error) {
            setError(error)
        }
    }, [])

    return { pokemonList, loading, error, paginationReady, setLoading };
}

