import { useState, useEffect } from "react"
import { useProtectedProfile } from "./useProtectedProfile"

export const useFetchComparisons = () => {

    const { token } = useProtectedProfile()
    const [comparisons, setComparisons] = useState([]);
    const [comparisonNameInputs, setComparisonNameInputs] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchComparisons = async () => {
            try {
                const compRes = await fetch("/api/profile/comparisons", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${token}`,
                    },
                });
                if (compRes.ok) {
                    const { comparisons } = await compRes.json();
                    const savedComparisons = comparisons.map((comp) => ({
                        _id: comp._id,
                        name: comp.name,
                        comparison: comp.comparison,
                    }));
                    setComparisons(savedComparisons);

                    const names: Record<string, string> = {};
                    comparisons.forEach((c: any) => {
                        names[c._id] = c.name || "";
                    });
                    setComparisonNameInputs(names);
                }

            } catch (err) {
                console.error(err);
            }
        }

        fetchComparisons()
    }, [token])

    return {
        comparisons,
        comparisonNameInputs,
        setComparisons,
        setComparisonNameInputs,
    }
}