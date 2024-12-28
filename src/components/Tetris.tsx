import GameControls from "./GameControls";
import MusicControls from "./MusicControls";
import PausedScreen from "./PausedScreen";
import GameOverScreen from "./GameOverScreen";
import ScoredPoints from "./ScoredPoints";
import RestartGame from "./RestartGame";
import PointsPopUp from "./PointsPopUp";
import Confirmation from "./Confirmation";
import MusicInfo from "./MusicInfo";
import GameGrid from "./GameGrid";
import { PressedKey } from "../types";
import { FaTheaterMasks } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import { initialState } from "../constants/state";
import { gameReducer } from "../reducers/gameReducer";
import { useRestartGame } from "../hooks/useRestartGame";
import React, { useEffect, useReducer, useState } from "react";
import { playSoundEffect } from "../utilities/soundUtils";
import { getRenderedGrid, getSpeedMultiplier } from "../utilities/gameUtils";
import { useKeyboard } from "../hooks/useKeyboard";
import { useGameLoop } from "../hooks/useGameLoop";
import { useGameEffects } from "../hooks/useGameEffects";

/** Tetris Component */
const Tetris: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const [selectedMusic, setSelectedMusic] = useState<FileList | null>(null);
	const [pressedKey, setPressedKey] = useState<PressedKey | null>(null);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [popupKey, setPopupKey] = useState<number>(Date.now());

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

	// Automatically drop the Tetromino according to `speed`
	useGameLoop(state, dispatch);

	// Handle game effects and music
	useGameEffects(state, dispatch, selectedMusic);

	// Attach keyboard listeners
	useKeyboard(
		state,
		dispatch,
		restartGame,
		pressedKey,
		setPressedKey,
		setShowOptions
	);

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
					<GameGrid
						state={state}
						dispatch={dispatch}
						renderedGrid={renderedGrid}
					/>
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
					className={`absolute top-12 left-1/2 -translate-x-1/2 text-base font-bold text-red-50 w-7 aspect-square flex items-center justify-center rounded-full text-center z-40 border-2 cursor-pointer transition-all p-1 ${
						state.isHardMode ? "bg-blue-700" : "bg-orange-800"
					} ${
						pressedKey === "Hard"
							? "scale-75 duration-150"
							: "active:scale-75 hover:scale-[1.2] duration-300"
					}`}
				>
					{state.isHardMode ? <FaMasksTheater /> : <FaTheaterMasks />}
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
