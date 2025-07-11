export type StatSortState = {
    hp: SortDirection
    attack: SortDirection
    defense: SortDirection
    speed: SortDirection
    weight: SortDirection
}
export type SortDirection = 'none' | 'asc' | 'desc'