import { GameState } from "../types";
import { TETROMINOS } from "../constants";
import { gameReducer } from "../reducers/gameReducer";
import React, { useEffect, useReducer, useState } from "react";
import { createEmptyGrid, getRenderedGrid } from "../utilities/gameUtils";
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
} from "react-icons/fa6";

/** The initial game state */
const initialState: GameState = {
	grid: createEmptyGrid(),
	currentPiece: TETROMINOS.T,
	position: { x: 4, y: 0 },
	score: 0,
	gameOver: false,
	isPaused: false,
};

/** Tetris Component */
const Tetris: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const [keyPressed, setKeyPressed] = useState<string | null>(null);

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
		const interval = setInterval(() => {
			if (state.isPaused || state.gameOver) return; // Prevent movement if paused or game over

			if (state.currentPiece) {
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [state.currentPiece, state.gameOver, dispatch, state.isPaused]);

	useEffect(() => {
		if (!state.currentPiece) {
			const randomPiece = ["I", "O", "T", "L", "J", "S", "Z"][
				Math.floor(Math.random() * 7)
			];

			dispatch({
				type: "SPAWN_PIECE",
				piece: randomPiece as keyof typeof TETROMINOS,
			});
		}
	}, [state.currentPiece, dispatch]);

	// Attach keyboard listener
	useEffect(() => {
		/** Handle keyboard controls */
		const handleKeyDown = (e: KeyboardEvent) => {
			e.preventDefault();

			if (state.gameOver) return;

			switch (e.key) {
				case "ArrowLeft":
					setKeyPressed("ArrowLeft");
					dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
					break;
				case "ArrowRight":
					setKeyPressed("ArrowRight");
					dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
					break;
				case "ArrowDown":
					setKeyPressed("ArrowDown");
					dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
					break;
				case "ArrowUp":
					setKeyPressed("ArrowUp");
					dispatch({ type: "ROTATE_PIECE" });
					break;
				case " ":
					setKeyPressed(" ");
					dispatch({ type: "TOGGLE_PAUSE" });
					break;
				default:
					break;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [state.gameOver, dispatch]);

	// Reset key pressed after animation completes
	useEffect(() => {
		if (keyPressed) {
			const timeout = setTimeout(() => setKeyPressed(null), 150);
			return () => clearTimeout(timeout);
		}
	}, [keyPressed]);

	return (
		<section className="flex flex-col items-center">
			<h2 className="text-lg font-semibold mt-4">Score: {state.score}</h2>
			{/* Restart Game Button */}
			<button
				onClick={() => dispatch({ type: "RESET_GRID" })}
				className="text-white my-3 hover:-translate-y-1 outline-none active:rotate-180 active:translate-y-1 transition-all duration-300"
				title="Restart Game"
			>
				<FaArrowsRotate size={36} />
			</button>

			{state.gameOver ? (
				<div className="text-red-600 text-2xl font-bold mt-4">
					Game Over
				</div>
			) : (
				<div className="grid grid-cols-12 border border-gray-700">
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
			)}

			{state.gameOver ? (
				<button
					onClick={() => dispatch({ type: "RESET_GRID" })}
					className="px-4 py-2 bg-red-800 text-white rounded mt-4 flex items-center gap-2"
				>
					<FaArrowsRotate /> Restart Game
				</button>
			) : (
				<div className="flex justify-center mt-4 text-white">
					<div className="flex flex-col gap-2 items-center">
						{/* Rotate Button */}
						<button
							onClick={() => dispatch({ type: "ROTATE_PIECE" })}
							className={`${
								keyPressed === "ArrowUp"
									? "rotate-90"
									: "hover:-rotate-45 active:rotate-90 duration-300"
							} outline-none transition-all`}
							title="Rotate Piece"
						>
							<FaArrowRotateRight size={30} />
						</button>
						{/* Left Pause/Resume and Right Buttons */}
						<div className="flex justify-center gap-4 w-full">
							<button
								onClick={() =>
									dispatch({
										type: "UPDATE_POSITION",
										x: -1,
										y: 0,
									})
								}
								className={`${
									keyPressed === "ArrowLeft"
										? "-translate-x-1"
										: "hover:translate-x-1 active:-translate-x-1 duration-300"
								} outline-none transition-all`}
								title="Move Left"
							>
								<IoIosArrowDropleftCircle size={32} />
							</button>
							<button
								onClick={() =>
									dispatch({ type: "TOGGLE_PAUSE" })
								}
								className={`${
									keyPressed === " "
										? "scale-90"
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
							<button
								onClick={() =>
									dispatch({
										type: "UPDATE_POSITION",
										x: 1,
										y: 0,
									})
								}
								className={`${
									keyPressed === "ArrowRight"
										? "translate-x-1"
										: "hover:-translate-x-1 active:translate-x-1 duration-300"
								} "outline-none transition-all"`}
								title="Move Right"
							>
								<IoIosArrowDroprightCircle size={32} />
							</button>
						</div>
						<button
							onClick={() =>
								dispatch({
									type: "UPDATE_POSITION",
									x: 0,
									y: 1,
								})
							}
							className={`${
								keyPressed === "ArrowDown"
									? "translate-y-1"
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
