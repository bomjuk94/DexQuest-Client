import { useSilhouetteGameStore } from "../stores/silhouetteGame/SilhouetteGameStore"

export function useBootingPhase() {
    const { gamePhases } = useSilhouetteGameStore();

    if (gamePhases.booting.val === 'booting started') {
        return true
    }

    return false
}