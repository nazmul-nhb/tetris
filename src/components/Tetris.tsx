import React, { useReducer } from "react";
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

	const renderedGrid = state.currentPiece
		? getRenderedGrid(
				state.grid,
				state.currentPiece.shape,
				state.position,
				state.currentPiece.color
		  )
		: state.grid;

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
						dispatch({ type: "SPAWN_PIECE", piece: "L" })
					}
					className="px-4 py-2 bg-green-500 text-white rounded"
				>
					Spawn Piece
				</button>
				<button
					onClick={() =>
						dispatch({ type: "UPDATE_POSITION", x: 0, y: 1 })
					}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					Move Down
				</button>
				<button
					onClick={() => dispatch({ type: "RESET_GRID" })}
					className="px-4 py-2 bg-red-500 text-white rounded"
				>
					Reset Grid
				</button>
			</div>
		</div>
	);
};

export default Tetris;
