import { create } from "zustand"

type AdvancedFiltersStore = {
    isReset: boolean
    setReset: (val: boolean) => void
}

export const useAdvancedFiltersStore = create<AdvancedFiltersStore>((set) => ({
    isReset: false,
    setReset: (val: boolean) => set({ isReset: val }),
}))
