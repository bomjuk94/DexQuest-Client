import { type StatSortState } from "../types/models/Filters";

export const isStatKey = (key: string): key is keyof StatSortState => {
    return ["hp", "attack", "defense", "speed", "weight"].includes(key);
};
