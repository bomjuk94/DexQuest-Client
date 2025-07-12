import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useFavouritesStore } from '../stores/favouritesStore';
import { useIsFavourite } from '../hooks/useIsFavourite';
import type { PokemonPreviewProps } from '../types/models/Pokemon';
import { useProtectedProfile } from '../hooks/useProtectedProfile';
import { useToggleFavourite } from "../hooks/useToggleFavourite";

const AddToFavourite = ({ pokemon }: PokemonPreviewProps) => {

    const { token, loading } = useProtectedProfile()
    const addFavourite = useFavouritesStore((s) => s.addFavourite);
    const removeFavourite = useFavouritesStore((s) => s.removeFavourite);
    const isFavourite = useIsFavourite(pokemon.id);
    const { updateFavourite } = useToggleFavourite()

    const toggleFavourite = () => {
        updateFavourite({
            loading,
            token,
            isFavourite,
            removeFavourite,
            addFavourite,
            pokemon
        })
    };

    return (
        <div className='absolute top-1.5 right-1.5'>
            {loading ? (
                <FaRegHeart className='w-5 h-5 text-gray-400' />
            ) : isFavourite ? (
                <FaHeart onClick={toggleFavourite} className='cursor-pointer w-5 h-5' />
            ) : (
                <FaRegHeart onClick={toggleFavourite} className='cursor-pointer w-5 h-5' />
            )}
        </div>
    )
}

export default AddToFavourite