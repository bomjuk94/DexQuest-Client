export interface SaveGameProgressProps {
    action: string,
    token: string | null,
    correctGuesses: number,
    maxRounds: number,
    setTallyScore: (val: boolean) => void,
    setGameQuit: (val: boolean) => void,
    setReset: () => void
}