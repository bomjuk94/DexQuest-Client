import { create } from "zustand"

type ModalStore = {
    isOpen: boolean
    content: React.ReactNode | null
    openModal: (content: React.ReactNode) => void
    closeModal: () => void
    toggleModal: (val: boolean, content?: React.ReactNode | null) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    content: null,
    openModal: (content) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
    toggleModal: (val, content = null) => set({ isOpen: val, content }),
}))
