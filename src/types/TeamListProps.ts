import { type SetStateAction } from "react";
import { type PokeTeamMember, type Teams } from "./models";

export interface TeamsListProps {
    team: {
        _id: string;
        name: string;
        team: PokeTeamMember[];
    },
    teams: Teams,
    nameInputs: Record<string, string>,
    setNameInputs: React.Dispatch<SetStateAction<Record<string, string>>>,
    setTeams: React.Dispatch<SetStateAction<[]>>,
}