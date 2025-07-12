import { type Comparison } from "./models";

export interface ComparisonsMiniProps {
    comparisons: never[],
    currentComparisons: Comparison[],
    comparisonNameInputs: Record<string, string>,
    setComparisonNameInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setComparisons: React.Dispatch<React.SetStateAction<Comparison[]>>,
    comparisonsTotalPages: number,
    goToPrevComparisonsPage: () => void,
    comparisonsPage: number,
    goToNextComparisonsPage: () => void,
}