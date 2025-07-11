import type { SetStateAction } from "react"

export const useHandleFacetChange = () => {

    const updateFacet = (
        e: React.ChangeEvent<HTMLInputElement>,
        setTypes: React.Dispatch<SetStateAction<string[]>>,
        types: string[]
    ) => {
        const { value, checked } = e.target
        if (checked) {
            setTypes([...types, value])
        } else {
            setTypes(prev => prev.filter((item) => item !== value))
        }
    }
    return { updateFacet }
}