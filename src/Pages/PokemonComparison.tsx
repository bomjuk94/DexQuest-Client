import { useFetchAllPokemon } from '../hooks/useFetchAllPokemon'
import PokemonList from '../components/PokemonList'
import PokeballSpinner from '../components/PokeballSpinner'
import Comparison from '../components/Comparison'
import { useModalStore } from '../stores/ModalStore'
import ScrollToTopButton from '../components/ScrollToTopButton'
import { Helmet } from 'react-helmet'

const PokemonComparison = () => {

    const { pokemonList, loading, error, paginationReady } = useFetchAllPokemon()
    const { isOpen } = useModalStore()

    if (error) return <p>Error: {error}</p>

    return (
        <>
            <Helmet>
                <title>Comparison - DexQuest</title>
                <meta name="description" content="Compare your favourite creatures side by side and save your comparisons for later." />
            </Helmet>

            <div className='bg-primary'>
                <section className='max-w-desktop mx-auto relative'>
                    <section className='flex flex-col gap-12 py-20 px-4'>
                        <h2 className='text-4xl text-primary'>DexQuest Comparison</h2>
                    </section>
                    <section className="content flex flex-col gap-20 px-4">
                        <section>
                            <Comparison />
                        </section>

                        <section>
                            {
                                loading ?
                                    <PokeballSpinner />
                                    :
                                    <PokemonList pokemonList={pokemonList} paginationReady={paginationReady} context="pokemon comparison" />
                            }
                        </section>
                    </section>
                    <div
                        className={`fixed top-0 right-0 left-0 bottom-0 bg-black opacity-0 -z-1 ease-in-out duration-500 ${isOpen ? 'opacity-60 z-40' : ''}`}
                    ></div>

                    <ScrollToTopButton />
                </section>
            </div>
        </>
    )
}

export default PokemonComparison