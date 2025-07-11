import TeamList from '../components/TeamList'
import PokemonList from '../components/PokemonList'
import { useFetchAllPokemon } from '../hooks/useFetchAllPokemon'
import PokeballSpinner from '../components/PokeballSpinner'
import { useModalStore } from '../stores/ModalStore'
import SaveTeam from '../components/SaveTeam'
import ScrollToTopButton from '../components/ScrollToTopButton'
import { Helmet } from 'react-helmet'

const TeamBuilder = () => {

    const { pokemonList, loading, error, paginationReady } = useFetchAllPokemon()
    const { isOpen } = useModalStore()

    if (error) return <p>Error: {error}</p>

    return (
        <>
            <Helmet>
                <title>Team Builder - DexQuest</title>
                <meta name="description" content="Build and customize your own team of creatures for battle and strategy." />
            </Helmet>

            <div className='bg-primary'>
                <div className='flex flex-col-reverse gap-20 sm:grid sm:grid-cols-[75%_25%] lg:grid-cols-[60%_40%] sm:gap-4 py-20 px-4 w-full relative max-w-desktop mx-auto'>
                    <div className='w-full flex flex-col gap-9'>
                        {
                            loading ?
                                <PokeballSpinner />
                                :
                                <PokemonList pokemonList={pokemonList} paginationReady={paginationReady} context="team builder" />
                        }
                    </div>

                    <div className='w-full flex flex-col gap-12 items-center justify-start'>
                        <h2 className='text-2xl font-semibold text-primary'>Team</h2>

                        <TeamList />
                        <SaveTeam />
                    </div>
                </div>
                <div
                    className={`fixed top-0 right-0 left-0 bottom-0 bg-black opacity-0 -z-1 ease-in-out duration-500 ${isOpen ? 'opacity-60 z-40' : ''}`}
                ></div>
                <ScrollToTopButton />
            </div>
        </>
    )
}

export default TeamBuilder