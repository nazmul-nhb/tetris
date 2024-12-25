import { useState } from "react";
import { GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type UseRestartGameProps = {
	state: GameState;
	dispatch: React.Dispatch<GameAction>;
};

/** Hook to create  */
export const useRestartGame = ({ state, dispatch }: UseRestartGameProps) => {
	const [showPopup, setShowPopup] = useState(false);

	const restartGame = () => {
		if (!state.isPaused) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}

		setShowPopup(true);
	};

	const confirmRestart = () => {
		playSoundEffect("pause", state.isSoundEffectsEnabled);
		dispatch({ type: "RESET_GRID" });
		setShowPopup(false);
	};

	const cancelRestart = () => {
		if (state.isPaused) {
			dispatch({ type: "TOGGLE_PAUSE" });
		}

		setShowPopup(false);
	};

	return { showPopup, restartGame, confirmRestart, cancelRestart };
};
