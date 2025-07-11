import { create } from "zustand"

type authStore = {
    isAuthenticated: boolean
    wasLoggedOut: boolean
    logout: () => void
    login: (token: string) => void
    clearLogoutFlag: () => void
}

export const useAuthStore = create<authStore>((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
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
