import { btnOptions } from "./constants.tsx";

type HandleKeyPressProps = {
    e: KeyboardEvent
    disableAnswerBtns: boolean
    handleBtnClick: (pressedKey: string) => void
}

export const handleKeyPress = ({ e, disableAnswerBtns, handleBtnClick }: HandleKeyPressProps) => {
    if (disableAnswerBtns) return;

    const pressedKey = e.key.toLowerCase();
    if (btnOptions.includes(pressedKey)) {
        handleBtnClick(pressedKey);
    }
};