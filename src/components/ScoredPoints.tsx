import React from "react";
import { playSoundEffect } from "../utilities/soundUtils";
import { ControlProps } from "../types";
import { FaArrowsRotate, FaCoins, FaTrophy } from "react-icons/fa6";

const ScoredPoints: React.FC<ControlProps> = ({
	state,
	dispatch,
	pressedKey,
}) => {
	return (
		<div className="flex justify-between items-center w-full relative pb-2">
			{/* Best Score */}
			<h2
				title="Best Score"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaTrophy size={24} />
				{state.bestScore}
			</h2>
			{/* Restart Game Button */}
			<button
				onClick={() => {
					playSoundEffect("pause", state.isSoundEffectsEnabled);
					dispatch({ type: "RESET_GRID" });
				}}
				className={`${
					pressedKey === "Escape"
						? "scale-90 duration-150 rotate-180"
						: "hover:scale-125 active:rotate-180 active:scale-75 hover:-rotate-45 duration-300"
				} text-white my-3 outline-none transition-all absolute left-1/2 -translate-x-1/2`}
				title="Restart Game"
			>
				<FaArrowsRotate size={24} />
			</button>
			{/* Current Score */}
			<h2
				title="Current Score"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaCoins size={24} /> {state.score}
			</h2>
		</div>
	);
};

export default ScoredPoints;
