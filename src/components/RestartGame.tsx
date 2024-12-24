import React from "react";
import { ControlProps } from "../types";
import { RiRefreshFill } from "react-icons/ri";
import { playSoundEffect } from "../utilities/soundUtils";

const RestartGame: React.FC<ControlProps> = ({
	state,
	dispatch,
	pressedKey,
}) => {
	return (
		<button
			onClick={() => {
				playSoundEffect("pause", state.isSoundEffectsEnabled);
				dispatch({ type: "RESET_GRID" });
			}}
			className={`${
				pressedKey === "Restart"
					? "scale-90 duration-150 rotate-180"
					: "hover:scale-125 active:rotate-180 active:scale-75 hover:-rotate-45 duration-300"
			} outline-none transition-all`}
			title="Restart Game"
		>
			<RiRefreshFill
				className="bg-white text-orange-800 rounded-full -p-2 rotate-[-57deg]"
				size={36}
			/>
		</button>
	);
};

export default RestartGame;
