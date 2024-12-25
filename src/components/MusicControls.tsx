import React from "react";
import { ControlProps } from "../types";
import { playNextTrack } from "../utilities/soundUtils";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import {
	MdMusicNote,
	MdMusicOff,
	MdSkipNext,
	MdVolumeOff,
	MdVolumeUp,
} from "react-icons/md";

const MusicControls: React.FC<ControlProps> = ({
	state,
	dispatch,
	pressedKey,
}) => {
	return (
		<div className="flex justify-between w-full relative mb-2 tracking-wider">
			{/* Total Lines Cleared */}
			<h2
				title="Total Lines Cleared"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaTasks size={21} /> {state.totalLines}
			</h2>
			<div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex items-center gap-1">
				{/* Toggle Sound Effects */}
				<button
					onClick={() => {
						dispatch({ type: "TOGGLE_SOUND_EFFECTS" });
					}}
					className={`${
						pressedKey === "Sound"
							? "scale-90 duration-150"
							: "hover:scale-125 active:scale-90 duration-300"
					} outline-none transition-all`}
					title={
						state.isSoundEffectsEnabled
							? "Disable Sound Effects"
							: "Enable Sound Effects"
					}
					aria-label={
						state.isSoundEffectsEnabled
							? "Disable Sound Effects"
							: "Enable Sound Effects"
					}
				>
					{state.isSoundEffectsEnabled ? (
						<MdVolumeUp size={20} />
					) : (
						<MdVolumeOff size={20} />
					)}
				</button>
				{/* Toggle Music */}
				<button
					onClick={() => dispatch({ type: "TOGGLE_MUSIC" })}
					className={`${
						pressedKey === "Music"
							? "scale-90 duration-150"
							: "hover:scale-125 active:scale-90 duration-300"
					} outline-none transition-all`}
					title={
						state.isMusicEnabled ? "Disable Music" : "Enable Music"
					}
					aria-label={
						state.isMusicEnabled ? "Disable Music" : "Enable Music"
					}
				>
					{state.isMusicEnabled ? (
						<MdMusicNote size={20} />
					) : (
						<MdMusicOff size={20} />
					)}
				</button>
				{/* Play Next Music Track */}
				<button
					onClick={() => {
						playNextTrack(true);
						dispatch({
							type: "TOGGLE_MUSIC",
							enableMusic: true,
						});
					}}
					className={`${
						pressedKey === "Next"
							? "-translate-x-1 duration-150"
							: "hover:translate-x-1 active:-translate-x-1 duration-300"
					} outline-none transition-all`}
					title="Restart Game"
				>
					<MdSkipNext size={20} />
				</button>
			</div>
			{/* Lines Cleared in Current Session */}
			<h2
				title="Lines Cleared"
				className="text-lg font-semibold flex items-center gap-2"
			>
				<FaCheckToSlot size={23} /> {state.linesCleared}
			</h2>
		</div>
	);
};

export default MusicControls;
