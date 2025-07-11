import { useAudioStore } from "../stores/silhouetteGame/gameAudioStore";

export const playBtnSound = (gameStarted: boolean, sound: string, volume = 0.7) => {

    const isMuted = useAudioStore.getState().isMuted

    if (isMuted || !gameStarted) {
        return;
    }

    const audio = new Audio(sound);
    audio.volume = volume;
    audio.play().catch(err => console.error('Sound playback failed:', err));
};
