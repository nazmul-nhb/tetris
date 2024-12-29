import React, { Dispatch } from "react";
import { Cell, GameAction, GameState } from "../types";
import { playSoundEffect } from "../utilities/soundUtils";

type Props = {
	state: GameState;
	dispatch: Dispatch<GameAction>;
	renderedGrid: Cell[][];
};

/**
 * GameGrid component that renders the grid of cells and handles the pause functionality when clicked.
 *
 * @param state - The current state of the game, including pause and hard mode settings.
 * @param dispatch - Function to dispatch actions to update the game state.
 * @param renderedGrid - The grid of cells to be rendered.
 */
const GameGrid: React.FC<Props> = ({ state, dispatch, renderedGrid }) => (
	<div
		onClick={() => {
			if (!state.gameOver) {
				playSoundEffect("pause", state.isSoundEffectsEnabled);
				dispatch({ type: "TOGGLE_PAUSE" });
			}
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
						state.isHardMode
							? cell.filled && "border border-gray-400"
							: "border border-gray-400"
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
);

export default GameGrid;
