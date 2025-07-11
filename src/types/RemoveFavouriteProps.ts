export interface RemoveFavouriteProps {
    id: number
    name: string
    token: string | null
    setFavouritesList: React.Dispatch<React.SetStateAction<Pokemon[]>>
}