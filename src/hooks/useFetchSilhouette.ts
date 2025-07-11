import { useState, useEffect } from 'react'
import { useProtectedProfile } from './useProtectedProfile'

export const useFetchSilhouette = () => {

    const { token } = useProtectedProfile();
    const [silhouettes, setSilhouettes] = useState([]);
    const [silhouetteHighScore, setSilhouetteHighScore] = useState(0);
    const [silhouetteAverageScore, setSilhouetteAverageScore] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchSilhouette = async () => {
                const silRes = await fetch("/api/profile/silhouette", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${token}`,
                    }
                });

                if (silRes.ok) {
                    const { silhouetteGameHistory } = await silRes.json();
                    if (Array.isArray(silhouetteGameHistory) && silhouetteGameHistory.length > 0) {
                        const savedGames = silhouetteGameHistory.map((game) => ({
                            _id: game._id,
                            game: game.game,
                        }));
                        setSilhouettes(savedGames);

                        let high = 0, sum = 0;
                        for (const entry of silhouetteGameHistory) {
                            sum += entry.game.score;
                            if (entry.game.score > high) high = entry.game.score;
                        }

                        setSilhouetteHighScore(high);
                        setSilhouetteAverageScore(((sum / silhouetteGameHistory.length) / 10) * 100);
                    }
                }
            }

            fetchSilhouette()
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }, [token])

    return {
        silhouettes,
        setSilhouettes,
        silhouetteHighScore,
        silhouetteAverageScore,
        error,
        loading,
    }

}