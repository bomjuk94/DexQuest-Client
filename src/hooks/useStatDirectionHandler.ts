import { useStatDirectionChangeHandler } from "./useStatDirectionChangeHandler"

export const useStatDirectionHandler = () => {
    const { updateStatDirection } = useStatDirectionChangeHandler()

    const handleStatDirectionChange = (
        stat: string, direction: string, setStatDirection: React.Dispatch<React.SetStateAction<{
            stat: string;
            direction: string;
        }>>
    ) => {
        updateStatDirection(stat, direction, setStatDirection)
    }

    return { handleStatDirectionChange }
}