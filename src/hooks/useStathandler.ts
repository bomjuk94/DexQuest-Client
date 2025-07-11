import { useStatChangeHandler } from "./useStatChangeHandler"

export const useStatHandler = () => {
    const { updateStatChange } = useStatChangeHandler()

    const handleStatChange = (e: React.ChangeEvent<HTMLSelectElement>, setStat: React.Dispatch<React.SetStateAction<string>>) => {
        updateStatChange(e, setStat)
    }

    return { handleStatChange }
}