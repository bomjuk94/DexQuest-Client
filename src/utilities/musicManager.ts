import track1 from "../sounds/openingPart2.mp3";
import track2 from "../sounds/billsOrigin.mp3";
import track3 from "../sounds/cereuleanCity.mp3";
import track4 from "../sounds/palletTown.mp3";
import track5 from "../sounds/pewterCity.mp3";
import track6 from "../sounds/pokemonCentre.mp3";
import track7 from "../sounds/roadToViridianCity.mp3";

let audio: HTMLAudioElement | null = null;
let currentIndex = 0;

const tracks = [
    track1,
    track2,
    track3,
    track4,
    track5,
    track6,
    track7,
];

let volumeRef = 0.3;

function handleEnded() {
    currentIndex = (currentIndex + 1) % tracks.length;

    if (audio) {
        audio.pause();
        audio.removeEventListener("ended", handleEnded);
    }

    audio = new Audio(tracks[currentIndex]);
    audio.volume = volumeRef;
    audio.loop = false;
    audio.addEventListener("ended", handleEnded);
    audio.play();
}

export const startMusic = (volume: number = 0.3) => {
    currentIndex = 0;

    if (audio) {
        audio.pause();
        audio = null;
    }

    audio = new Audio(tracks[currentIndex]);
    volumeRef = volume;
    audio.volume = volume;
    audio.loop = false;
    audio.addEventListener("ended", handleEnded);
    audio.play();
};

export const stopMusic = () => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
};

export const setVolume = (volume: number) => {
    volumeRef = volume;
    if (audio) {
        audio.volume = volume;
    }
};
