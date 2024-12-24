import React from "react";
import { ControlProps } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type Props = Omit<ControlProps, "pressedKey">

const PausedScreen: React.FC<Props> = ({ state, dispatch }) => {
	return (
		<div
			onClick={() => {
				playSoundEffect("pause", state.isSoundEffectsEnabled);
				dispatch({ type: "TOGGLE_PAUSE" });
			}}
			className="absolute z-40 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 mx-4 text-center"
		>
			<h3 className="text-3xl font-extrabold text-nowrap animate-pulse text-red-800 px-4 py-1 rounded-lg bg-gray-300/35 border border-red-400">
				Paused
			</h3>
			<h5 className="px-4 py-2 bg-red-800/90 text-white text-sm font-semibold tracking-wider rounded">
				Press Space or Any Arrow Button or Click Anywhere in the Grid to
				Resume
			</h5>
		</div>
	);
};

export default PausedScreen;
