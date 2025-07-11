import { useState, useEffect, useRef } from 'react'
import GameboyScreen from './GameboyScreen'
import GameboyAnswerOptions from './GameboyAnswerOptions'
import GameboyControls from './GameboyControls'
import { useFetchAllPokemon } from '../hooks/useFetchAllPokemon'
import { useSilhouetteGameStore } from '../stores/silhouetteGame/SilhouetteGameStore'
import type { Pokemon } from '../types/models'
import GameBoyCartridge from './GameBoyCartridge'
import GameboyLegend from './GameboyLegend'
import PokeballSpinner from './PokeballSpinner'
import { initializeGame } from '../features/silhouetteGame/initSilhouetteGame'
import { generateOptions } from '../utilities/generateOptions'

const Gameboy = () => {

    const { pokemonList, loading, error } = useFetchAllPokemon();
    const {
        setList,
        nextPokemon,
        getRandomPoke,
        addToUtilizedStore,
        removeRandomPoke,
        resetCount,
    } = useSilhouetteGameStore();

    const [randomPoke, setRandomPoke] = useState<Pokemon | null>(null);
    const [options, setOptions] = useState<Pokemon[]>([]);
    const initialized = useRef(false);

    useEffect(() => {

        const poke = initializeGame({
            initialized,
            pokemonList,
            nextPokemon,
            setList,
            getRandomPoke,
            removeRandomPoke,
            addToUtilizedStore,
            setRandomPoke
        });

        if (!poke) return;

        generateOptions({
            pokemonList,
            poke,
            setOptions
        })
    }, [nextPokemon, pokemonList, resetCount])

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='max-w-desktop mx-auto'>
            {
                loading ?
                    <PokeballSpinner />
                    :
                    <>
                        <GameBoyCartridge />
                        <div className='flex flex-col items-center min-w-four-hundred bg-brand-dark-highlight p-4 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl relative'>
                            <div className='flex flex-col min-w-2xs w-full'>
                                <GameboyScreen randomPoke={randomPoke} options={options} />
                                <GameboyAnswerOptions randomPoke={randomPoke} options={options} />
                                <GameboyControls initialized={initialized} pokemonList={pokemonList} />
                            </div>
                        </div>
                        <GameboyLegend />
                    </>
            }

        </div>
    )
}

export default Gameboy