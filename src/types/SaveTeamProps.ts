import { type RefObject } from "react"
import { type Team } from "./models"

export interface SaveTeamProps {
    e: React.FormEvent,
    token: string | null,
    teamLength: number,
    team: Team[],
    teamNameRef: RefObject<HTMLInputElement | null>,
    formRef: React.RefObject<null>
}