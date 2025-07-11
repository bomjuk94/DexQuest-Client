import { useSilhouetteGameStore } from "../stores/silhouetteGame/SilhouetteGameStore"

export function useStartPhase() {
    const { gamePhases } = useSilhouetteGameStore();

    if (gamePhases.start.val === 'start started') {
        return true;
    }
    return false;
}