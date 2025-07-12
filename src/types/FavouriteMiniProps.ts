import { type Pokemon } from "./models";

export interface FavouritesMiniProps {
    favouritesList: Pokemon[],
    favouritesCommonTypes: string[],
    favouritesSearchTerm: string,
    setFavouritesSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    setFavouritesTypesSelectTerm: React.Dispatch<React.SetStateAction<string>>,
    favouritesTypes: string[],
    currentFavourites: Pokemon[],
    favouritesTotalPages: number,
    setFavouritesList: React.Dispatch<React.SetStateAction<Pokemon[]>>,
    goToPrevFavouritesPage: () => void,
    favouritesPage: number,
    goToNextFavouritesPage: () => void,
}