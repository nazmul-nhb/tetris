import { ControlProps } from "../types";
import { FaTasks } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { playNextTrack } from "../utilities/musicUtils";
import { RiFolderMusicFill, RiFolderMusicLine } from "react-icons/ri";
import { BsFileEarmarkMusic } from "react-icons/bs";
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
	showOptions: boolean;
	setShowOptions: Dispatch<SetStateAction<boolean>>;
};

const MusicControls: React.FC<Props> = ({
	state,
	dispatch,
	pressedKey,
	selectedMusic,
	setSelectedMusic,
	showOptions,
	setShowOptions,
}) => {
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowOptions]);

	const selectMusic = (isFolder: boolean) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".mp3,.wav,.ogg,.flac,.m4a,.aac";
		input.multiple = true;

		if (isFolder) {
			// Folder selection
			input.webkitdirectory = true;
		} else {
			// File(s) selection
			input.webkitdirectory = false;
		}

		// Listen for file or folder selection
		input.addEventListener("change", (event) => {
			const files = (event.target as HTMLInputElement).files;

			if (files && files.length > 0) {
				// Filter out non-audio files based on the accepted file types
				const audioFiles = Array.from(files).filter((file) =>
					/\.mp3$|\.wav$|\.ogg$|\.flac$|\.m4a$|\.aac$/i.test(
						file.name
					)
				);

				if (audioFiles.length > 0) {
					// Create a FileList-like object using DataTransfer
					const dataTransfer = new DataTransfer();
					audioFiles.forEach((file) => dataTransfer.items.add(file));

					// Set the selected audio files
					setSelectedMusic(dataTransfer.files);
				}
			}
		});

		input.click();
		setShowOptions(false);
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
				{/* File/Folder Selections */}
				<div ref={buttonRef} className="flex items-center">
					{/* Music Folder or File Select Button */}
					<button
						title="Select Your Own Music Tracks"
						onClick={() => setShowOptions((prev) => !prev)}
						className={`${
							pressedKey === "Folder"
								? "scale-90 duration-150"
								: "hover:scale-125 active:scale-90 duration-300"
						} outline-none transition-all`}
					>
						{selectedMusic ? (
							<RiFolderMusicFill size={20} />
						) : (
							<RiFolderMusicLine size={20} />
						)}
					</button>

					{/* Dropdown for file/folder selection */}
					{showOptions && (
						<div className="absolute bg-slate-950 border p-2 rounded shadow-md flex gap-2 top-10 left-1/2 -translate-x-1/2 !z-50">
							<button
								className="hover:scale-125 active:scale-90 duration-300 outline-none transition-all"
								onClick={() => selectMusic(true)}
								title="Select Folder"
							>
								<RiFolderMusicLine size={20} />
							</button>
							<button
								className="hover:scale-125 active:scale-90 duration-300 outline-none transition-all"
								onClick={() => selectMusic(false)}
								title="Select File(s)"
							>
								<BsFileEarmarkMusic size={18} />
							</button>
						</div>
					)}
				</div>
				{/* Play Next Music Track */}
				<button
					onClick={() => {
						playNextTrack(true);
						dispatch({ type: "CHANGE_TRACK" });
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
