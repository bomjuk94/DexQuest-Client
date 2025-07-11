export const useResetForm = () => {
    const resetForm = (
        formRef: React.RefObject<HTMLFormElement | null>,
        setTypes: React.Dispatch<React.SetStateAction<string[]>>,
        setAlphabetDirection: React.Dispatch<React.SetStateAction<string>>,
        setStat: React.Dispatch<React.SetStateAction<string>>,
        minRefs: React.RefObject<HTMLInputElement[]>,
        maxRefs: React.RefObject<HTMLInputElement[]>,
        setReset: (val: boolean) => void,
    ) => {
        formRef.current?.reset()
        setTypes([])
        setAlphabetDirection('')
        setStat('')
        minRefs.current.forEach(input => input && (input.value = ''))
        maxRefs.current.forEach(input => input && (input.value = ''))
        setReset(false)
    }

    return { resetForm }
}