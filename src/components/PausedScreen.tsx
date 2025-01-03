import React from "react";
import { ControlProps } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type Props = Omit<ControlProps, "pressedKey">;

/**
 * PausedScreen component displays the paused screen with a message and instructions to resume the game.
 * It also plays a sound effect and toggles the game's pause state when clicked.
 *
 * @param state - The current game state.
 * @param dispatch - The dispatch function for dispatching actions to update the game state.
 */
const PausedScreen: React.FC<Props> = ({ state, dispatch }) => {
	return (
		<div
			onClick={() => {
				playSoundEffect("pause", state.isSoundEffectsEnabled);
				dispatch({ type: "TOGGLE_PAUSE" });
			}}
			className="absolute z-40 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 mx-4 text-center"
		>
			<h3 className="text-3xl font-black text-nowrap animate-pulse text-red-800 px-4 py-1 rounded-lg bg-red-200/75 border border-red-400">
				Paused
			</h3>
			<h5 className="px-2.5 py-2 bg-red-800/85 text-white text-sm font-semibold tracking-wider rounded">
				Press "Space", or
				<br /> Any "Arrow Button", or
				<br /> Click "Play" Button, or
				<br /> Anywhere in the Grid to Resume
			</h5>
		</div>
	);
};

export default PausedScreen;
