import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

const StartupAuthCheck = () => {
    const { setAuthState, isTokenExpired } = useAuthStore();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            setAuthState({ token, isAuthenticated: true });
        } else {
            localStorage.removeItem("token");
            setAuthState({ token: null, isAuthenticated: false });
        }
    }, []);

    return null;
};

export default StartupAuthCheck;
