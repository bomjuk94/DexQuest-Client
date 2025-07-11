import { type SortDirection } from "../types/models/Filters";

export const isStatDirection = (direction: string): direction is SortDirection => {
    return ['asc', 'desc', 'none'].includes(direction)
};
