import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

const TokenWatcher = () => {
    const logout = useAuthStore((state) => state.logout);
    const isTokenExpired = useAuthStore((state) => state.isTokenExpired);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentToken = useAuthStore.getState().token;

            if (currentToken && isTokenExpired(currentToken)) {
                logout();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [logout, isTokenExpired]);

    return null;
};

export default TokenWatcher;
