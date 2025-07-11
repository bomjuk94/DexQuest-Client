import { useComparisonRename } from "./useComparisonRename"
import { type RenameComparisonProps } from "../types/RenameComparisonProps"

export const useComparisonRenameHandler = () => {
    const { renameComparison } = useComparisonRename()

    const handleComparisonRename = ({
        e,
        comparisonNameInputs,
        comparison,
        token,
        setComparisons
    }: RenameComparisonProps) => {
        renameComparison({
            e,
            comparisonNameInputs,
            comparison,
            token,
            setComparisons
        })
    }

    return { handleComparisonRename }
}