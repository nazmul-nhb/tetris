import React, { Dispatch } from "react";
import { FaTheaterMasks } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import { GameAction, GameState, PressedKey } from "../types";
import { useRestartGame } from "../hooks/useRestartGame";
import Confirmation from "./Confirmation";

type Props = {
	state: GameState;
	dispatch: Dispatch<GameAction>;
	pressedKey: PressedKey | null;
};

/**
 * `ToggleMode` component to switch between hard and easy mode in the game.
 *
 * @param state - The current game state.
 * @param dispatch - The dispatch function to trigger actions in the game state.
 * @param pressedKey - The key currently pressed (used for special animations).
 */
const ToggleMode: React.FC<Props> = ({ state, dispatch, pressedKey }) => {
	const {
		showPopup: showTogglePopUp,
		restartGame: toggleMode,
		confirmRestart: confirmModeChange,
		cancelRestart: cancelModeChange,
	} = useRestartGame({
		state,
		dispatch,
		toggleMode: true,
	});

	return (
		<React.Fragment>
			<div className="absolute top-12 left-1/2 -translate-x-1/2 z-40">
				<button
					onClick={toggleMode}
					title={
						state.isHardMode
							? "Change to Easy Mode"
							: "Change to Hard Mode"
					}
					className={`text-base font-bold text-red-50 w-7 aspect-square flex items-center justify-center rounded-full border-2 cursor-pointer transition-all p-1 ${
						state.isHardMode ? "bg-blue-700" : "bg-orange-800"
					} ${
						pressedKey === "Hard"
							? "scale-75 duration-150"
							: "active:scale-75 hover:scale-[1.2] duration-300"
					}`}
				>
					{state.isHardMode ? <FaMasksTheater /> : <FaTheaterMasks />}
				</button>
			</div>

			{showTogglePopUp && (
				<Confirmation
					key="toggle-mode-button"
					onConfirm={confirmModeChange}
					onCancel={cancelModeChange}
					message={`Reset Current Progress and Switch to ${
						state.isHardMode ? "Easy" : "Hard"
					} Mode?`}
				/>
			)}
		</React.Fragment>
	);
};

export default ToggleMode;
