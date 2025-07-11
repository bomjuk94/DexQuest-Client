import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import PokemonCard from '../components/PokemonCard';
import Filters from '../components/Filters';
import { usePokemonFilter } from '../hooks/usePokemonFilter';
import { useModalStore } from '../stores/ModalStore';
import { useProtectedProfile } from '../hooks/useProtectedProfile';
import { useFetchFavourites } from '../hooks/useFetchFavourites';
import { useFavouritesStore } from '../stores/favouritesStore';
import PokeballSpinner from '../components/PokeballSpinner';
import { Helmet } from 'react-helmet'

const Favourites = () => {

    const { error } = useProtectedProfile()
    const navigate = useNavigate();

    useEffect(() => {
        if (error === "sessionExpired") {
            navigate("/login?error=sessionExpired");
        }
    }, [error, navigate]);

    const { isOpen } = useModalStore()
    const { loading, favouritesError } = useFetchFavourites()
    const favouritesList = useFavouritesStore((state) => state.favourites);

    const {
        searchTerm,
        setSearchTerm,
        handleAdvancedClick,
        setSelectedFacets,
        setAlphabetSort,
        setStatsValues,
        filteredData,
        selectedStat,
        setSelectedStat,
        resetSort,
        statSort,
        updateSort,
        showAdvanced,
        setShowAdvanced,
        handleReset,
        currentItems,
    } = usePokemonFilter(favouritesList)

    if (favouritesError) return <p>Error: {favouritesError}</p>
    if (loading) return <PokeballSpinner />

    return (
        <>
            <Helmet>
                <title>Favourites Page - DexQuest</title>
                <meta name="description" content="Browse and manage your favourited Pokémon in one place." />
            </Helmet>

            <div className='bg-primary'>
                <div className={`flex flex-col gap-10 items-center my-0 mx-auto py-20 px-4 max-w-desktop`}>
                    <section className='flex flex-col gap-16 w-full max-w-5xl mx-auto relative'>
                        <h2 className='text-4xl text-primary'>Favourites</h2>

                        <div className='flex flex-col gap-3.5'>
                            <Filters
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleAdvancedClick={handleAdvancedClick}
                                setSelectedFacets={setSelectedFacets}
                                setAlphabetSort={setAlphabetSort}
                                setStatsValues={setStatsValues}
                                filteredData={filteredData}
                                selectedStat={selectedStat}
                                setSelectedStat={setSelectedStat}
                                resetSort={resetSort}
                                statSort={statSort}
                                updateSort={updateSort}
                                showAdvanced={showAdvanced}
                                setShowAdvanced={setShowAdvanced}
                                handleReset={handleReset}
                            />

                            {
                                currentItems.length > 0 ?
                                    <div className='grid grid-cols-2 phone:grid-cols-3 sm:grid-cols-4 justify-items-center gap-x-5 gap-y-8 mt-20'>
                                        {
                                            currentItems.map((p) => <PokemonCard pokemon={p} key={p.id} />)
                                        }
                                    </div>
                                    :
                                    <p className='text-primary mt-20'>
                                        There are no favourites...
                                    </p>
                            }
                        </div>
                    </section>
                </div>
            </div>
            <div
                className={`fixed top-0 right-0 left-0 bottom-0 bg-black opacity-0 -z-1 ease-in-out duration-500 ${isOpen ? 'opacity-60 z-40' : ''}`}
            ></div>
        </>
    )
}

export default Favourites