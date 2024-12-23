import { GameState, PressedKey } from "../types";
import { TETROMINOS } from "../constants";
import { gameReducer } from "../reducers/gameReducer";
import { getSavedScores } from "../utilities/localStorage";
import React, { useEffect, useReducer, useState } from "react";
import {
	createEmptyGrid,
	getRandomPiece,
	getRenderedGrid,
	throttleKeyPress,
} from "../utilities/gameUtils";
import {
	IoIosArrowDroprightCircle,
	IoIosArrowDropleftCircle,
	IoIosArrowDropdownCircle,
} from "react-icons/io";
import {
	FaArrowsRotate,
	FaCirclePause,
	FaPlay,
	FaArrowRotateRight,
	FaTrophy,
	FaCoins,
	FaCheckToSlot,
} from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

/** The initial game state */
const initialState: GameState = {
	grid: createEmptyGrid(),
	currentPiece: TETROMINOS[getRandomPiece()],
	position: { x: 4, y: 0 },
	score: 0,
	bestScore: getSavedScores().bestScore,
	linesCleared: 0,
	totalLines: getSavedScores().totalLines,
	gameOver: false,
	isPaused: false,
};

/** Tetris Component */
const Tetris: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const [pressedKey, setPressedKey] = useState<PressedKey | null>(null);

	/** Get the rendered grid with the current piece. */
	const renderedGrid = state.currentPiece
		? getRenderedGrid(
				state.grid,
				state.currentPiece.shape,
				state.position,
				state.currentPiece.color
		  )
		: state.grid;

	/** Automatically drop the Tetromino every second */
	useEffect(() => {
		let interval: number;

		if (!state.isPaused && !state.gameOver) {
			interval = setInterval(() => {
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [state.isPaused, state.gameOver, dispatch]);

	useEffect(() => {
		if (!state.currentPiece) {
			dispatch({ type: "CLEAR_ROWS" });

			const randomPiece = getRandomPiece();

			dispatch({
				type: "SPAWN_PIECE",
				piece: randomPiece,
			});
		}
	}, [state.currentPiece, dispatch]);

	// Attach keyboard listener
	useEffect(() => {
		/** Handle keyboard controls */
		const handleKeyDown = throttleKeyPress((e: KeyboardEvent) => {
			e.preventDefault();

			if (state.gameOver) return;

			switch (e.key) {
				case "ArrowLeft":
					setPressedKey("ArrowLeft");
					dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
					break;
				case "ArrowRight":
					setPressedKey("ArrowRight");
					dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
					break;
				case "ArrowDown":
					setPressedKey("ArrowDown");
					dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
					break;
				case "ArrowUp":
					setPressedKey("ArrowUp");
					dispatch({ type: "ROTATE_PIECE" });
					break;
				case " ":
					setPressedKey("Space");
					dispatch({ type: "TOGGLE_PAUSE" });
					break;
				default:
					break;
			}
		}, 50);
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [state.gameOver, dispatch]);

	// Reset key pressed after animation completes
	useEffect(() => {
		if (pressedKey) {
			const timeout = setTimeout(() => setPressedKey(null), 150);
			return () => clearTimeout(timeout);
		}
	}, [pressedKey]);

	return (
		<section className="flex flex-col items-center select-none">
			{/* Container for Main Grid and all the Buttons */}
			<div className="relative flex flex-col items-center gap-2">
				{/* Current & Best Scores with Restart Button */}
				<div className="flex justify-between items-center w-full">
					<h2
						title="Best Score"
						className="text-lg font-semibold flex items-center gap-2"
					>
						<FaTrophy size={24} />
						{state.bestScore}
					</h2>
					{/* Restart Game Button */}
					<button
						onClick={() => dispatch({ type: "RESET_GRID" })}
						className="text-white my-3 hover:scale-125 hover:-rotate-45 outline-none active:rotate-180 active:scale-75 transition-all duration-500"
						title="Restart Game"
					>
						<FaArrowsRotate size={28} />
					</button>
					<h2
						title="Current Score"
						className="text-lg font-semibold flex items-center gap-2"
					>
						<FaCoins size={24} /> {state.score}
					</h2>
				</div>
				{/* Control Background based on gameOver flag */}
				<div
					className={`${
						state.gameOver || (!state.gameOver && state.isPaused)
							? "blur-sm z-30"
							: "bg-transparent"
					} flex flex-col items-center bg-white p-3 rounded-md`}
				>
					{/* Main Tetrominos Grid */}
					<div
						onClick={() => dispatch({ type: "TOGGLE_PAUSE" })}
						className={`${
							state.gameOver ? "-z-10" : "z-10"
						} grid grid-cols-12 border border-gray-700`}
					>
						{renderedGrid.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									className="w-5 h-5 border border-gray-400"
									style={{
										backgroundColor: cell.filled
											? cell.color || "gray"
											: "white",
									}}
								/>
							))
						)}
					</div>
				</div>
				{/* Total Lines and Current Lines Cleared */}
				<div className="flex justify-between w-full">
					<h2
						title="Total Lines Cleared"
						className="text-lg font-semibold flex items-center gap-2"
					>
						<FaTasks size={24} /> {state.totalLines}
					</h2>
					<h2
						title="Lines Cleared"
						className="text-lg font-semibold flex items-center gap-2"
					>
						<FaCheckToSlot size={24} /> {state.linesCleared}
					</h2>
				</div>
				{/* Restart Game button in the center of the Grid */}
				{state.gameOver && (
					<div className="absolute z-40 top-1/2 -translate-y-1/2 text-nowrap font-bold flex flex-col items-center gap-2">
						<h3 className="text-3xl animate-bounce text-red-800 px-4 py-1 rounded-lg bg-gray-300/35 border border-red-400">
							Game Over
						</h3>
						<button
							onClick={() => dispatch({ type: "RESET_GRID" })}
							className="px-4 py-2 bg-red-800 text-white text-lg tracking-wider rounded flex items-center gap-2 hover:scale-110 outline-none active:scale-90 transition-all duration-300 group"
						>
							<span className="group-hover:-rotate-45 group-active:rotate-180 transition-all duration-300">
								<FaArrowsRotate />
							</span>
							<span>Restart Game</span>
						</button>
					</div>
				)}
				{/* Pause Button */}
				{!state.gameOver && state.isPaused && (
					<div
						onClick={() => dispatch({ type: "TOGGLE_PAUSE" })}
						className="absolute z-40 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 mx-4 text-center"
					>
						<h3 className="text-3xl font-bold text-nowrap animate-bounce text-red-800 px-4 py-1 rounded-lg bg-gray-300/35 border border-red-400">
							Paused
						</h3>
						<h5 className="px-4 py-2 bg-red-800/90 text-white text-sm font-semibold tracking-wider rounded">
							Press Space or Any Arrow Button or Click Anywhere in
							the Grid to Resume
						</h5>
					</div>
				)}
			</div>
			{/* Game Control Buttons */}
			{!state.gameOver && (
				<div className="flex justify-center mt-2 text-white">
					<div className="flex flex-col gap-3 items-center">
						{/* Rotate Button */}
						<button
							onClick={() => dispatch({ type: "ROTATE_PIECE" })}
							className={`${
								pressedKey === "ArrowUp"
									? "rotate-90 duration-150"
									: "hover:-rotate-45 active:rotate-90 duration-300"
							} outline-none transition-all`}
							title="Rotate Piece"
						>
							<FaArrowRotateRight size={30} />
						</button>
						{/* Left, Pause/Resume and Right Buttons */}
						<div className="flex justify-center gap-4 w-full">
							{/* Left Arrow */}
							<button
								onClick={() =>
									dispatch({
										type: "UPDATE_POSITION",
										x: -1,
										y: 0,
									})
								}
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
								onClick={() =>
									dispatch({ type: "TOGGLE_PAUSE" })
								}
								className={`${
									pressedKey === "Space"
										? "scale-90 duration-150"
										: "hover:scale-110 active:scale-90 duration-300"
								} outline-none transition-all`}
							>
								{state.isPaused ? (
									<FaPlay title="Resume Game" size={32} />
								) : (
									<FaCirclePause
										title="Pause Game"
										size={32}
									/>
								)}
							</button>
							{/* Right Arrow */}
							<button
								onClick={() =>
									dispatch({
										type: "UPDATE_POSITION",
										x: 1,
										y: 0,
									})
								}
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
							onClick={() =>
								dispatch({
									type: "UPDATE_POSITION",
									x: 0,
									y: 1,
								})
							}
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
			)}
		</section>
	);
};

export default Tetris;
