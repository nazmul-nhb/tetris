import React from "react";
import { ControlProps } from "../types";
import Confirmation from "./Confirmation";
import { RiRefreshFill } from "react-icons/ri";
import { useRestartGame } from "../hooks/useRestartGame";

// Restart Game Component with Confirmation Popup
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
		<div>
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
					onConfirm={confirmRestart}
					onCancel={cancelRestart}
				/>
			)}
		</div>
	);
};

export default RestartGame;
