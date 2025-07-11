
export const useAlphabetSortChangeHandler = () => {
    const updateAlphabetSort = (
        e: React.ChangeEvent<HTMLSelectElement>,
        setAlphabetDirection: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const { value } = e.target
        if (value !== '') setAlphabetDirection(value)
    }

    return { updateAlphabetSort }
}