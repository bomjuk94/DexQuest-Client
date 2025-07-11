import { type Team } from "./models"

export interface CardProps {
    card: Team | null
    dragHandleCallbackRef?: (node: HTMLDivElement | null) => void
    dragHandleListeners?: React.HTMLAttributes<HTMLDivElement>
}