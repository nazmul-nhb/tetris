import { Dispatch, useState } from "react";
import { GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type Restart = (params: {
	state: GameState;
	dispatch: Dispatch<GameAction>;
	toggleMode?: boolean;
}) => {
	showPopup: boolean;
	restartGame: () => void;
	confirmRestart: () => void;
	cancelRestart: () => void;
};

/**
 * Custom hook to manage the restart game functionality with a confirmation popup.
 * It provides methods to initiate a restart, confirm the restart, or cancel the restart.
 *
 * @param state - The current game state.
 * @param dispatch - The dispatch function to update the game state.
 * @param toggleMode - Optional boolean for mode toggling (Hard/Easy).
 *
 * @returns An object with boolean state and functions:
 *   - `showPopup`: A boolean flag to show or hide the restart confirmation popup.
 *   - `restartGame`: Function to trigger the restart process and show the popup.
 *   - `confirmRestart`: Function to confirm the restart and reset the grid.
 *   - `cancelRestart`: Function to cancel the restart and resume the game if paused.
 */
export const useRestartGame: Restart = ({ state, dispatch, toggleMode }) => {
	const [showPopup, setShowPopup] = useState(false);

	const restartGame = () => {
		playSoundEffect("warn", state.isSoundEffectsEnabled);
		setShowPopup(true);

		if (!state.isPaused) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}
	};

	const confirmRestart = () => {
		setShowPopup(false);
		playSoundEffect("pause", state.isSoundEffectsEnabled);
		dispatch({ type: "RESET_GRID" });

		if (toggleMode) {
			dispatch({ type: "TOGGLE_MODE" });
		}
	};

	const cancelRestart = () => {
		playSoundEffect("warn", state.isSoundEffectsEnabled);
		setShowPopup(false);
	};

	return { showPopup, restartGame, confirmRestart, cancelRestart };
};
