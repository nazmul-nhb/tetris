import { useEffect, useRef } from "react";

/**
 * Custom hook to handle continuous actions on mouse or touch events.
 * @param action The action to perform repeatedly.
 * @param isGameOver Indicates if the game is over.
 * @param delay Interval delay in milliseconds. Default is 50ms.
 */
export const useAction = (
	action: () => void,
	isGameOver: boolean = false,
	delay: number = 50
) => {
	const intervalRef = useRef<number | null>(null);

	/** Start the Action */
	const startAction = () => {
		// Prevent action if the game is over
		if (isGameOver) return;
		// Perform the action immediately
		action();

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
	};

	/** Clean up the interval if the game ends */
	useEffect(() => {
		if (isGameOver) {
			stopAction();
		}

		return stopAction; // Cleanup on unmount
	}, [isGameOver]);

	return { start: startAction, stop: stopAction };
};
