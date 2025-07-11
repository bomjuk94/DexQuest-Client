import { useStartPhase } from '../hooks/useStartPhase'
import { useBootingPhase } from '../hooks/useBootingPhase'

const GameBoyCartridge = () => {

    const gameStarted = useStartPhase()
    const booting = useBootingPhase()

    return (
        <div className='flex justify-center'>
            <div className='flex justify-between items-center bg-brand-green h-8 w-4/5 py-1 px-5'>
                <p className='text-white'>
                    Silhouette game V1
                </p>
                <span className={`w-2.5 h-2.5 ${(gameStarted || booting) ? 'bg-brand-dark-fire' : 'bg-brand-gray'} rounded-full`}>
                </span>
            </div>
        </div>
    )
}

export default GameBoyCartridge