import { Dispatch, SetStateAction, useEffect } from "react";
import { GameAction, GameState, PressedKey } from "../types";
import { throttleKeyPress } from "../utilities/gameUtils";
import { playSoundEffect } from "../utilities/soundUtils";
import { playNextTrack } from "../utilities/musicUtils";

/**
 * Custom hook to handle keyboard interactions for controlling the game.
 *
 * @param state - The current state of the game, including game over and sound settings.
 * @param dispatch - Function to dispatch actions to update the game state.
 * @param restartGame - Function to restart the game.
 * @param pressedKey - Currently pressed key for UI or state updates.
 * @param setPressedKey - Function to set the currently pressed key.
 * @param setShowOptions - Function to toggle visibility of folder/file selection menu for music.
 * @param toggleMode - Function to toggle mode and restart the game.
 */
export const useKeyboard = (
	state: GameState,
	dispatch: Dispatch<GameAction>,
	restartGame: () => void,
	pressedKey: PressedKey | null,
	setPressedKey: Dispatch<SetStateAction<PressedKey | null>>,
	setShowOptions: Dispatch<SetStateAction<boolean>>,
	toggleMode: () => void
) => {
	useEffect(() => {
		/** Handle keyboard controls */
		const handleKeyDown = throttleKeyPress((e: KeyboardEvent) => {
			e.preventDefault();

			if (state.gameOver) {
				if (e.key === " " || e.key === "r" || e.key === "Enter") {
					playSoundEffect("pause", state.isSoundEffectsEnabled);
					return dispatch({ type: "RESET_GRID" });
				}

				return playSoundEffect("gameOver", state.isSoundEffectsEnabled);
			}

			switch (e.key) {
				case "r":
				case "Escape":
					setPressedKey("Restart");
					restartGame();
					break;
				case "ArrowLeft":
					setPressedKey("ArrowLeft");
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
					break;
				case "ArrowRight":
					setPressedKey("ArrowRight");
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
					break;
				case "ArrowDown":
					setPressedKey("ArrowDown");
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
					break;
				case "ArrowUp":
					setPressedKey("ArrowUp");
					playSoundEffect("rotate", state.isSoundEffectsEnabled);
					dispatch({ type: "ROTATE_PIECE" });
					break;
				case "p":
				case " ":
					setPressedKey("Pause");
					playSoundEffect("pause", state.isSoundEffectsEnabled);
					dispatch({ type: "TOGGLE_PAUSE" });
					break;
				case "s":
					setPressedKey("Sound");
					dispatch({ type: "TOGGLE_SOUND_EFFECTS" });
					break;
				case "m":
					setPressedKey("Music");
					dispatch({ type: "TOGGLE_MUSIC" });
					break;
				case "n":
					setPressedKey("Next");
					playNextTrack(true);
					dispatch({ type: "TOGGLE_MUSIC", enableMusic: true });
					break;
				case "f":
					setPressedKey("Folder");
					setShowOptions((prev) => !prev);
					break;
				case "h":
				case "e":
					setPressedKey("Hard");
					toggleMode();
					break;
				default:
					break;
			}
		}, 25);

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		state.gameOver,
		dispatch,
		state.isSoundEffectsEnabled,
		restartGame,
		toggleMode,
		setPressedKey,
		setShowOptions,
		state.currentPiece,
	]);

	// Reset key pressed after animation completes
	useEffect(() => {
		if (pressedKey) {
			const timeout = setTimeout(() => setPressedKey(null), 150);
			return () => clearTimeout(timeout);
		}
	}, [pressedKey, setPressedKey]);
};
