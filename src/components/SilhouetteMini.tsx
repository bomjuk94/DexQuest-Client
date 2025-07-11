import SilhouetteList from "./SilhouetteList"
import { type SilhouetteMiniProps } from "../types/SilhouetteMiniProps"
import { useEffect } from "react"

const SilhouetteMini = ({
    silhouettes,
    silhouetteHighScore,
    silhouetteAverageScore,
    currentSilhouette,
    silhouetteTotalPages,
    goToPrevSilhouettePage,
    silhouettePage,
    setSilhouettes,
    goToNextSilhouettePage,
}: SilhouetteMiniProps) => {

    useEffect(() => {
        if (currentSilhouette.length === 0 && silhouettePage > 1) {
            goToPrevSilhouettePage();
        }
    }, [currentSilhouette, silhouettePage, goToPrevSilhouettePage]);

    return (
        <>
            <div className="flex flex-col gap-10">
                <h3 className="text-xl">Silhouette</h3>
                <div className="flex flex-col">
                    <p>Total Games: {silhouettes.length}</p>
                    <p>Highest Score: {silhouetteHighScore}</p>
                    <p>Average Score: {`${silhouetteAverageScore.toFixed(1)}%`}</p>
                </div>
                <div className="flex flex-col gap-4 dashboard-card-bkgd py-5 px-4 rounded-xl">
                    {currentSilhouette.length === 0 ? (
                        <p>No silhouette history yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-4">
                            {currentSilhouette.map((silhouette, i) => (
                                <SilhouetteList
                                    key={i}
                                    silhouettes={silhouettes}
                                    silhouette={silhouette}
                                    silhouettePage={silhouettePage}
                                    setSilhouettes={setSilhouettes}
                                />
                            ))}
                        </ul>
                    )}

                    {silhouetteTotalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-7">
                            <button
                                onClick={goToPrevSilhouettePage}
                                disabled={silhouettePage === 1}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Previous
                            </button>
                            <span>{silhouettePage} of {silhouetteTotalPages}</span>
                            <button
                                onClick={goToNextSilhouettePage}
                                disabled={silhouettePage === silhouetteTotalPages}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SilhouetteMini