import { btnOptions } from "./constants.tsx";
import { playBtnSound } from "./playBtnSounds"
import btnClick from '../sounds/btnClick.mp3'
import { type HandleBtnClickProps } from "../types/HandleBtnClickProps";

export function HandleAnswerBtnClick({ btn, disableAnswerBtns, setDisabledAnswerBtns, options, randomPoke, correctlyAnswered, incorrectlyAnswered, gameStarted, round, setTally }: HandleBtnClickProps) {

    if (disableAnswerBtns) return;
    if (round === 9) {
        setTally()
    }

    setDisabledAnswerBtns(true)
    const userAnswerIndex = btnOptions.indexOf(btn);
    const correctIndex = options.findIndex((option) => option?.id === randomPoke?.id);
    playBtnSound(gameStarted, btnClick);

    if (userAnswerIndex === correctIndex) {
        correctlyAnswered()

    } else {
        incorrectlyAnswered()
    }
};