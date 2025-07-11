import { create } from "zustand";

type NavType = {
    toggled: boolean
    setToggled: () => void
    setMenuOpen: () => void
    setMenuClosed: () => void
}

export const useNavStore = create<NavType>((set) => ({
    toggled: false,
    setToggled: () => set((state) => ({ toggled: !state.toggled })),
    setMenuOpen: () => set((state) => ({ toggled: state.toggled = true })),
    setMenuClosed: () => set({ toggled: false }),
}))
