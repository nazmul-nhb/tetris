import React, { useReducer, useState } from "react";
import GameControls from "./GameControls";
import MusicControls from "./MusicControls";
import PausedScreen from "./PausedScreen";
import GameOverScreen from "./GameOverScreen";
import ScoredPoints from "./ScoredPoints";
import RestartGame from "./RestartGame";
import PointsPopUp from "./PointsPopUp";
import Confirmation from "./Confirmation";
import SpeedDisplay from "./SpeedDisplay";
import ToggleMode from "./ToggleMode";
import MusicInfo from "./MusicInfo";
import GameGrid from "./GameGrid";
import { PressedKey } from "../types";
import { initialState } from "../constants/state";
import { gameReducer } from "../reducers/gameReducer";
import { getRenderedGrid } from "../utilities/gameUtils";
import { useRestartGame } from "../hooks/useRestartGame";
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

	// Restart Game functions
	const { showPopup, restartGame, confirmRestart, cancelRestart } =
		useRestartGame({
			state,
			dispatch,
		});

	// Toggle Mode functions
	const {
		showPopup: showTogglePopUp,
		restartGame: toggleMode,
		confirmRestart: confirmModeChange,
		cancelRestart: cancelModeChange,
	} = useRestartGame({
		state,
		dispatch,
		toggleMode: true,
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

	// Handle game effects, sound effects and music
	useGameEffects(state, dispatch, selectedMusic, setPopupKey);

	// Attach keyboard listeners
	useKeyboard(
		state,
		dispatch,
		restartGame,
		pressedKey,
		setPressedKey,
		setShowOptions,
		toggleMode
	);

	return (
		<section className="flex flex-col items-center select-none overflow-hidden">
			{/* Container for Main Grid and all the Buttons */}
			<div className="relative flex flex-col items-center gap-2 pt-4">
				{/* Current & Best Scores with Next Piece */}
				<ScoredPoints state={state} />
				{/* Show Restart Confirmation Popup */}
				{showPopup && (
					<Confirmation
						key="restart-game-keyboard"
						onConfirm={confirmRestart}
						onCancel={cancelRestart}
						message="Want to Restart the Game? Current Progress will be Reset."
					/>
				)}
				{/* Show Toggle Mode Confirmation Popup */}
				{showTogglePopUp && (
					<Confirmation
						key="toggle-mode-keyboard"
						onConfirm={confirmModeChange}
						onCancel={cancelModeChange}
						message={`Reset Current Progress and Switch to ${
							state.isHardMode ? "Easy" : "Hard"
						} Mode?`}
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

				{/* Show Dropping Speed */}
				<SpeedDisplay state={state} />
				{/* Change Mode: Hard/Easy */}
				<ToggleMode
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
				/>
				{/* Restart Button at the Right-top Corner */}
				<RestartGame
					state={state}
					dispatch={dispatch}
					pressedKey={pressedKey}
				/>

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
			<GameControls
				state={state}
				dispatch={dispatch}
				pressedKey={pressedKey}
			/>
		</section>
	);
};

export default Tetris;
