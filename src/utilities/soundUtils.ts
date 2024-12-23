import move from "../assets/sounds/move.wav";
import rotate from "../assets/sounds/rotate.wav";
import drop from "../assets/sounds/drop.wav";
import clear from "../assets/sounds/clear.wav";
import gameOver from "../assets/sounds/game-over.wav";
import pause from "../assets/sounds/pause.wav";

const soundEffects = {
	move: new Audio(move),
	rotate: new Audio(rotate),
	drop: new Audio(drop),
	clear: new Audio(clear),
	gameOver: new Audio(gameOver),
	pause: new Audio(pause),
};

const musicTracks = [
	"/src/sounds/music1.mp3",
	"/src/sounds/music2.mp3",
	"/src/sounds/music3.mp3",
];

const backgroundMusic = new Audio(
	musicTracks[Math.floor(Math.random() * musicTracks.length)]
);

backgroundMusic.loop = true;

/**
 * Play a sound effect.
 * @param effect The sound effect to play.
 * @param isEnabled Whether sound effects are enabled.
 */
export const playSoundEffect = (
	effect: keyof typeof soundEffects,
	isEnabled: boolean
) => {
	if (isEnabled) {
		soundEffects[effect].currentTime = 0;
		soundEffects[effect].play();
	}
};

/**
 * Toggle the background music.
 * @param isEnabled Whether music is enabled.
 */
export const toggleMusic = (isEnabled: boolean) => {
	if (isEnabled) {
		backgroundMusic.play();
	} else {
		backgroundMusic.pause();
	}
};
