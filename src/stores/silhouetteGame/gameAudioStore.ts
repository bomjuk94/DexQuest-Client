import { create } from "zustand";

interface AudioStore {
    isMuted: boolean;
    setMuted: (muted: boolean) => void;
    toggleMuted: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
    isMuted: false,
    setMuted: (muted) => set({ isMuted: muted }),
    toggleMuted: () =>
        set((state) => ({
            isMuted: !state.isMuted,
        })),
}));
