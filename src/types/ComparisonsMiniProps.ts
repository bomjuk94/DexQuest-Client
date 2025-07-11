export interface ComparisonsMiniProps {
    comparisons: never[],
    currentComparisons: never[],
    comparisonNameInputs: Record<string, string>,
    setComparisonNameInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setComparisons: React.Dispatch<React.SetStateAction<never[]>>,
    comparisonsTotalPages: number,
    goToPrevComparisonsPage: () => void,
    comparisonsPage: number,
    goToNextComparisonsPage: () => void,
}