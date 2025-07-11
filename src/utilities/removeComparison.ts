import type { Comparison } from "../types/models";

export const removeComparison = async (comparisonToRemove: Comparison, token: string, comparisons: Comparison[]) => {

    const filtered = comparisons?.filter((c) => c._id !== comparisonToRemove._id);
    console.log('filtered comparison:', filtered);

    try {
        console.log('starting fetch')
        await fetch('/api/profile/comparisons/remove', {
            'method': 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comparisons: filtered,
            })
        })
    } catch (error) {
        console.log(error);
    }
    return filtered
};