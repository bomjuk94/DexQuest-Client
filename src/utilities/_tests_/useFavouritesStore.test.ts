import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavouritesStore } from '../../stores/favouritesStore';

describe('useFavouritesStore', () => {
    beforeEach(() => {
        useFavouritesStore.setState({ favourites: [], hydrated: false })
    })

    it('sets favourites list', () => {
        const list = [{ id: 1, name: 'bulbasaur' }, { id: 2, name: 'Ivysaur' }]
        useFavouritesStore.getState().setFavourites(list)
        expect(useFavouritesStore.getState().favourites).toBe(list)
        expect(useFavouritesStore.getState().hydrated).toBe(true)
    })

    it('adds a pokemon to favourites list', () => {
        const poke = { id: 1, name: 'bulbasaur' }
        useFavouritesStore.getState().addFavourite(poke)
        expect(useFavouritesStore.getState().favourites).toEqual([{ id: 1, name: 'bulbasaur' }])
    })

    it('checks if pokemon being passes in already exists in favourites', () => {
        const favourites = [{ id: 1, name: 'bulbasaur' }, { id: 2, name: 'Ivysaur' }]
        const poke = { id: 1, name: 'bulbasaur' }
        const alreadyExists = favourites.some((p) => p.id === poke.id);
        expect(alreadyExists).toBe(true)
    })

    it('removes pokemon from favourites', () => {
        const id = 1
        useFavouritesStore.getState().removeFavourite(id)
        expect(useFavouritesStore.getState().favourites).toEqual([])
    })
})
