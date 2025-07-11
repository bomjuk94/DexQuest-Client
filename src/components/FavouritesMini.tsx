import { capitalizeName } from '../utilities/capitalizeName'
import FavouritesList from './FavouritesList'
import { type FavouritesMiniProps } from '../types/FavouriteMiniProps'

const FavouritesMini = ({
    favouritesList,
    favouritesCommonTypes,
    favouritesSearchTerm,
    setFavouritesSearchTerm,
    setFavouritesTypesSelectTerm,
    favouritesTypes,
    currentFavourites,
    favouritesTotalPages,
    setFavouritesList,
    goToPrevFavouritesPage,
    favouritesPage,
    goToNextFavouritesPage,
}: FavouritesMiniProps) => {
    return (
        <>
            <div className="flex flex-col gap-10">
                <h3 className="text-xl">Favourites</h3>
                <div className="flex flex-col">
                    <p>Total Favourites: {favouritesList.length}</p>
                    <p>
                        Most Common Elemental Type:{" "}
                        {favouritesCommonTypes.map((type, i) => (
                            <span key={type}>
                                {capitalizeName(type)}
                                {i < favouritesCommonTypes.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 dashboard-card-bkgd py-5 px-4 rounded-xl">
                    <input
                        value={favouritesSearchTerm}
                        onChange={(e) => setFavouritesSearchTerm(e.target.value)}
                        className="border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary"
                        placeholder="Search Favourites..."
                    />
                    <select
                        onChange={(e) => setFavouritesTypesSelectTerm(e.target.value)}
                        className="cursor-pointer border-2 rounded-sm bg-primary text-primary"
                    >
                        <option value="">All</option>
                        {favouritesTypes.map((type) => (
                            <option key={type} value={type}>
                                {capitalizeName(type)}
                            </option>
                        ))}
                    </select>

                    {currentFavourites.length === 0 ? (
                        <p>No favourites found.</p>
                    ) : (
                        <ul className="grid grid-cols-2 gap-y-4 gap-x-15 w-fit">
                            {currentFavourites.map((favourite, i) => (
                                <FavouritesList
                                    key={i}
                                    favourite={favourite}
                                    setFavouritesList={setFavouritesList}
                                />
                            ))}
                        </ul>
                    )}

                    {favouritesTotalPages > 1 && (
                        <div className="flex items-center gap-4 mt-7">
                            <button
                                onClick={goToPrevFavouritesPage}
                                disabled={favouritesPage === 1}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Previous
                            </button>
                            <span>{favouritesPage} of {favouritesTotalPages}</span>
                            <button
                                onClick={goToNextFavouritesPage}
                                disabled={favouritesPage === favouritesTotalPages}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FavouritesMini