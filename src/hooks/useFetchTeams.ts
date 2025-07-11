import { useState, useEffect } from "react";
import { type Teams } from "../types/models";
import { useProtectedProfile } from "./useProtectedProfile";
import { apiFetch } from "../utilities/api";

export const useFetchTeams = (
    setTeams: React.Dispatch<React.SetStateAction<Teams | null>>,
    setNameInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {

    const { token } = useProtectedProfile();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTeams = async () => {
            if (!token) {
                return;
            }

            try {
                const res = await apiFetch('/api/profile/teams', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Unknown error');
                }

                const data = await res.json();
                setTeams(data.teams);

                const names: Record<string, string> = {};
                data.teams.forEach((team: any) => {
                    names[team._id] = team.name || '';
                });
                setNameInputs(names);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getTeams()
    }, [token])

    return {
        error,
        loading,
    }
}