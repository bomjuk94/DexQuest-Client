import { type SetStateAction } from "react";
import { type Comparison } from "./models";

export interface ComparisonsListProps {
    comparisons: Comparison[],
    comparison: Comparison,
    comparisonNameInputs: Record<string, string>,
    setComparisonNameInputs: React.Dispatch<SetStateAction<Record<string, string>>>,
    setComparisons: React.Dispatch<React.SetStateAction<Comparison[]>>,
}