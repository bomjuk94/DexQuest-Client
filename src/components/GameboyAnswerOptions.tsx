import { useSilhouetteGameStore } from '../stores/silhouetteGame/SilhouetteGameStore';
import { btnOptions, btnColours } from '../utilities/constants.tsx';
import { HandleAnswerBtnClick } from '../utilities/AnswerBtnClick';
import { useStartPhase } from '../hooks/useStartPhase';
import { type GameboyAnswerOptionsProps } from '../types/GameBoyAnswerOptionsProps';
import { useGameKeyboardEvent } from '../hooks/useGameKeyboardEvent';

const GameboyAnswerOptions = ({ randomPoke, options }: GameboyAnswerOptionsProps) => {
    const {
        disableAnswerBtns,
        correctlyAnswered,
        incorrectlyAnswered,
        setDisabledAnswerBtns,
        setGamePhase,
        gamePhases,
        round,
        setTally,
    } = useSilhouetteGameStore();

    const handleBtnClick = (btn: string) => {
        HandleAnswerBtnClick({
            btn,
            disableAnswerBtns,
            setDisabledAnswerBtns,
            options,
            randomPoke,
            correctlyAnswered,
            incorrectlyAnswered,
            gameStarted,
            setGamePhase,
            gamePhases,
            round,
            setTally,
        })
    };

    const gameStarted = useStartPhase()
    useGameKeyboardEvent(disableAnswerBtns, handleBtnClick);

    return (
        <div className="grid grid-cols-2 gap-2.5 mt-10">
            {btnOptions.map((btn, i) => (
                <button
                    onClick={() => handleBtnClick(btn)}
                    disabled={disableAnswerBtns}
                    className={`rounded-full ${btnColours[i]} shadow-inner shadow-black border-2 border-brand-rouge-dark flex items-center justify-center text-white font-bold text-base active:translate-y-[1px] transition-transform py-2 px-1.5 cursor-pointer uppercase focus:outline-none focus:ring-4 focus:ring-brand-dark-aqua`}
                    key={btn}
                >
                    {btn}
                </button>
            ))}
        </div>
    );
};

export default GameboyAnswerOptions;
