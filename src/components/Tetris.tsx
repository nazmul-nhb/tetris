import React, { useEffect, useReducer } from "react";
import { GameState } from "../types";
import { createEmptyGrid, getRenderedGrid } from "../utilities";
import { TETROMINOS } from "../constants";
import { gameReducer } from "../reducers/gameReducer";

/** The initial game state */
const initialState: GameState = {
	grid: createEmptyGrid(),
	currentPiece: TETROMINOS.T,
	position: { x: 3, y: 0 },
};

/** Tetris Component */
const Tetris: React.FC = () => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	/** Get the rendered grid with the current piece. */
	const renderedGrid = state.currentPiece
		? getRenderedGrid(
				state.grid,
				state.currentPiece.shape,
				state.position,
				state.currentPiece.color
		  )
		: state.grid;

	/** Handle keyboard controls */
	const handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case "ArrowLeft":
				dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 });
				break;
			case "ArrowRight":
				dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 });
				break;
			case "ArrowDown":
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
				break;
			default:
				break;
		}
	};

	/** Automatically drop the Tetromino every second */
	useEffect(() => {
		const interval = setInterval(() => {
			if (state.currentPiece) {
				dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 });
			}
		}, 1000); // Drop every 1 second

		return () => clearInterval(interval);
	}, [state.currentPiece, dispatch]);

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
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl font-bold mb-4">Tetris Game</h1>
			<div className="grid grid-cols-10 gap-px border border-gray-700">
				{renderedGrid.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							className="w-6 h-6 border border-gray-300"
							style={{
								backgroundColor: cell.filled
									? cell.color || "gray"
									: "white",
							}}
						/>
					))
				)}
			</div>
			<div className="flex gap-2 mt-4">
				<button
					onClick={() =>
						dispatch({ type: "UPDATE_POSITION", x: -1, y: 0 })
					}
					className="px-4 py-2 bg-yellow-600 text-white rounded"
				>
					Move Left
				</button>
				<button
					onClick={() =>
						dispatch({ type: "UPDATE_POSITION", x: 1, y: 0 })
					}
					className="px-4 py-2 bg-yellow-600 text-white rounded"
				>
					Move Right
				</button>
				<button
					onClick={() =>
						dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 })
					}
					className="px-4 py-2 bg-blue-800 text-white rounded"
				>
					Move Down
				</button>
				<button
					onClick={() =>
						dispatch({ type: "SPAWN_PIECE", piece: "L" })
					}
					className="px-4 py-2 bg-green-800 text-white rounded"
				>
					Spawn Piece
				</button>
				<button
					onClick={() => dispatch({ type: "RESET_GRID" })}
					className="px-4 py-2 bg-red-800 text-white rounded"
				>
					Reset Grid
				</button>
			</div>
		</div>
	);
};

export default Tetris;
