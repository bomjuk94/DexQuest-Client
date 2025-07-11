import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useModalStore } from '../../stores/ModalStore';

describe('useModalStore', () => {
    beforeEach(() => {
        useModalStore.setState({ isOpen: false, content: null })
    })

    it('opens modal', () => {
        const content = <div>Test Modal</div>
        useModalStore.getState().openModal(content)
        expect(useModalStore.getState().isOpen).toBe(true)
        expect(useModalStore.getState().content).toEqual(content)
    })

    it('closes modal', () => {
        useModalStore.getState().closeModal()
        expect(useModalStore.getState().isOpen).toBe(false)
        expect(useModalStore.getState().content).toBe(null)
    })

    it('toggles modal on', () => {
        const val = true
        const content = <div>Test Modal</div>
        useModalStore.getState().toggleModal(val, content)
        expect(useModalStore.getState().isOpen).toBe(true)
        expect(useModalStore.getState().content).toEqual(content)
    })

    it('toggles modal off and clears content', () => {
        useModalStore.getState().toggleModal(false)

        expect(useModalStore.getState().isOpen).toBe(false)
        expect(useModalStore.getState().content).toBe(null)
    })
})