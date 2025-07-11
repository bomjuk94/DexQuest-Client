import { type Team } from "./models"

export interface SaveTeamProps {
    e: React.FormEvent,
    token: string | null,
    teamLength: number,
    team: Team[],
    teamNameRef: React.RefObject<string | null>,
    formRef: React.RefObject<null>
}