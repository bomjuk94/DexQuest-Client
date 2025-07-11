import { useEffect } from "react";
import { handleKeyPress } from "../utilities/handleKeyPress";

export const useGameKeyboardEvent = (
    disableAnswerBtns: boolean,
    handleBtnClick: (btn: string) => void
) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            handleKeyPress({
                e,
                disableAnswerBtns,
                handleBtnClick,
            });
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [disableAnswerBtns, handleBtnClick]);
};
