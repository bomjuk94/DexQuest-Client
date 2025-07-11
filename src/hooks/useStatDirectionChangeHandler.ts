
export const useStatDirectionChangeHandler = () => {
    const updateStatDirection = (
        stat: string, direction: string, setStatDirection: React.Dispatch<React.SetStateAction<{
            stat: string;
            direction: string;
        }>>
    ) => {
        setStatDirection({ stat, direction })
    }

    return { updateStatDirection }
}