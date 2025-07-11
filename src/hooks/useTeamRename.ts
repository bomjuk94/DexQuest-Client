import type { RenameTeamProps } from "../types/RenameTeamProps";
import { showToast } from "../utilities/toast";
import { apiFetch } from "../utilities/api";

export const useTeamRename = () => {
    const renameTeam = async ({
        e,
        nameInputs,
        token,
        team,
        setTeams,
    }: RenameTeamProps) => {
        e.preventDefault();

        const name = nameInputs[team._id];

        if (!name || name.trim() === '') {
            return showToast('error', 'Need a team name');
        }

        const res = await apiFetch('/api/profile/teams/name/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                teamId: team._id,
                name,
            }),
        });

        const data = await res.json();

        if (data.error) {
            return showToast('error', data.error);
        }

        if (res.status === 200) {
            showToast('success', 'Team name successfully updated!');
            localStorage.removeItem('team-storage');

            setTeams((prevTeams) => {
                if (!prevTeams) return prevTeams;

                return prevTeams.map((t) =>
                    t._id === team._id
                        ? { ...t, name }
                        : t
                );
            });
        }
    }

    return { renameTeam }
}