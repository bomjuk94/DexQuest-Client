import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const {
        isAuthenticated,
        setAuthState,
        isTokenExpired,
    } = useAuthStore();

    useEffect(() => {
        const localToken = localStorage.getItem("token");

        if (localToken && !isTokenExpired(localToken)) {
            setAuthState({ token: localToken, isAuthenticated: true });
        } else {
            localStorage.removeItem("token");
            setAuthState({ token: null, isAuthenticated: false });
        }
    }, []);

    if (!isAuthenticated) {
        if (!["/login", "/register"].includes(location.pathname)) {
            localStorage.setItem("prevPath", location.pathname);
        }

        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
