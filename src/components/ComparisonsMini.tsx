import ComparisonsList from "./ComparisonsList"
import { type ComparisonsMiniProps } from "../types/ComparisonsMiniProps"

const ComparisonsMini = ({
    comparisons,
    currentComparisons,
    comparisonNameInputs,
    setComparisonNameInputs,
    setComparisons,
    comparisonsTotalPages,
    goToPrevComparisonsPage,
    comparisonsPage,
    goToNextComparisonsPage,
}: ComparisonsMiniProps) => {
    return (
        <>
            <div className="flex flex-col gap-10">
                <h3 className="text-xl">Comparisons</h3>
                <p>Total Comparisons: {comparisons.length}</p>
                <div className="flex flex-col gap-4 dashboard-card-bkgd py-5 px-4 rounded-xl">
                    {currentComparisons.length === 0 ? (
                        <p>No comparisons yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-4">
                            {currentComparisons.map((comparison) => (
                                <ComparisonsList
                                    key={comparison._id}
                                    comparisons={comparisons}
                                    comparison={comparison}
                                    comparisonNameInputs={comparisonNameInputs}
                                    setComparisonNameInputs={setComparisonNameInputs}
                                    setComparisons={setComparisons}
                                />
                            ))}
                        </ul>
                    )}

                    {comparisonsTotalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-7">
                            <button
                                onClick={goToPrevComparisonsPage}
                                disabled={comparisonsPage === 1}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Previous
                            </button>
                            <span>{comparisonsPage} of {comparisonsTotalPages}</span>
                            <button
                                onClick={goToNextComparisonsPage}
                                disabled={comparisonsPage === comparisonsTotalPages}
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

export default ComparisonsMini