import { useEffect } from "react"

export const useCommonTypes = (favouritesList, setFavouritesCommonTypes, setFavouritesTypes) => {
    useEffect(() => {
        if (favouritesList.length === 0) return;

        const counts: Record<string, number> = {};
        let maxCount = 0;

        for (let index = 0; index < favouritesList.length; index++) {
            for (const t of favouritesList[index].types) {
                const typeName = t.type.name;
                counts[typeName] = (counts[typeName] || 0) + 1;
                if (counts[typeName] > maxCount) {
                    maxCount = counts[typeName];
                }
            }
        }

        const mostCommonTypes = Object.keys(counts).filter((type) => counts[type] === maxCount);
        setFavouritesCommonTypes(mostCommonTypes);

        const typeSet = new Set<string>();
        for (let index = 0; index < favouritesList.length; index++) {
            for (const t of favouritesList[index].types) {
                typeSet.add(t.type.name);
            }
        }

        setFavouritesTypes(Array.from(typeSet));
    }, [favouritesList, setFavouritesCommonTypes, setFavouritesTypes]);
}