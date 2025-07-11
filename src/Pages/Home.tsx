import React from 'react'
import PokemonList from '../components/PokemonList'
import PokeballSpinner from '../components/PokeballSpinner'
import { useFetchAllPokemon } from '../hooks/useFetchAllPokemon'
import ScrollToTopButton from '../components/ScrollToTopButton'
import { Helmet } from 'react-helmet'

const Home: React.FC = () => {

    const { pokemonList, loading, error } = useFetchAllPokemon()

    if (error) return <p>Error: {error}</p>

    return (
        <>
            <Helmet>
                <title>Home - DexQuest</title>
                <meta name="description" content="Welcome to DexQuest — explore and learn about a wide variety of unique creatures." />
            </Helmet>

            <div className='flex flex-col gap-20 items-center my-0 mx-auto py-20 px-4 max-w-desktop relative'>
                {
                    loading ?
                        <PokeballSpinner />
                        :
                        <PokemonList pokemonList={pokemonList} />
                }
                <ScrollToTopButton />
            </div>
        </>
    )
}

export default Home