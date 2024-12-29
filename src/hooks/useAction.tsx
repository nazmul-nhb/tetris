import { useEffect, useRef } from "react";
import { GameState } from "../types";

/**
 * Custom hook to handle continuous actions on mouse or touch events with throttling.
 * @param action The action to perform repeatedly.
 * @param state Current game state.
 * @param delay Interval delay in milliseconds. Default is 50ms.
 * @param throttle Throttle delay for starting the action. Default is 200ms.
 */
export const useAction = (
	action: () => void,
	state: GameState,
	delay: number = 50,
	throttle: number = 200
) => {
	const intervalRef = useRef<number | null>(null);
	const lastStartRef = useRef<number>(0);
	const touchTimeoutRef = useRef<number | null>(null);

	/** Start the Action (throttled) */
	const startAction = () => {
		const now = Date.now();

		if (state.gameOver || now - lastStartRef.current < throttle) return;

		lastStartRef.current = now;

		action(); // Perform the action immediately

		intervalRef.current = window.setInterval(() => {
			action();
		}, delay);
	};

	/** Stop the Action */
	const stopAction = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		if (touchTimeoutRef.current !== null) {
			clearTimeout(touchTimeoutRef.current);
			touchTimeoutRef.current = null;
		}
	};

	/** Handle Touch-specific Behavior */
	const startTouchAction = () => {
		// Prevent accidental double start on touch devices
		touchTimeoutRef.current = window.setTimeout(() => {
			startAction();
		}, throttle);
	};

	const stopTouchAction = () => {
		stopAction();
	};

	/** Cleanup on Unmount or Game Over or current piece is locked */
	useEffect(() => {
		if (state.gameOver || !state.currentPiece) {
			stopAction();
		}

		return stopAction;
	}, [state.currentPiece, state.gameOver]);

	return {
		start: startAction,
		stop: stopAction,
		startTouch: startTouchAction,
		stopTouch: stopTouchAction,
	};
};
