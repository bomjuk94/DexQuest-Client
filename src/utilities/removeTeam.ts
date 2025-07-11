import type { Teams } from "../types/models";
import { apiFetch } from "./api";

export const removeTeam = async (teamToRemove: Teams[number], token: string, teams: Teams) => {

    const filtered = teams?.filter((t) => t._id !== teamToRemove._id);
    console.log('filtered team:', filtered);


    try {
        console.log('starting fetch')
        await apiFetch('/api/profile/teams/remove', {
            'method': 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teams: filtered,
            })
        })
    } catch (error) {
        console.log(error);
    }
    return filtered
};