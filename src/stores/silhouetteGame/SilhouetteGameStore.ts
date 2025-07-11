import { create } from "zustand";
import type { Pokemon, GamePhasesType, GamePhasesTypeVal, GamePhasesTypeKey } from "../../types/models";

export type SilhouetteGameStore = {
    list: Pokemon[];
    nextPokemon: boolean
    hintValue: number
    hintMaxReached: boolean
    disableAnswerBtns: boolean
    maxRounds: number
    round: number
    correctGuesses: number
    userCorrect: boolean
    gameQuit: boolean
    gameQuitCount: number
    resetCount: number
    gamePhases: GamePhasesType

    // Core actions
    setList: (pokeList: Pokemon[]) => void;
    removeRandomPoke: (id: number) => void;

    // Utilized Pokémon handling
    // Utilize
    addToUtilizedStore: (id: number) => void;
    clearUtilizedStore: () => void;
    // Hint
    setHintMax: (val: boolean) => void
    incrementHintValue: () => void
    clearHintValue: () => void
    // Round
    incrementRound: () => void
    clearRound: () => void
    // Guess
    incrementCorrectGuesses: () => void
    clearCorrectGuesses: () => void
    // Game Quit
    setGameQuit: (val: boolean) => void
    incrementGameQuitCount: () => void
    clearGameQuitCount: () => void
    // Count
    incrementResetCount: () => void
    // Tally
    tallyScore: boolean
    setTallyScore: (val: boolean) => void
    // Game Phase
    setGamePhase: (phase: keyof GamePhasesType, val: GamePhasesTypeVal) => void;
    // Game Controls
    setNextPokemon: () => void
    setNextHint: () => void
    setQuit: () => void
    setReset: () => void
    setStart: () => void
    setTally: () => void

    // MISC
    setNextPoke: (val: boolean) => void
    setDisabledAnswerBtns: (val: boolean) => void
    setUserCorrect: (val: boolean) => void
    clearResetCount: () => void
    correctlyAnswered: () => void
    incorrectlyAnswered: () => void

    // Side-effectful round action
    chooseRandomPoke: () => Pokemon | null;
};


export const useSilhouetteGameStore = create<SilhouetteGameStore & {
    getRandomPoke: () => Pokemon | null;
}>((set, get) => ({
    list: [],
    nextPokemon: false,
    hintValue: 0,
    hintMaxReached: false,
    disableAnswerBtns: false,
    correctGuesses: 0,
    round: 0,
    maxRounds: 10,
    userCorrect: false,
    tallyScore: false,
    gameQuit: false,
    gameQuitCount: 0,
    resetCount: 0,
    gamePhases: {
        start: { val: 'start ended' },
        booting: { val: 'booting ended' },
        tally: { val: 'tally ended' },
        quit: { val: 'ended' },
    },

    getRandomPoke: (): Pokemon | null => {
        const { list } = get();
        if (!list.length) return null;

        const res = localStorage.getItem('utilized-pokemon-storage');
        const usedIds = res ? JSON.parse(res) : [];

        const unusedPokes = list.filter(p => !usedIds.includes(p.id));
        if (!unusedPokes.length) return null;

        const randomIndex = Math.floor(Math.random() * unusedPokes.length);
        return unusedPokes[randomIndex];
    },
    chooseRandomPoke: () => {
        const { getRandomPoke, removeRandomPoke, addToUtilizedStore } = get();
        const poke = getRandomPoke();
        if (poke) {
            removeRandomPoke(poke.id);
            addToUtilizedStore(poke.id);
        }
        return poke;
    },

    removeRandomPoke: (id: number) => {
        set((state) => ({
            list: state.list.filter((pokemon) => pokemon.id !== id)
        }));
    },

    addToUtilizedStore: (id) => {
        const raw = localStorage.getItem('utilized-pokemon-storage');
        const existing = new Set(raw ? JSON.parse(raw) : []);
        existing.add(id);
        localStorage.setItem('utilized-pokemon-storage', JSON.stringify([...existing]));
    },
    clearUtilizedStore: () => {
        localStorage.removeItem('utilized-pokemon-storage');
    },
    setNextPoke: (val: boolean) => set({ nextPokemon: val }),
    incrementHintValue: () => {
        set((state) => ({
            hintValue: Math.min(state.hintValue + 0.2, 1)
        }));
    },
    clearHintValue: () => set({ hintValue: 0 }),

    setHintMax: (val: boolean) => set({ hintMaxReached: val }),

    setDisabledAnswerBtns: (val: boolean) => set({ disableAnswerBtns: val }),

    incrementRound: () => {
        set((state) => ({ round: state.round + 1 }))
    },
    incrementCorrectGuesses: () => {
        set((state) => ({ correctGuesses: state.correctGuesses + 1 }))
    },
    clearRound: () => set({ round: 0 }),
    clearCorrectGuesses: () => set({ correctGuesses: 0 }),

    setUserCorrect: (val: boolean) => set({ userCorrect: val }),

    incrementGameQuitCount: () => {
        set((state) => ({ gameQuitCount: state.gameQuitCount + 1 }))
    },

    incrementResetCount: () => {
        set((state) => ({ resetCount: state.resetCount + 1 }))
    },

    clearResetCount: () => set({ resetCount: 0 }),

    clearGameQuitCount: () => set({ gameQuitCount: 0 }),

    setGamePhase: (phase: GamePhasesTypeKey, val: GamePhasesTypeVal) => set((state) => ({
        gamePhases: {
            ...state.gamePhases,
            [phase]: { val },
        }
    })),

    setGameQuit: (val: boolean) => set({ gameQuit: val }),

    setList: (pokeList) => set({ list: pokeList }),

    correctlyAnswered: () => {
        const { setNextPoke, incrementRound, incrementCorrectGuesses, setUserCorrect } = get()

        setNextPoke(true)
        incrementRound()
        incrementCorrectGuesses()
        setUserCorrect(true)
    },
    incorrectlyAnswered: () => {
        const { setNextPoke, incrementRound, setUserCorrect } = get()

        setNextPoke(true)
        incrementRound()
        setUserCorrect(false)
    },

    setNextPokemon: () => {
        const { setNextPoke, setDisabledAnswerBtns, clearHintValue, setHintMax } = get()
        setNextPoke(false);
        setDisabledAnswerBtns(false);
        clearHintValue();
        setHintMax(false);
    },

    setNextHint: () => {
        const { setNextPoke, setDisabledAnswerBtns, incrementRound, setHintMax } = get()
        setNextPoke(true);
        setHintMax(true);
        setDisabledAnswerBtns(true);
        incrementRound();
    },

    setQuit: () => {
        const { setNextPoke, setDisabledAnswerBtns, setGamePhase, setHintMax, setGameQuit, clearHintValue, clearRound, clearCorrectGuesses, setUserCorrect, clearUtilizedStore, incrementGameQuitCount } = get()

        setGamePhase("start", "start ended");
        setGameQuit(true);
        setNextPoke(false);
        clearHintValue();
        setHintMax(false);
        setDisabledAnswerBtns(false);
        clearRound();
        clearCorrectGuesses();
        setUserCorrect(false);
        clearUtilizedStore();
        incrementGameQuitCount();
    },

    setReset: () => {
        const { setNextPoke, setDisabledAnswerBtns, setHintMax, clearHintValue, clearRound, clearCorrectGuesses, setUserCorrect, clearUtilizedStore, incrementResetCount } = get()

        incrementResetCount();
        setNextPoke(false);
        clearHintValue();
        setHintMax(false);
        setDisabledAnswerBtns(false);
        clearRound();
        clearCorrectGuesses();
        setUserCorrect(false);
        clearUtilizedStore();
    },

    setStart: () => {
        const { setNextPoke, setDisabledAnswerBtns, setHintMax, clearHintValue, clearRound, clearCorrectGuesses, setUserCorrect, clearUtilizedStore, incrementResetCount, setGamePhase, setGameQuit, clearGameQuitCount } = get()

        setGamePhase("start", "start started");
        setGamePhase("booting", "booting started");
        setGameQuit(false);
        clearGameQuitCount();
        incrementResetCount();
        setNextPoke(false);
        clearHintValue();
        setHintMax(false);
        setDisabledAnswerBtns(false);
        clearRound();
        clearCorrectGuesses();
        setUserCorrect(false);
        clearUtilizedStore();
    },
    setTallyScore: (val: boolean) => set({ tallyScore: val }),
    setTally: () => {
        const { setGamePhase, setDisabledAnswerBtns, setTallyScore } = get()

        setGamePhase("tally", "tally started");
        setDisabledAnswerBtns(true)
        setTallyScore(true)
    }
}));
