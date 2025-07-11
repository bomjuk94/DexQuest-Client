import { showToast } from "../utilities/toast"
import { useSaveSilhouetteProgress } from "./usesaveSilhouetteProgress"
import { type SaveGameProgressProps } from "../types/SaveGameProgressProps"

export const useSaveSilhouetteGameProgress = () => {

    const { saveProgress } = useSaveSilhouetteProgress()

    const saveGameProgress = ({
        action,
        token,
        correctGuesses,
        maxRounds,
        setTallyScore,
        setGameQuit,
        setReset,
    }: SaveGameProgressProps) => {
        if (action === 'save-play' || action === 'save-quit') {
            if (!token) {
                showToast('error', 'You need to log in to save game progress.')
                return
            }

            saveProgress({ token, correctGuesses, maxRounds, setTallyScore, setGameQuit, action })
        } else if (action === 'nosave-play') {
            setTallyScore(false)
            setReset()
        }
    }

    return { saveGameProgress }
}