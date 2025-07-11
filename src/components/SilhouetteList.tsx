import { convertUTC } from '../utilities/convertUTC'
import { removeSilhouette } from '../utilities/removeSilhouette'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { type SilhouetteListProps } from '../types/SilhouetteListProps'

const SilhouetteList = ({ silhouettes, silhouette, silhouettePage, setSilhouettes }: SilhouetteListProps) => {

    const { token } = useProtectedProfile()

    const handleSilhouetteRemove = async () => {
        if (silhouettes) {
            const updated = await removeSilhouette(silhouette, token, silhouettes)
            setSilhouettes(updated || [])
        }
    }

    return (
        <div>
            <ul className='flex flex-col gap-4'>
                <p>Game {silhouettePage}</p>
                <li className='flex flex-col gap-1'>
                    <p>
                        Round: {silhouette.game.correctGuesses}/{silhouette.game.totalGuesses}
                    </p>
                    <p>
                        Date and Time: {convertUTC(silhouette.game.gameTime)}
                    </p>
                </li>
                <button onClick={() => handleSilhouetteRemove(silhouette)}
                    className='text-xs btn-bkgd-secondary btn-text py-1 px-2 rounded-sm hover:opacity-80 cursor-pointer mt-1'>
                    Delete
                </button>
            </ul>
        </div>
    )
}

export default SilhouetteList