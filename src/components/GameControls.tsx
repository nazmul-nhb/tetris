import React from "react";
import { ControlProps } from "../types";
import { useAction } from "../hooks/useAction";
import { playSoundEffect } from "../utilities/soundUtils";
import { FaArrowRotateRight, FaCirclePause, FaPlay } from "react-icons/fa6";
import {
	IoIosArrowDropdownCircle,
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from "react-icons/io";

const GameControls: React.FC<ControlProps> = ({
	state,
	dispatch,
	pressedKey,
}) => {
	// Rotate Button
	const { start: startRotate, stop: stopRotate } = useAction(
		() => {
			playSoundEffect("rotate", state.isSoundEffectsEnabled);
			dispatch({ type: "ROTATE_PIECE" });
		},
		state.gameOver,
		250
	);

	// Left Button
	const { start: startLeft, stop: stopLeft } = useAction(
		() => {
			playSoundEffect("move", state.isSoundEffectsEnabled);
			dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
		},
		state.gameOver,
		150
	);

	// Pause/Resume Button
	const handlePauseResume = () => {
		playSoundEffect("pause", state.isSoundEffectsEnabled);
		dispatch({ type: "TOGGLE_PAUSE" });
	};

	// Right Button
	const { start: startRight, stop: stopRight } = useAction(
		() => {
			playSoundEffect("move", state.isSoundEffectsEnabled);
			dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
		},
		state.gameOver,
		150
	);

	// Down Button
	const { start: startDown, stop: stopDown } = useAction(() => {
		playSoundEffect("drop", state.isSoundEffectsEnabled);
		dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
	}, state.gameOver);

	return (
		<div className="flex justify-center mt-2 text-white">
			<div className="flex flex-col gap-3 items-center">
				{/* Rotate Button */}
				<button
					onMouseDown={startRotate}
					onMouseUp={stopRotate}
					onMouseLeave={stopRotate}
					onTouchStart={startRotate}
					onTouchEnd={stopRotate}
					className={`${
						pressedKey === "ArrowUp"
							? "rotate-180 duration-150"
							: "hover:-rotate-45 active:rotate-180 duration-300"
					} outline-none transition-all`}
					title="Rotate Piece"
				>
					<FaArrowRotateRight size={30} />
				</button>
				{/* Left, Pause/Resume and Right Buttons */}
				<div className="flex justify-center gap-4 w-full">
					{/* Left Arrow */}
					<button
						onMouseDown={startLeft}
						onMouseUp={stopLeft}
						onMouseLeave={stopLeft}
						onTouchStart={startLeft}
						onTouchEnd={stopLeft}
						className={`${
							pressedKey === "ArrowLeft"
								? "-translate-x-1 duration-150"
								: "hover:translate-x-1 active:-translate-x-1 duration-300"
						} outline-none transition-all`}
						title="Move Left"
					>
						<IoIosArrowDropleftCircle size={32} />
					</button>
					{/* Pause/Resume */}
					<button
						onClick={handlePauseResume}
						className={`${
							pressedKey === "Space"
								? "scale-90 duration-150"
								: "hover:scale-125 active:scale-90 duration-300"
						} outline-none transition-all`}
					>
						{state.isPaused ? (
							<FaPlay title="Resume Game" size={32} />
						) : (
							<FaCirclePause title="Pause Game" size={32} />
						)}
					</button>
					{/* Right Arrow */}
					<button
						onMouseDown={startRight}
						onMouseUp={stopRight}
						onMouseLeave={stopRight}
						onTouchStart={startRight}
						onTouchEnd={stopRight}
						className={`${
							pressedKey === "ArrowRight"
								? "translate-x-1 duration-150"
								: "hover:-translate-x-1 active:translate-x-1 duration-300"
						} "outline-none transition-all"`}
						title="Move Right"
					>
						<IoIosArrowDroprightCircle size={32} />
					</button>
				</div>
				{/* Down Arrow */}
				<button
					onMouseDown={startDown}
					onMouseUp={stopDown}
					onMouseLeave={stopDown}
					onTouchStart={startDown}
					onTouchEnd={stopDown}
					className={`${
						pressedKey === "ArrowDown"
							? "translate-y-1 duration-150"
							: "hover:-translate-y-1 active:translate-y-1 duration-300"
					} outline-none transition-all`}
					title="Move Down"
				>
					<IoIosArrowDropdownCircle size={32} />
				</button>
			</div>
		</div>
	);
};

export default GameControls;