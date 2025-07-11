import { type Pokemon } from "./models"
import { type GamePhasesTypeKey, type GamePhasesTypeVal } from "./models"

export interface HandleBtnClickProps {
    btn: string
    disableAnswerBtns: boolean
    setDisabledAnswerBtns: (val: boolean) => void
    options: Pokemon[]
    randomPoke: Pokemon
    correctlyAnswered: () => void
    incorrectlyAnswered: () => void
    gamePhases: {
        start: { val: 'start ended' },
        booting: { val: 'booting ended' },
        tally: { val: 'tally ended' },
        quit: { val: 'ended' },
    }
    gameStarted: boolean
    setGamePhase: (phase: GamePhasesTypeKey, val: GamePhasesTypeVal) => void
    round: number,
    setTally: () => void
}
