import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useColourSchemeStore } from "../../stores/colourSchemeStore";

describe('useColourSchemeStore', () => {
    beforeEach(() => {
        localStorage.clear();
        useColourSchemeStore.setState({ isThemeReady: false });
    });

    it('sets and gets colour scheme from localStorage', () => {
        useColourSchemeStore.getState().setColourScheme('dark');
        const stored = localStorage.getItem('colorScheme');
        expect(stored).toBe('dark');

        const value = useColourSchemeStore.getState().getColourScheme();
        expect(value).toBe('dark');
    });

    it('returns false if no colour scheme is set in localStorage', () => {
        const value = useColourSchemeStore.getState().getColourScheme();
        expect(value).toBe(false);
    });

    it('sets isThemeReady state correctly', () => {
        expect(useColourSchemeStore.getState().isThemeReady).toBe(false);
        useColourSchemeStore.getState().setColourSchemeReady(true);
        expect(useColourSchemeStore.getState().isThemeReady).toBe(true);
    });
});
