import { capitalizeName } from '../utilities/capitalizeName';
import { useSilhouetteGameStore } from '../stores/silhouetteGame/SilhouetteGameStore';
import GameBoyColorBoot from './GameBoyColorBoot';
import { startMusic } from '../utilities/musicManager';
import Typewriter from './Typewriter';
import { useBootingPhase } from '../hooks/useBootingPhase';
import { useStartPhase } from '../hooks/useStartPhase';
import { useProtectedProfile } from '../hooks/useProtectedProfile';
import { tallyScoreBtnOptions } from '../utilities/constants.tsx';
import { type GameBoyScreenProps } from '../types/GameBoyScreenProps';
import { useSaveSilhouetteGameProgress } from '../hooks/useSaveSilhouetteGameProgress';

const GameboyScreen = ({ randomPoke, options }: GameBoyScreenProps) => {
    const {
        nextPokemon,
        hintValue,
        hintMaxReached,
        round,
        correctGuesses,
        userCorrect,
        gameQuit,
        setGameQuit,
        setGamePhase,
        tallyScore,
        maxRounds,
        setTallyScore,
        setReset,
    } = useSilhouetteGameStore();

    const isBooting = useBootingPhase()
    const gameStarted = useStartPhase()
    const { token } = useProtectedProfile()
    const { saveGameProgress } = useSaveSilhouetteGameProgress()

    const saveSilhouetteGameProgress = (action: string) => {
        saveGameProgress({
            action,
            token,
            correctGuesses,
            maxRounds,
            setTallyScore,
            setGameQuit,
            setReset
        })
    }

    return (
        <div className='grid grid-cols-[15%_70%_15%] bg-black p-2.5 rounded-tr-lg rounded-tl-lg rounded-br-2xl rounded-bl-2xl'>
            {/* Power LED */}
            <div className='col-start-1 col-end-2 flex flex-col gap-1 translate-y-[35%] pr-4'>
                <div className='flex gap-1 items-center'>
                    <span className={`min-w-2 min-h-2 rounded-full ${(gameStarted || isBooting) ? 'bg-brand-dark-fire' : 'bg-brand-gray'}`}></span>
                    <span className='flex justify-center'>
                        <div className="flex gap-[0px] max-w-[40px]">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="relative w-[10px] h-[10px] bg-white rounded-full overflow-hidden">
                                    <div className="absolute w-full h-full bg-black rounded-full -left-[3px] top-0"></div>
                                </div>
                            ))}
                        </div>
                    </span>
                </div>
                <p className='uppercase text-white text-xs'>Power</p>
            </div>

            {/* Screen */}
            {
                tallyScore ?
                    <div className='relative col-start-2 col-end-3 w-full min-h-52 mt-7 rounded-tr-lg rounded-tl-lg rounded-br-2xl rounded-bl-2xl overflow-hidden max-w-two-fourty-three bg-white'>
                        <div className='flex flex-col items-center justify-center gap-7 h-full'>
                            <h3>
                                Round Overview
                            </h3>

                            <div className='flex flex-col items-center gap-2.5'>
                                <p>
                                    Score: {`${correctGuesses}/${maxRounds}`}
                                </p>
                                {
                                    tallyScoreBtnOptions.map((btn) => (
                                        <button
                                            onClick={() => saveSilhouetteGameProgress(btn.action)}
                                            className='cursor-pointer border-none rounded-sm text-sm py-1 px-2 btn-text btn-bkgd hover:opacity-80'
                                            key={btn.action}
                                        >
                                            {btn.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`relative col-start-2 col-end-3 w-full min-h-52 mt-7 rounded-tr-lg rounded-tl-lg rounded-br-2xl rounded-bl-2xl overflow-hidden max-w-two-fourty-three ${!gameStarted && !isBooting
                        ? 'bg-brand-dim-gray'
                        : gameQuit
                            ? 'bg-brand-dim-gray'
                            : 'bg-white'
                        }`}>
                        {
                            !gameStarted && !isBooting ? (
                                null
                            ) : isBooting ? (
                                <GameBoyColorBoot onComplete={() => {
                                    setGamePhase('start', 'start started')
                                    setGamePhase('booting', 'booting ended')
                                    startMusic(0.025)
                                }} />
                            ) : gameQuit ? (
                                <div className='gameboy-shutdown' />
                            ) : (
                                <div className='h-two-twenty'>
                                    <div className='flex flex-col gap-2 items-center h-full'>
                                        <div className='flex justify-end w-full pr-2.5'>
                                            Score: <span className='pl-1.5'>{correctGuesses}/{round}</span>
                                        </div>
                                        <img
                                            className={`max-w-one-twelve mb-auto filter ${nextPokemon ? 'brightness-100 contrast-100' : ''} ease-in-out duration-200`}
                                            style={nextPokemon ? undefined : { filter: `brightness(${hintValue}) contrast(${hintValue})` }}
                                            src={randomPoke?.sprites?.['official-artwork']}
                                            alt='Silhouette'
                                        />
                                        <div className={`${(nextPokemon && !hintMaxReached) ? 'flex -translate-y-3' : (!nextPokemon || !hintMaxReached) ? 'grid grid-cols-2 items-center justify-items-center' : 'flex'} bg-brand-gray min-w-full  p-1`}>
                                            {
                                                (nextPokemon && hintMaxReached) ? (
                                                    <Typewriter text={"You’ve used all hints. This round is over. Press NEXT to continue"} speed={50} />
                                                ) : (nextPokemon && !userCorrect) ? (
                                                    <Typewriter text={"You guessed incorrectly. This round is over. Press NEXT to continue"} speed={50} />
                                                ) : nextPokemon ? (
                                                    <Typewriter text={"You guessed correctly! Congratulations! Press NEXT to continue"} speed={50} />
                                                ) : (
                                                    options.map((option, i) => (
                                                        <p key={i} className='text-white'>
                                                            {String.fromCharCode(65 + i)}. {capitalizeName(option.name)}
                                                        </p>
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>

                                    {/* Dot matrix effect */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10"
                                        style={{
                                            backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
                                            backgroundSize: '4px 4px',
                                            opacity: 0.15,
                                        }}
                                    />

                                    {/* Flicker */}
                                    <div className="absolute inset-0 pointer-events-none z-20 bg-black/20 animate-flicker" />
                                </div>
                            )
                        }
                    </div>
            }

            {/* Empty column */}
            <div className='col-start-5 col-end-6'></div>

            {/* Branding */}
            <div className='col-start-1 col-end-6 py-4'>
                <p className='text-white text-center text-xl font-medium'>
                    Game Boy <span>
                        <span className='text-brand-dark-fire uppercase'>c</span>
                        <span className='text-brand-dark-psychic uppercase'>o</span>
                        <span className='text-brand-green uppercase'>l</span>
                        <span className='text-brand-dark-highlight uppercase'>o</span>
                        <span className='text-brand-dark-psychic uppercase'>r</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default GameboyScreen;
