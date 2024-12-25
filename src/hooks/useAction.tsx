import { useEffect, useRef } from "react";

/**
 * Custom hook to handle continuous actions on mouse or touch events with throttling.
 * @param action The action to perform repeatedly.
 * @param isGameOver Indicates if the game is over.
 * @param delay Interval delay in milliseconds. Default is 50ms.
 * @param throttle Throttle delay for starting the action. Default is 200ms.
 */
export const useAction = (
	action: () => void,
	isGameOver: boolean = false,
	delay: number = 50,
	throttle: number = 200
) => {
	const intervalRef = useRef<number | null>(null);
	const lastStartRef = useRef<number>(0);
	const touchTimeoutRef = useRef<number | null>(null);

	/** Start the Action (throttled) */
	const startAction = () => {
		const now = Date.now();
		if (isGameOver || now - lastStartRef.current < throttle) return;

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

	/** Cleanup on Unmount or Game Over */
	useEffect(() => {
		if (isGameOver) {
			stopAction();
		}

		return stopAction; // Cleanup on unmount
	}, [isGameOver]);

	return {
		start: startAction,
		stop: stopAction,
		startTouch: startTouchAction,
		stopTouch: stopTouchAction,
	};
};
