import { useSilhouetteGameStore } from "../stores/silhouetteGame/SilhouetteGameStore"
import { apiFetch } from "../utilities/api"

type SaveProgressProps = {
    token: string,
    correctGuesses: number,
    maxRounds: number,
    setTallyScore: (val: boolean) => void
    setGameQuit: (val: boolean) => void
    action: string
}

export const useSaveSilhouetteProgress = () => {

    const { setReset } = useSilhouetteGameStore()

    const saveProgress = async ({ token, correctGuesses, maxRounds, setTallyScore, setGameQuit, action }: SaveProgressProps) => {
        const res = await apiFetch('/api/profile/silhouette/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                game: {
                    score: correctGuesses,
                    correctGuesses,
                    totalGuesses: maxRounds,
                    gameTime: new Date()
                }
            })
        })

        if (res.status === 200) {
            setTallyScore(false)
            if (action === 'save-quit') {
                setGameQuit(true)
            } else if (action === 'save-play') {
                setReset()
            }
        }
    }

    return {
        saveProgress,
    }
}