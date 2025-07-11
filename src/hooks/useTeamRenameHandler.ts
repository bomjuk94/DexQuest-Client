import type { RenameTeamProps } from "../types/RenameTeamProps"
import { useTeamRename } from "./useTeamRename"

export const useTeamRenameHandler = () => {

    const { renameTeam } = useTeamRename()

    const handleTeamRename = ({
        e,
        nameInputs,
        token,
        team,
        setTeams,
    }: RenameTeamProps) => {
        renameTeam({
            e,
            nameInputs,
            token,
            team,
            setTeams,
        })
    }

    return { handleTeamRename }
}