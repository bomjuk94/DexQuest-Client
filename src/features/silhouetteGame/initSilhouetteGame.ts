import { type InitializeGameProps } from "../../types/InitializeGameProps";

export const initializeGame = ({
    initialized,
    pokemonList,
    nextPokemon,
    setList,
    getRandomPoke,
    removeRandomPoke,
    addToUtilizedStore,
    setRandomPoke
}: InitializeGameProps) => {
    if (initialized.current || pokemonList.length === 0 || nextPokemon) return null;

    initialized.current = true;
    setList(pokemonList);

    const poke = getRandomPoke();
    if (!poke) return null;

    removeRandomPoke(poke.id);
    addToUtilizedStore(poke.id);
    setRandomPoke(poke);

    return poke;
};
