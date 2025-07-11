import type { Pokemon } from "../types/models";
import { shuffle } from "./randomizeList";
import { type GenerateOptionsProps } from "../types/GenerateOptionsProps";

export const generateOptions = ({ pokemonList, poke, setOptions }: GenerateOptionsProps) => {

    const optionsCount = 3;
    const usedIndices = new Set<number>();
    const newOptions: Pokemon[] = [];

    while (newOptions.length < optionsCount) {
        const index = Math.floor(Math.random() * pokemonList.length);
        if (!usedIndices.has(index)) {
            usedIndices.add(index);
            newOptions.push(pokemonList[index]);
        }
    }

    newOptions.push(poke)
    const shuffled = shuffle(newOptions)
    setOptions(shuffled)
}