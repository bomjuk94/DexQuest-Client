import { type CompareObj } from "../stores/pokemonComparisonStore";

export interface ComparisonSubmitProps {
    e: React.FormEvent,
    token: string | null,
    pokeToCompare: CompareObj[],
    comparisonCount: number,
    comparisonNameRef: React.RefObject<HTMLInputElement | null>,
    formRef: React.RefObject<HTMLFormElement | null>,
}