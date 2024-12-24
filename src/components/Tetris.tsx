import { TETROMINOS } from "../constants";
import GameControls from "./GameControls";
import MusicControls from "./MusicControls";
import PausedScreen from "./PausedScreen";
import GameOverScreen from "./GameOverScreen";
import ScoredPoints from "./ScoredPoints";
import PointsPopUp from "./PointsPopUp";
import { GameState, PressedKey } from "../types";
import { gameReducer } from "../reducers/gameReducer";
import { getSavedScores } from "../utilities/localStorage";
import React, { useEffect, useReducer, useState } from "react";
import {
	playNextTrack,
	playSoundEffect,
	toggleMusic,
} from "../utilities/soundUtils";
import {
	createEmptyGrid,
	getRandomPiece,
	getRenderedGrid,
	throttleKeyPress,
} from "../utilities/gameUtils";

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
	isMusicEnabled: false,
	isSoundEffectsEnabled: true,
	points: null,
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
				playSoundEffect("move", state.isSoundEffectsEnabled);
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [state.isPaused, state.gameOver, dispatch, state.isSoundEffectsEnabled]);

	useEffect(() => {
		if (!state.currentPiece) {
			playSoundEffect("clear", state.isSoundEffectsEnabled);
			dispatch({ type: "CLEAR_ROWS" });

			const randomPiece = getRandomPiece();

			dispatch({
				type: "SPAWN_PIECE",
				piece: randomPiece,
			});
		}
	}, [state.currentPiece, dispatch, state.isSoundEffectsEnabled]);

	useEffect(() => {
		toggleMusic(state.isMusicEnabled);
	}, [state.isMusicEnabled]);

	// Attach keyboard listener
	useEffect(() => {
		/** Handle keyboard controls */
		const handleKeyDown = throttleKeyPress((e: KeyboardEvent) => {
			e.preventDefault();

			if (state.gameOver) return;

			switch (e.key) {
				case "ArrowLeft":
					setPressedKey("ArrowLeft");
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
					break;
				case "ArrowRight":
					setPressedKey("ArrowRight");
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
					break;
				case "ArrowDown":
					setPressedKey("ArrowDown");
					playSoundEffect("drop", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
					break;
				case "ArrowUp":
					setPressedKey("ArrowUp");
					playSoundEffect("rotate", state.isSoundEffectsEnabled);
					dispatch({ type: "ROTATE_PIECE" });
					break;
				case " ":
					setPressedKey("Space");
					playSoundEffect("pause", state.isSoundEffectsEnabled);
					dispatch({ type: "TOGGLE_PAUSE" });
					break;
				case "s":
					setPressedKey("Sound");
					dispatch({ type: "TOGGLE_SOUND_EFFECTS" });
					break;
				case "m":
					setPressedKey("Music");
					dispatch({ type: "TOGGLE_MUSIC" });
					break;
				case "Escape":
					setPressedKey("Escape");
					dispatch({ type: "RESET_GRID" });
					break;
				case "n":
					setPressedKey("Next");
					playNextTrack(true);
					dispatch({ type: "TOGGLE_MUSIC", enableMusic: true });
					break;
				default:
					break;
			}
		}, 25);
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [state.gameOver, dispatch, state.isSoundEffectsEnabled]);

	// Reset key pressed after animation completes
	useEffect(() => {
		if (pressedKey) {
			const timeout = setTimeout(() => setPressedKey(null), 150);
			return () => clearTimeout(timeout);
		}
	}, [pressedKey]);

	// Reset Bonus Points
	useEffect(() => {
		if (state.points) {
			const timeout = setTimeout(() => {
				playSoundEffect("clear", state.isSoundEffectsEnabled);
				dispatch({ type: "RESET_POINTS" });
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [state.isSoundEffectsEnabled, state.points]);

	return (
		<section className="flex flex-col items-center select-none overflow-hidden">
			{/* Container for Main Grid and all the Buttons */}
			<div className="relative flex flex-col items-center gap-2 pt-4">
				{/* Current & Best Scores with Restart Button */}
				<ScoredPoints
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
				/>
				{/* Blur Grid Background based on `gameOver` flag */}
				<div
					className={`${
						state.gameOver || (!state.gameOver && state.isPaused)
							? "blur-sm z-30"
							: "blur-none"
					} transition-all duration-500 flex flex-col items-center bg-white p-3 rounded-md relative border border-red-600`}
				>
					{/* Show Points PopUp */}
					<PointsPopUp points={state.points} />
					{/* Main Tetrominos Grid */}
					<div
						onClick={() => {
							playSoundEffect(
								"pause",
								state.isSoundEffectsEnabled
							);
							dispatch({ type: "TOGGLE_PAUSE" });
						}}
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
				{/* Total Lines and Current Lines Cleared
				 with Sound Effects and Music Controls */}
				<MusicControls
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
				/>
				{/* Restart Game button with the Game Over Screen */}
				{state.gameOver && (
					<GameOverScreen state={state} dispatch={dispatch} />
				)}
				{/* Paused Screen */}
				{!state.gameOver && state.isPaused && (
					<PausedScreen state={state} dispatch={dispatch} />
				)}
			</div>
			{/* Game Control Buttons */}
			{!state.gameOver && (
				<GameControls
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
				/>
			)}
		</section>
	);
};

export default Tetris;
