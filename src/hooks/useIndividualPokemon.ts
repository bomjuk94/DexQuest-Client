import { useState, useEffect } from "react";
import type { Pokemon } from "../types/models";
import { apiFetch } from "../utilities/api";

export const useIndividualPokemon = (id: string | undefined) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvididualPokemon = async () => {
            try {
                const res = await apiFetch('/api/pokemon/individual', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pokeId: id,
                    })
                })
                if (res.status === 200) {
                    const data = await res.json()
                    setPokemon(data)
                }

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchInvididualPokemon()

    }, [id])

    return { pokemon, loading, error }
}