const STORAGE_KEY = 'utilized-pokemon-storage';

export const getUsedPokemon = (): number[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
};