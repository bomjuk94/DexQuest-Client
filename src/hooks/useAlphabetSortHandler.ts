import { useAlphabetSortChangeHandler } from "./useAlphabetSortChangeHandler";

export const useAlphabetSortHandler = () => {
    const { updateAlphabetSort } = useAlphabetSortChangeHandler()

    const handleAlphabetSortChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        setAlphabetDirection: React.Dispatch<React.SetStateAction<string>>
    ) => {
        updateAlphabetSort(e, setAlphabetDirection)
    }

    return { handleAlphabetSortChange }
}