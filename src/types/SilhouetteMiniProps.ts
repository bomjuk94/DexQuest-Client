export interface SilhouetteMiniProps {
    silhouettes: never[],
    silhouetteHighScore: number,
    silhouetteAverageScore: number,
    currentSilhouette: never[],
    silhouetteTotalPages: number,
    goToPrevSilhouettePage: () => void,
    silhouettePage: number,
    setSilhouettes: React.Dispatch<React.SetStateAction<never[]>>,
    goToNextSilhouettePage: () => void,
}