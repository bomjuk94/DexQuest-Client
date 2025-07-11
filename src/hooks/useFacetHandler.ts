import { useHandleFacetChange } from "./useHandleFacetChange";
import type { SetStateAction } from "react";

export const useFacetHandler = () => {
    const { updateFacet } = useHandleFacetChange()

    const handleFacetChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setTypes: React.Dispatch<SetStateAction<string[]>>,
        types: string[]
    ) => {
        updateFacet(e, setTypes, types)
    }

    return { handleFacetChange }
}
