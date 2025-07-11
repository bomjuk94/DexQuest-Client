import { useEffect, useState } from 'react';
import startUpSound from '../sounds/gameStartUpSound.mp3';

const GameBoyColorBoot = ({ onComplete }: { onComplete: () => void }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const audioDelay = setTimeout(() => {
            const audio = new Audio(startUpSound);
            audio.volume = 0.6;
            audio.play().catch(err => console.error('Audio failed to play:', err));
        }, 500);

        const bootDuration = setTimeout(() => {
            setShow(false);
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(audioDelay);
            clearTimeout(bootDuration);
        };
    }, [onComplete]);

    if (!show) return null;

    return (
        <div className="boot-screen">
            <div className="boot-logo">GAME BOY</div>
            <div className="nintendo-text">Nintendont®</div>
        </div>
    );
};

export default GameBoyColorBoot;
