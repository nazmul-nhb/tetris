import { ControlProps } from "../types";
import { FaTasks } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import React, { Dispatch, SetStateAction } from "react";
import { playNextTrack } from "../utilities/musicUtils";
import { RiFolderMusicFill, RiFolderMusicLine } from "react-icons/ri";
import {
	MdMusicNote,
	MdMusicOff,
	MdSkipNext,
	MdVolumeOff,
	MdVolumeUp,
} from "react-icons/md";

type Props = ControlProps & {
	selectedMusic: FileList | null;
	setSelectedMusic: Dispatch<SetStateAction<FileList | null>>;
};

const MusicControls: React.FC<Props> = ({
	state,
	dispatch,
	pressedKey,
	selectedMusic,
	setSelectedMusic,
}) => {
	const selectMusicFolder = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".mp3,.wav,.ogg,.flac,.m4a,.aac";
		input.multiple = true;
		input.webkitdirectory = true;

		// Listen for file selection
		input.addEventListener("change", (event) => {
			const files = (event.target as HTMLInputElement).files;

			if (files && files.length > 0) {
				// Set the selected FileList directly
				setSelectedMusic(files);
			} else {
				console.warn(
					"No valid audio files found in the selected folder."
				);
			}
		});

		// Trigger the file/folder selection dialog
		input.click();
	};

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
				{/* Toggle Music On/Off*/}
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
				{/* Select a music folder */}
				<button
					title="Select Your Own Music Tracks"
					className={`${
						pressedKey === "Music"
							? "scale-90 duration-150"
							: "hover:scale-125 active:scale-90 duration-300"
					} outline-none transition-all`}
					onClick={selectMusicFolder}
				>
					{selectedMusic ? (
						<RiFolderMusicFill size={20} />
					) : (
						<RiFolderMusicLine size={20} />
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
					title="Play Next Music Track"
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
