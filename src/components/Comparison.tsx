import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { usePokemonComparisonStore } from '../stores/pokemonComparisonStore'
import ComparisonCard from './ComparisonCard'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { useGetComparison } from '../hooks/useGetComparison'
import { useComparisonSubmit } from '../hooks/useComparisonSubmit'
import PokeballSpinner from './PokeballSpinner'

const Comparison = () => {
    const { token } = useProtectedProfile()
    const comparisonCount = 2
    const {
        pokeToCompare,
        setComparison,
    } = usePokemonComparisonStore()

    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const comparisonNameRef = useRef<HTMLInputElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const { getComparison } = useGetComparison()
    const { submitComparison } = useComparisonSubmit()

    const padded = [...pokeToCompare];
    while (padded.length < comparisonCount) {
        padded.push(null);
    }

    useEffect(() => {
        const comparisonId = searchParams.get("id");

        if (!comparisonId || !token) {
            setLoading(false);
            return;
        }

        getComparison(
            searchParams,
            token,
            setLoading,
            comparisonNameRef,
            setComparison
        );
    }, [searchParams, token, setComparison]);


    const handleComparisonSubmit = (e: React.FormEvent) => {
        submitComparison({
            e,
            token,
            pokeToCompare,
            comparisonCount,
            comparisonNameRef,
            formRef,
        })
    }

    useEffect(() => {
        if (pokeToCompare.length === 0 && comparisonNameRef.current) {
            comparisonNameRef.current.value = ''
        }
    }, [pokeToCompare.length])

    if (loading) {
        return (
            <PokeballSpinner />
        )
    }

    return (
        <div className="flex flex-col gap-20 sm:grid sm:grid-cols-2 sm:gap-8">
            {padded.map((poke, i) => (
                <ComparisonCard poke={poke} key={poke?.id ?? `empty-${i}`} />
            ))}

            <form
                onSubmit={handleComparisonSubmit}
                ref={formRef}
                className="flex flex-col gap-2.5 w-full sm:col-span-2"
            >
                <input
                    ref={comparisonNameRef}
                    className="border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary"
                    placeholder="Team name..."
                    type="text"
                />

                <input
                    type="submit"
                    value="Save Comparison"
                    className="text-xs btn-text btn-bkgd-secondary cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80"
                />
            </form>
        </div>
    )
}

export default Comparison
