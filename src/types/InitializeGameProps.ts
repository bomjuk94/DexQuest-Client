import { type Pokemon } from "./models";

export interface InitializeGameProps {
    initialized: React.RefObject<boolean>;
    pokemonList: Pokemon[];
    nextPokemon: boolean;
    setList: (list: Pokemon[]) => void;
    getRandomPoke: () => Pokemon | null;
    removeRandomPoke: (id: number) => void;
    addToUtilizedStore: (id: number) => void;
    setRandomPoke: (poke: Pokemon) => void;
    setOptions: (options: Pokemon[]) => void;
    optionsCount: number;
}