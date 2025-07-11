export interface SpinnerProps {
    loader: React.RefObject<HTMLElement | null>
    itemsToShow: number
    hasMore: boolean
}