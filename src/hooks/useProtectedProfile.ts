import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import type { Profile } from "../types/models";
import { apiFetch } from "../utilities/api";

export const useProtectedProfile = () => {
    const { isAuthenticated, wasLoggedOut, clearLogoutFlag } = useAuthStore();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUser = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        if (!token || !isAuthenticated) {
            setProfile(null);
            setToken(null);
            setError('sessionExpired');
            setLoading(false);
            return;
        }

        try {
            const res = await apiFetch("/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                }
            });

            if (res.status === 401 || res.status === 403) {
                setError('sessionExpired');
                setProfile(null);
                setToken(null);
                return;
            }

            if (!res.ok) {
                setError("unknownError");
                setLoading(false);
                return;
            }

            const data = await res.json();
            setProfile({ ...data.profile, username: data.username, email: data.email });
            setToken(token);
            setError(null);
        } catch (err) {
            setError("networkError");
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUser();
    }, [isAuthenticated, wasLoggedOut, clearLogoutFlag]);

    return {
        profile,
        token,
        error,
        loading,
        refreshProfile: getUser
    };
};
