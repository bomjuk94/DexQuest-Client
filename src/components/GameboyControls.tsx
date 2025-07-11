import { useAudioStore } from '../stores/silhouetteGame/gameAudioStore'
import { useGameBoyControlsBtns } from '../hooks/useGameBoyControlsBtns'
import { capitalizeName } from '../utilities/capitalizeName'
import { useHandleGameBoyKeys } from '../hooks/useGameBoyKeys'
import { type GameboyControlsProps } from '../types/GameboyControlsProps'

const GameboyControls = ({ initialized }: GameboyControlsProps) => {

    const { isMuted } = useAudioStore();
    const controlBtns = useGameBoyControlsBtns({ initialized })
    useHandleGameBoyKeys({ initialized })

    return (
        <div className='grid grid-cols-2 gap-1.5 mt-20'>
            {
                controlBtns.map((btn) => {
                    return (
                        <button
                            onClick={btn.handler}
                            key={btn.name}
                            className="px-3 py-1 rounded-full bg-brand-dim-gray text-white text-xs font-semibold shadow-inner shadow-black border border-brand-dim-gray active:translate-y-[1px] transition-transform duration-50 uppercase cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-dark-aqua">
                            {btn.name === 'mute' ? isMuted ? 'Unmute' : 'Mute' : capitalizeName(btn.name)}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default GameboyControls