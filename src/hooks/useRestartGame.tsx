import { useState } from "react";
import { GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type UseRestartGameProps = {
	state: GameState;
	dispatch: React.Dispatch<GameAction>;
};

/** Hook to create restart related functions with popup */
export const useRestartGame = ({ state, dispatch }: UseRestartGameProps) => {
	const [showPopup, setShowPopup] = useState(false);

	const restartGame = () => {
		setShowPopup(true);

		if (!state.isPaused) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}
	};

	const confirmRestart = () => {
		setShowPopup(false);
		playSoundEffect("pause", state.isSoundEffectsEnabled);
		dispatch({ type: "RESET_GRID" });
	};

	const cancelRestart = () => {
		setShowPopup(false);

		if (state.isPaused) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}
	};

	return { showPopup, restartGame, confirmRestart, cancelRestart };
};
