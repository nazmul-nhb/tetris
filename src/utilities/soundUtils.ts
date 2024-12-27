const soundEffects = {
	move: new Audio("/sounds/move.wav"),
	rotate: new Audio("/sounds/rotate.wav"),
	drop: new Audio("/sounds/drop.wav"),
	clear: new Audio("/sounds/clear.wav"),
	gameOver: new Audio("/sounds/game-over.wav"),
	pause: new Audio("/sounds/pause.wav"),
};

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
