// SpeedDisplay.tsx
import React from "react";
import { GameState } from "../types";
import { getSpeedMultiplier } from "../utilities/gameUtils";

type Props = { state: GameState };

/**
 * `SpeedDisplay` component that shows the current dropping speed of the tetrominos.
 *
 * @param state - The current game state, including the speed of the tetrominos.
 */
const SpeedDisplay: React.FC<Props> = ({ state }) => (
	<div
		title={`Drop speed: One piece every ${state.speed} milliseconds`}
		className={`absolute top-12 -left-3 z-30 tracking-wider w-9 aspect-square text-[13px] flex items-center justify-center p-1 rounded-full border-[3.5px] font-extrabold hover:scale-[1.2] hover:rotate-[360deg] transition-all duration-300 ${
			state.isHardMode ? "bg-blue-700" : "bg-orange-800"
		}`}
	>
		<h4 className="font-black relative">
			{getSpeedMultiplier(state.speed)}
			<span className="text-[9.5px]">x</span>
		</h4>
	</div>
);

export default SpeedDisplay;
