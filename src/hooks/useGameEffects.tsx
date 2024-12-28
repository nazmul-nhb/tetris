import { Dispatch, useEffect } from "react";
import { playSoundEffect } from "../utilities/soundUtils";
import { selectMusicFiles, toggleMusic } from "../utilities/musicUtils";
import { GameAction, GameState } from "../types";

/**
 * Custom hook to handle game-related side effects, sound effects and music
 *
 * @param state - The current state of the game, including game status, piece, and music settings.
 * @param dispatch - Function to dispatch actions to update the game state.
 * @param selectedMusic - The selected music files for background music.
 */
export const useGameEffects = (
	state: GameState,
	dispatch: Dispatch<GameAction>,
	selectedMusic: FileList | null
) => {
	// Handle spawning a new Tetromino and clearing rows
	useEffect(() => {
		if (!state.currentPiece) {
			dispatch({ type: "CLEAR_ROWS" });
			playSoundEffect("drop", state.isSoundEffectsEnabled);
			dispatch({ type: "SPAWN_PIECE" });
		}
	}, [state.currentPiece, dispatch, state.isSoundEffectsEnabled]);

	// Handle selected music files
	useEffect(() => {
		if (selectedMusic) {
			selectMusicFiles(selectedMusic);
			dispatch({
				type: "TOGGLE_MUSIC",
				enableMusic: true,
			});
		}
	}, [dispatch, selectedMusic]);

	// Handle music toggle
	useEffect(() => {
		toggleMusic(state.isMusicEnabled);
	}, [state.isMusicEnabled]);

	// Handle game over sound effect
	useEffect(() => {
		if (state.gameOver) {
			playSoundEffect("gameOver", state.isSoundEffectsEnabled);
		}
	}, [state.gameOver, state.isSoundEffectsEnabled]);
};