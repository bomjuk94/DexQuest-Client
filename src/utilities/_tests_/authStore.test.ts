import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../../stores/authStore';

describe('useAuthStore', () => {
    beforeEach(() => {
        localStorage.clear()
        useAuthStore.setState({ isAuthenticated: false })
    })

    it('logs out current user from their profile', () => {
        useAuthStore.getState().logout()
        const token = localStorage.getItem('token')
        const prevPath = localStorage.getItem('prevPath')
        expect(token).toBe(null)
        expect(prevPath).toBe(null)
        expect(useAuthStore.getState().isAuthenticated).toBe(false)
        expect(useAuthStore.getState().wasLoggedOut).toBe(true)
    })

    it('logs in user to their profile', () => {
        const token = 'abc123456789';
        useAuthStore.getState().login(token)
        const tokenReceived = localStorage.getItem('token')
        expect(tokenReceived).toBe('abc123456789')
        expect(useAuthStore.getState().isAuthenticated).toBe(true)
        expect(useAuthStore.getState().wasLoggedOut).toBe(false)
    })

    it('clears logout state', () => {
        useAuthStore.getState().clearLogoutFlag()
        expect(useAuthStore.getState().wasLoggedOut).toBe(false)
    })
})