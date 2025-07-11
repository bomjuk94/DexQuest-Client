import { type CompareObj } from "../stores/pokemonComparisonStore";
import { apiFetch } from "../utilities/api";

export const useGetComparison = () => {
    const getComparison = async (
        searchParams: URLSearchParams,
        token: string | null,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        comparisonNameRef: React.RefObject<HTMLInputElement | null>,
        setComparison: (list: CompareObj[]) => void
    ) => {
        const comparisonId = searchParams.get("id");

        // 🚫 Guard clause: no id or token? Exit early
        if (!comparisonId || !token) {
            setLoading(false);
            return;
        }

        try {
            const res = await apiFetch(`/api/profile/comparisons/${comparisonId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (
                data?.comparison?.comparison &&
                Array.isArray(data.comparison.comparison)
            ) {
                const comparisons: number[] = data.comparison.comparison.map(
                    (poke) => poke.id
                );

                const res2 = await apiFetch("/api/pokemon/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ids: comparisons }),
                });

                if (res2.ok) {
                    const data2 = await res2.json();
                    setComparison(data2);
                }

                if (comparisonNameRef.current) {
                    comparisonNameRef.current.value = data.comparison.name;
                }
            } else {
                console.warn("Invalid comparison data format:", data);
            }
        } catch (error) {
            console.error("Failed to fetch saved comparison:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };

    return { getComparison };
};
