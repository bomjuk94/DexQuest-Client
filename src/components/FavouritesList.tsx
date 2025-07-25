import { capitalizeName } from '../utilities/capitalizeName'
import { Link } from 'react-router'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { type FavouritesListProps } from '../types/FavouritesListProps'

const FavouritesList = ({ favourite, setFavouritesList, }: FavouritesListProps) => {

    const { token } = useProtectedProfile()

    const imageSrc = favourite.sprites.front_default || favourite.sprites.other?.["official-artwork"]?.front_default;

    return (
        <li className='flex flex-col items-center gap-1.5'>
            <img
                src={imageSrc}
                alt={capitalizeName(favourite.name)}
                className='w-24 object-contain'
            />

            <Link
                to={`/pokemon/${favourite.id}`}
                className='hover:underline'
            >
                {capitalizeName(favourite.name)}
            </Link>

            <button
                onClick={() => handleFavouriteRemove({ id: favourite.id, name: favourite.name, token, setFavouritesList })}
                className='text-xs btn-bkgd-secondary btn-text py-1 px-2 rounded-sm hover:opacity-80 cursor-pointer mt-1'>
                Delete
            </button>
        </li>
    )
}

export default FavouritesList