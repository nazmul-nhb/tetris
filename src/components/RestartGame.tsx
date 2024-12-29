import React from "react";
import { ControlProps } from "../types";
import Confirmation from "./Confirmation";
import { RiRefreshFill } from "react-icons/ri";
import { useRestartGame } from "../hooks/useRestartGame";

/**
 * RestartGame component provides a button to restart the game and shows a confirmation popup.
 * The button triggers the restart process and the popup is displayed for confirmation.
 *
 * @param state - The current state of the game, used to determine game modes (e.g., Hard Mode).
 * @param dispatch - The dispatch function to update the game state.
 * @param pressedKey - A string that represents the key being pressed, used to apply visual effects to the button.
 */
const RestartGame: React.FC<ControlProps> = ({
	state,
	dispatch,
	pressedKey,
}) => {
	const { showPopup, restartGame, confirmRestart, cancelRestart } =
		useRestartGame({
			state,
			dispatch,
		});

	return (
		<div className="absolute top-12 -right-3 z-50">
			<button
				onClick={restartGame}
				className={`${
					pressedKey === "Restart"
						? "scale-90 duration-150 rotate-180"
						: "hover:scale-125 active:rotate-180 active:scale-75 hover:-rotate-90 duration-300"
				} outline-none transition-all`}
				title="Restart Game"
			>
				<RiRefreshFill
					className={`bg-white rounded-full -p-2 rotate-[-57deg] ${
						state.isHardMode ? "text-blue-700" : "text-orange-800"
					}`}
					size={36}
				/>
			</button>

			{showPopup && (
				<Confirmation
					key="restart-game-button"
					onConfirm={confirmRestart}
					onCancel={cancelRestart}
					message="Want to Restart the Game? Current Progress will be Reset."
				/>
			)}
		</div>
	);
};

export default RestartGame;
