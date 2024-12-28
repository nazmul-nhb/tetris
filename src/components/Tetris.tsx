import GameControls from "./GameControls";
import MusicControls from "./MusicControls";
import PausedScreen from "./PausedScreen";
import GameOverScreen from "./GameOverScreen";
import ScoredPoints from "./ScoredPoints";
import RestartGame from "./RestartGame";
import PointsPopUp from "./PointsPopUp";
import Confirmation from "./Confirmation";
import { PressedKey } from "../types";
import { initialState } from "../constants/state";
import { gameReducer } from "../reducers/gameReducer";
import { useRestartGame } from "../hooks/useRestartGame";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { playSoundEffect } from "../utilities/soundUtils";
import {
	playNextTrack,
	selectMusicFiles,
	toggleMusic,
} from "../utilities/musicUtils";
import {
	getRenderedGrid,
	getSpeedMultiplier,
	throttleKeyPress,
} from "../utilities/gameUtils";
import MusicInfo from "./MusicInfo";

/** Tetris Component */
const Tetris: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const [selectedMusic, setSelectedMusic] = useState<FileList | null>(null);
	const [pressedKey, setPressedKey] = useState<PressedKey | null>(null);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [popupKey, setPopupKey] = useState<number>(Date.now());
	const intervalRef = useRef<number | null>(null);

	const { showPopup, restartGame, confirmRestart, cancelRestart } =
		useRestartGame({
			state,
			dispatch,
		});

	/** Get the rendered grid with the current piece. */
	const renderedGrid = state.currentPiece
		? getRenderedGrid(
				state.grid,
				state.currentPiece.shape,
				state.position,
				state.currentPiece.color
		  )
		: state.grid;

	/** Automatically drop the Tetromino according to `speed` */
	useEffect(() => {
		const startInterval = () => {
			intervalRef.current = window.setInterval(() => {
				playSoundEffect("move", state.isSoundEffectsEnabled);
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}, state.speed);
		};

		const stopInterval = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		if (!state.isPaused && !state.gameOver) {
			startInterval();
		}

		return stopInterval;
	}, [
		state.isPaused,
		state.gameOver,
		state.speed,
		state.isSoundEffectsEnabled,
		dispatch,
	]);

	useEffect(() => {
		if (!state.currentPiece) {
			dispatch({ type: "CLEAR_ROWS" });
			playSoundEffect("drop", state.isSoundEffectsEnabled);
			dispatch({ type: "SPAWN_PIECE" });
		}
	}, [state.currentPiece, dispatch, state.isSoundEffectsEnabled]);

	useEffect(() => {
		if (selectedMusic) {
			selectMusicFiles(selectedMusic);
			dispatch({
				type: "TOGGLE_MUSIC",
				enableMusic: true,
			});
		}
	}, [selectedMusic]);

	useEffect(() => {
		toggleMusic(state.isMusicEnabled);
	}, [state.isMusicEnabled]);

	useEffect(() => {
		if (state.gameOver) {
			playSoundEffect("gameOver", state.isSoundEffectsEnabled);
		}
	}, [state.gameOver, state.isSoundEffectsEnabled]);

	// Attach keyboard listener
	useEffect(() => {
		/** Handle keyboard controls */
		const handleKeyDown = throttleKeyPress((e: KeyboardEvent) => {
			e.preventDefault();

			if (e.key === "Escape" || e.key === "r") {
				setPressedKey("Restart");
				restartGame();
			}

			if (state.gameOver) {
				playSoundEffect("gameOver", state.isSoundEffectsEnabled);
				return;
			}

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
					playSoundEffect("move", state.isSoundEffectsEnabled);
					dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
					break;
				case "ArrowUp":
					setPressedKey("ArrowUp");
					playSoundEffect("rotate", state.isSoundEffectsEnabled);
					dispatch({ type: "ROTATE_PIECE" });
					break;
				case "p":
				case " ":
					setPressedKey("Pause");
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
				case "n":
					setPressedKey("Next");
					playNextTrack(true);
					dispatch({ type: "TOGGLE_MUSIC", enableMusic: true });
					break;
				case "f":
					setPressedKey("Folder");
					setShowOptions((prev) => !prev);
					break;
				case "h":
				case "e":
					setPressedKey("Hard");
					dispatch({ type: "TOGGLE_MODE" });
					break;
				default:
					break;
			}
		}, 25);
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [state.gameOver, dispatch, state.isSoundEffectsEnabled, restartGame]);

	// Reset key pressed after animation completes
	useEffect(() => {
		if (pressedKey) {
			const timeout = setTimeout(() => setPressedKey(null), 150);
			return () => clearTimeout(timeout);
		}
	}, [pressedKey]);

	// Reset Current Scored Points
	useEffect(() => {
		if (state.points) {
			playSoundEffect("clear", state.isSoundEffectsEnabled);

			const timeout = setTimeout(() => {
				dispatch({ type: "RESET_POINTS" });
			}, 1500);

			setPopupKey(Date.now());

			return () => clearTimeout(timeout);
		}
	}, [state.isSoundEffectsEnabled, state.points]);

	return (
		<section className="flex flex-col items-center select-none overflow-hidden">
			{/* Container for Main Grid and all the Buttons */}
			<div className="relative flex flex-col items-center gap-2 pt-4">
				{/* Current & Best Scores with Next Piece */}
				<ScoredPoints state={state} />
				{/* Show Restart Confirmation Popup */}
				{showPopup && (
					<Confirmation
						onConfirm={confirmRestart}
						onCancel={cancelRestart}
					/>
				)}
				{/* Blur Grid Background based on `gameOver` flag */}
				<div
					className={`${
						state.gameOver || (!state.gameOver && state.isPaused)
							? "blur-sm z-30"
							: "blur-none"
					} transition-all duration-500 flex flex-col items-center bg-white p-3 rounded-md relative`}
				>
					{/* Show Points PopUp */}
					<PointsPopUp key={popupKey} points={state.points} />
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
									className={`w-5 h-5 ${
										state.isHardMode && cell.filled
											? "border border-gray-400"
											: !state.isHardMode
											? "border border-gray-400"
											: ""
									}`}
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
				{/* Show Dropping Speed & Change Mode */}
				<div
					title={`Dropping speed: 1 piece per ${state.speed} milliseconds`}
					className={`absolute top-12 -left-3 z-30 tracking-wider w-9 aspect-square text-[13px] flex items-center justify-center p-1 rounded-full border-[3.5px] font-extrabold hover:scale-[1.2] hover:rotate-[360deg] transition-all duration-300 ${
						state.isHardMode ? "bg-blue-700" : "bg-orange-800"
					}`}
				>
					<h4 className="font-black relative">
						{getSpeedMultiplier(state.speed)}
						<span className="text-[9.5px]">x</span>
					</h4>
				</div>
				{/* Current Mode: Hard/Easy */}
				<h4
					onClick={() => dispatch({ type: "TOGGLE_MODE" })}
					title={
						state.isHardMode
							? "Change to Easy Mode"
							: "Change to Hard Mode"
					}
					className={`absolute top-12 left-1/2 -translate-x-1/2 text-sm font-bold text-red-50 w-6 aspect-square flex items-center justify-center rounded-full text-center z-40 border-2 pl-[3px] cursor-pointer transition-all ${
						state.isHardMode ? "bg-blue-700" : "bg-orange-800"
					} ${
						pressedKey === "Hard"
							? "scale-75 duration-150 -rotate-[360deg]"
							: "active:-rotate-[360deg] active:scale-75 hover:scale-[1.2] hover:rotate-[360deg] duration-300"
					}`}
				>
					{state.isHardMode ? "H" : "E"}
				</h4>
				{/* Restart Button at the Right-top Corner */}
				<div className="absolute top-12 -right-3 z-50">
					<RestartGame
						state={state}
						dispatch={dispatch}
						pressedKey={pressedKey}
					/>
				</div>
				{/* Total Lines and Current Lines Cleared
				 with Sound Effects and Music Controls */}
				<MusicControls
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
					selectedMusic={selectedMusic}
					setSelectedMusic={setSelectedMusic}
					showOptions={showOptions}
					setShowOptions={setShowOptions}
				/>
				{/* Music Info */}
				<MusicInfo state={state} selectedMusic={selectedMusic} />
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
