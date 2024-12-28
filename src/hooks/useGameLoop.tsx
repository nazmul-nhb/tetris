import { Dispatch, useEffect, useRef } from "react";
import { GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

/**
 * Custom hook to manage the game loop, handling automatic Tetromino dropping.
 *
 * @param state - The current state of the game, including pause, game over, and speed settings.
 * @param dispatch - Function to dispatch actions to update the game state.
 */
export const useGameLoop = (
	state: GameState,
	dispatch: Dispatch<GameAction>
) => {
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		const startInterval = () => {
			intervalRef.current = window.setInterval(() => {
				playSoundEffect("move", state.isSoundEffectsEnabled);
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}, state.speed);
		};

		const stopInterval = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		if (!state.isPaused && !state.gameOver) {
			startInterval();
		}

		return stopInterval;
	}, [
		state.isPaused,
		state.gameOver,
		state.speed,
		state.isSoundEffectsEnabled,
		dispatch,
	]);
};
