import React, { useState, useEffect } from "react";
import { type TypewriterProps } from "../types/TypewriterProps";

const Typewriter = ({ text, speed = 100 }: TypewriterProps) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {

        setDisplayedText("");

        const chars = Array.from(text);
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            if (currentIndex < chars.length) {
                const nextChar = chars[currentIndex];
                setDisplayedText((prev) => prev + nextChar);
                currentIndex += 1;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => {
            clearInterval(intervalId);
        };
    }, [text, speed]);

    return (
        <p className="text-white max-w-60">
            {displayedText}
            <span className="typewriter-cursor">|</span>
        </p>
    );
};

export default Typewriter;
