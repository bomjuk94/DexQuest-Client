export const useStatChangeHandler = () => {
    const updateStatChange = (e: React.ChangeEvent<HTMLSelectElement>, setStat: React.Dispatch<React.SetStateAction<string>>) => {
        if (e.target.value === null) return
        setStat(e.target.value)
    }

    return { updateStatChange }
}