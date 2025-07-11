import { type PokeTeam, type Teams } from "./models"

export interface RenameTeamProps {
    e: React.FormEvent,
    nameInputs: Record<string, string>,
    token: string | null,
    team: PokeTeam,
    setTeams: React.Dispatch<React.SetStateAction<Teams | null>>
}