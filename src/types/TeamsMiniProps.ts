import { type Teams, type PokeTeam } from "./models"

export interface TeamsMiniProps {
    teams: Teams | null,
    currentTeams: PokeTeam[],
    teamsTotalPages: number,
    goToPrevTeamsPage: () => void,
    teamsPage: number,
    goToNextTeamsPage: () => void,
    nameInputs: Record<string, string>
    setNameInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>
    setTeams: React.Dispatch<React.SetStateAction<Teams | null>>
}