import React from "react";
import { ControlProps } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";
import { FaArrowsRotate } from "react-icons/fa6";

type Props = Omit<ControlProps, "pressedKey">;

const GameOverScreen: React.FC<Props> = ({ state, dispatch }) => {
	return (
		<div className="absolute z-40 top-1/2 -translate-y-1/2 text-nowrap font-bold flex flex-col items-center gap-2">
			<h3 className="text-3xl font-black animate-bounce text-red-800 px-4 py-1 rounded-lg bg-red-200/75 border border-red-400">
				Game Over
			</h3>
			<h3 className="text-2xl font-black animate-pulse text-red-800 px-4 py-1 rounded-lg bg-red-200/85 border border-red-400 tracking-tight">
				You Scored {state.score}
			</h3>
			<button
				onClick={() => {
					playSoundEffect("pause", state.isSoundEffectsEnabled);
					dispatch({ type: "RESET_GRID" });
				}}
				className="px-4 py-2 bg-red-800 text-white text-lg tracking-wider rounded flex items-center gap-2 hover:scale-110 outline-none active:scale-90 transition-all duration-300 group"
			>
				<span className="group-hover:-rotate-45 group-active:rotate-180 transition-all duration-300">
					<FaArrowsRotate />
				</span>
				<span>Restart Game</span>
			</button>
		</div>
	);
};

export default GameOverScreen;
