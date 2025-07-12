import type { Comparison } from "./models"

export interface RenameComparisonProps {
    e: React.FormEvent
    comparisonNameInputs: Record<string, string>
    comparison: Comparison
    token: string | null
    setComparisons: React.Dispatch<React.SetStateAction<Comparison[]>>,
}