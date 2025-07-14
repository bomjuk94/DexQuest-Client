import { create } from "zustand"
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    exp: number; // expiry time in seconds
    [key: string]: any;
};

type authStore = {
    token: string | null
    isAuthenticated: boolean
    setAuthState: (state: { token: string | null, isAuthenticated: boolean }) => void
    isTokenExpired: (token: string) => boolean
    wasLoggedOut: boolean
    logout: () => void
    login: (token: string) => void
    clearLogoutFlag: () => void
}

export const useAuthStore = create<authStore>((set) => ({
    token: null,
    isAuthenticated: !!localStorage.getItem('token'),
    setAuthState: ({ token, isAuthenticated }) => {
        set({ token, isAuthenticated });
    },
    isTokenExpired: (token: string): boolean => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            console.log(error);
            return true
        }
    },
    wasLoggedOut: false,
    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('prevPath')
        set({ isAuthenticated: false, wasLoggedOut: true })
    },
    login: (token: string) => {
        localStorage.setItem('token', token)
        set({ isAuthenticated: true, wasLoggedOut: false })
    },
    clearLogoutFlag: () => set({ wasLoggedOut: false }),
}))
