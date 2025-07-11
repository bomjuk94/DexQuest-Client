import { showToast } from "../utilities/toast"
import { type ComparisonSubmitProps } from "../types/ComparisonSubmitProps"

export const useComparisonSubmit = () => {

    const submitComparison = ({
        e,
        token,
        pokeToCompare,
        comparisonCount,
        comparisonNameRef,
        formRef,
    }: ComparisonSubmitProps) => {
        e.preventDefault()

        if (!token) {
            showToast('error', 'You need to log in to save a comparison.')
            return
        }

        if (pokeToCompare.length != comparisonCount) {
            showToast("error", "At least 2 creatures are needed to save a comparison")
        }

        if (comparisonNameRef?.current?.value === '') {
            showToast("error", "You need to add a comparison name to save")
        }

        if (
            pokeToCompare.length === comparisonCount &&
            !pokeToCompare.includes(null) &&
            comparisonNameRef?.current?.value
        ) {
            const name = comparisonNameRef.current.value

            const comparisonList = pokeToCompare.map((poke) => ({
                id: poke.id,
                name: poke.name,
                image: poke.sprites.front_default,
            }))

            const addComparison = async () => {
                const res = await fetch("/api/profile/comparison/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        comparison: comparisonList,
                    }),
                })

                if (res.status === 200) {
                    showToast("success", "Comparison successfully added")
                    formRef.current?.reset()
                    localStorage.removeItem("pokemon-comparison-storage")
                } else {
                    showToast("error", "Failed to save comparison")
                }
            }

            addComparison()
        }
    }

    return { submitComparison }
}