import { useEffect, useRef } from "react";
import { useSilhouetteGameStore } from "../stores/silhouetteGame/SilhouetteGameStore";
import { useAudioStore } from "../stores/silhouetteGame/gameAudioStore";
import { playBtnSound } from "../utilities/playBtnSounds";
import { useStartPhase } from "./useStartPhase";
import selectBtnClick from '../sounds/selectBtnClick.mp3';
import { stopMusic, setVolume } from '../utilities/musicManager';
import { type UseHandleGameBoyKeysProps } from "../types/useHandleGameboyKeysProps";

export const useHandleGameBoyKeys = ({ initialized }: UseHandleGameBoyKeysProps) => {
    const storeActions = useSilhouetteGameStore();
    const { setStart, setQuit, setNextHint, setNextPokemon, setReset } = useSilhouetteGameStore()
    const audioActions = useAudioStore();
    const gameStartedRef = useRef(false);

    gameStartedRef.current = useStartPhase();

    useEffect(() => {
        const handleGlobalKeys = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            const storeState = useSilhouetteGameStore.getState();
            const audioState = useAudioStore.getState();

            if (key === "enter") {
                if (storeState.nextPokemon) {
                    setNextPokemon()
                    initialized.current = false;
                }
                playBtnSound(gameStartedRef.current, selectBtnClick, 0.3);
            }

            if (key === "h") {
                if (storeState.disableAnswerBtns) return;

                if (storeState.hintValue >= 0.8) {
                    setNextHint()
                } else {
                    storeActions.incrementHintValue();
                }
                playBtnSound(gameStartedRef.current, selectBtnClick, 0.3);
            }

            if (key === "r") {
                storeActions.incrementResetCount();
                setReset()
                initialized.current = false;
                playBtnSound(gameStartedRef.current, selectBtnClick, 0.3);
            }

            if (key === "q") {
                setQuit()
                playBtnSound(gameStartedRef.current, selectBtnClick, 0.3);
                stopMusic();
            }

            if (key === "s") {
                setStart()
                initialized.current = false;
            }

            if (key === "m") {
                if (!gameStartedRef.current) return;
                const currentMuted = audioState.isMuted;
                const nextMuted = !currentMuted;
                audioActions.toggleMuted();
                setVolume(nextMuted ? 0 : 0.025);
            }
        };

        window.addEventListener("keyup", handleGlobalKeys);
        return () => window.removeEventListener("keyup", handleGlobalKeys);
    }, [initialized]);
};
