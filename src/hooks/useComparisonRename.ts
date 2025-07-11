import { showToast } from "../utilities/toast";
import { type RenameComparisonProps } from "../types/RenameComparisonProps";

export const useComparisonRename = () => {

    const renameComparison = async ({
        e,
        comparisonNameInputs,
        comparison,
        token,
        setComparisons
    }: RenameComparisonProps) => {
        e.preventDefault()

        const name = comparisonNameInputs[comparison._id];

        if (!name || name.trim() === '') {
            return showToast('error', 'Need a comparison name');
        }

        const res = await fetch('api/profile/comparisons/name/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                comparisonId: comparison._id,
                name,
            })
        })

        const data = await res.json();

        if (data.error) {
            return showToast('error', data.error);
        }

        if (res.status === 200) {
            showToast('success', 'Comparison name successfully updated!');

            setComparisons((prevComparisons) => {
                if (!prevComparisons) return prevComparisons;

                return prevComparisons.map((c) =>
                    c._id === comparison._id
                        ? { ...c, name }
                        : c
                );
            });
        }
    }

    return { renameComparison }
}