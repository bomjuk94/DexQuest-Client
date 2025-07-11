import { useSilhouetteGameStore } from "../stores/silhouetteGame/SilhouetteGameStore";
import { playBtnSound } from "../utilities/playBtnSounds";
import { useStartPhase } from "./useStartPhase";
import selectBtnClick from "../sounds/selectBtnClick.mp3";
import { stopMusic, setVolume } from "../utilities/musicManager";
import { useAudioStore } from "../stores/silhouetteGame/gameAudioStore";

type GameboyControlsBtnsProps = {
    initialized: React.RefObject<boolean>;
};

export const useGameBoyControlsBtns = ({ initialized }: GameboyControlsBtnsProps) => {
    const {
        nextPokemon,
        incrementHintValue,
        hintValue,
        disableAnswerBtns,
        setNextPokemon,
        setNextHint,
        setQuit,
        setReset,
        setStart,
    } = useSilhouetteGameStore();

    const { toggleMuted } = useAudioStore();
    const gameStarted = useStartPhase();

    const handleNext = () => {
        if (nextPokemon) {
            setNextPokemon()
            initialized.current = false;
        }
        playBtnSound(gameStarted, selectBtnClick, 0.3);
    };

    const handleHint = () => {

        if (disableAnswerBtns) return;

        if (hintValue === 0.8) {
            setNextHint()
        } else {
            incrementHintValue();
        }
        playBtnSound(gameStarted, selectBtnClick, 0.3);
    };

    const handleQuit = () => {
        setQuit()
        playBtnSound(gameStarted, selectBtnClick, 0.3);
        stopMusic();
    };

    const handleReset = () => {
        setReset()
        initialized.current = false;
        playBtnSound(gameStarted, selectBtnClick, 0.3);
    };

    const handleStart = () => {
        setStart()
        initialized.current = false;
    };

    const handleMute = () => {
        if (!gameStarted) return;

        const currentMuted = useAudioStore.getState().isMuted;
        const nextMuted = !currentMuted;

        toggleMuted();
        setVolume(nextMuted ? 0 : 0.025);
    };

    return [
        {
            name: "next",
            handler: handleNext,
        },
        {
            name: "hint",
            handler: handleHint,
        },
        {
            name: "reset",
            handler: handleReset,
        },
        {
            name: "quit",
            handler: handleQuit,
        },
        {
            name: "start",
            handler: handleStart,
        },
        {
            name: "mute",
            handler: handleMute,
        },
    ];
};
