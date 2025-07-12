import { useState, useEffect } from "react";
import type { Pokemon } from "../types/models";
import { apiFetch } from "../utilities/api";

export const useIndividualPokemon = (id: number | undefined) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    console.log('sldkfj')

    useEffect(() => {
        if (!id) return;

        const fetchInvididualPokemon = async () => {
            setLoading(true);
            try {
                const res = await apiFetch('/api/pokemon/individual', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pokeId: id,
                    })
                });

                if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(msg || 'Failed to fetch Pokémon');
                }

                const data = await res.json();
                setPokemon(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvididualPokemon();

    }, [id]);

    return { pokemon, loading, error };
};
