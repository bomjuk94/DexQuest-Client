import { create } from 'zustand';

type colourSchemeType = {
    getColourScheme: () => string | false
    setColourScheme: (val: string) => void
    setColourSchemeReady: (ready: boolean) => void
    isThemeReady: boolean
}

export const useColourSchemeStore = create<colourSchemeType>((set) => ({
    isThemeReady: false,
    getColourScheme: () => {
        const colorScheme = localStorage.getItem('colorScheme');
        return colorScheme || false;
    },
    setColourScheme: (val: string) => {
        localStorage.setItem('colorScheme', val);
    },
    setColourSchemeReady: (ready) => set({ isThemeReady: ready }),
}));
