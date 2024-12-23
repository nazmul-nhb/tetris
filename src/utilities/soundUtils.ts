const soundEffects = {
	move: new Audio("/sounds/move.wav"),
	rotate: new Audio("/sounds/rotate.wav"),
	drop: new Audio("/sounds/drop.wav"),
	clear: new Audio("/sounds/clear.wav"),
	gameOver: new Audio("/sounds/game-over.wav"),
	pause: new Audio("/sounds/pause.wav"),
};

const musicTracks = [
	"/music/puppets.mp3",
	"/music/crawl.mp3",
	"/music/remedy.mp3",
];

let currentTrackIndex = Math.floor(Math.random() * musicTracks.length);

let backgroundMusic = new Audio(musicTracks[currentTrackIndex]);

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

/**
 * Play the next music track.
 * @param isEnabled Whether music is enabled.
 */
export const playNextTrack = (isEnabled: boolean) => {
	// Stop and clean up current music
	backgroundMusic.pause();
	backgroundMusic.src = ""; // Clear the source

	// Move to the next track
	currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;

	// Clone a fresh audio instance with the new track
	backgroundMusic = new Audio(musicTracks[currentTrackIndex]);
	backgroundMusic.loop = true;

	if (isEnabled) {
		backgroundMusic.play();
	}
};