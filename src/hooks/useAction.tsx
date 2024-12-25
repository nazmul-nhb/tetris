import { useEffect, useRef } from "react";
import { throttleButtonPress } from "../utilities/gameUtils";

/**
 * Custom hook to handle continuous actions on mouse or touch events with throttling.
 * @param action The action to perform repeatedly.
 * @param isGameOver Indicates if the game is over.
 * @param delay Interval delay in milliseconds. Default is 50ms.
 * @param throttle Delay for throttling start and stop actions. Default is 150ms.
 */
export const useAction = (
	action: () => void,
	isGameOver: boolean = false,
	delay: number = 50,
	throttle: number = 150
) => {
	const intervalRef = useRef<number | null>(null);

	/** Start the Action (Throttled) */
	const startAction = throttleButtonPress(() => {
		if (isGameOver) return;

		action();

		intervalRef.current = window.setInterval(() => {
			action();
		}, delay);
	}, throttle);

	/** Stop the Action (Throttled) */
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

		return stopAction;
	}, [isGameOver]);

	return { start: startAction, stop: stopAction };
};
