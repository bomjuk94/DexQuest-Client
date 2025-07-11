import { type Pokemon } from "./models";

export interface FavouritesMiniProps {
    favouritesList: Pokemon[] | undefined,
    favouritesCommonTypes: string[],
    favouritesSearchTerm: string,
    setFavouritesSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    setFavouritesTypesSelectTerm: React.Dispatch<React.SetStateAction<string>>,
    favouritesTypes: string[],
    currentFavourites: Pokemon[],
    favouritesTotalPages: number,
    setFavouritesList: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>,
    goToPrevFavouritesPage: () => void,
    favouritesPage: number,
    goToNextFavouritesPage: () => void,
}